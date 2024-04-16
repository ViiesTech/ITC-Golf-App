import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AllOptionsCard from '../../components/AllOptionsCard';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import SearchFilter from '../../components/SearchFilter';
import colors from '../../assets/colors';
import {AddNewGroups} from '../../components/AddNewGroups';
import images from '../../assets/images';
import Edit from 'react-native-vector-icons/Feather';
import ContactInput from '../../components/ContactInput';
import Button from '../../components/Button';
import {AddNewListings} from '../../components/AddNewListings';
import {DesiredItem, ExperienceLevel} from '../../DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {PlayersFollow, editProfile} from '../../redux/actions/authAction';
import {Picker} from '@react-native-picker/picker';
import {
  GroupsByAreaCodes,
  ListingsByAreaCodes,
  getGroups,
  getListings,
} from '../../redux/actions/homeAction';
import {ShowToast} from '../../Custom';
import {useNavigation} from '@react-navigation/native';

const AllGroups = ({route}) => {
  const [listingsCode, setListingsCode] = useState(null);
  const [groupsCode, setGroupsCode] = useState(null);
  const [listingSearch, setListingSearch] = useState(false);
  const [groupSearch, setGroupSearch] = useState(false);

  const {user, follow_loader, players_follow, edit_loading, register_id} =
    useSelector(state => state.AuthReducer);
  const {area_codes} = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();

  const {listing_id} = useSelector(state => state.ListingReducer);

  const [state, setState] = useState({
    first_name: user.firstname,
    last_name: user.lastname,
    address: user?.address ? user.address : '',
    pickers: {
      area_code: user?.areacode ? user?.areacode : '',
      exp_level: user?.experience_level ? user?.experience_level : '',
      desired_tee: user?.desired_tee_box ? user?.desired_tee_box : '',
    },
    description: user?.short_description ? user?.short_description : '',
    photoURL: user?.feature_image_url
      ? user?.feature_image_url
      : user?.featured_image_url
      ? user?.featured_image_url
      : '',
  });

  const {options} = route.params;

  const navigation = useNavigation();

  const [changeTab, setChangeTab] = useState(options);

  useEffect(() => {
    if (changeTab === 'Players You Follow' && players_follow.length < 1) {
      dispatch(PlayersFollow(user.user_id, listing_id));
    }
  }, []);

  const onInputChange = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const onPickerValueChange = (value, text) => {
    setState(prevState => ({
      ...prevState,
      pickers: {
        ...prevState.pickers,
        [value]: text,
      },
    }));
  };

  const onChangePhoto = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        setState(prevState => ({
          ...prevState,
          photoURL: response.assets[0].uri,
        }));
      }
    });
  };

  const onGroupSearch = async () => {
    if (groupsCode) {
      await dispatch(GroupsByAreaCodes(groupsCode));
      setGroupSearch(true);
    } else {
      setGroupSearch(false);
    }
  };

  const onListingSearch = async () => {
    if (listingsCode) {
      await dispatch(ListingsByAreaCodes(listingsCode));
      setListingSearch(true);
    } else {
      setListingSearch(false);
    }
  };

  useEffect(() => {
    dispatch(getListings());
    dispatch(getGroups());
  }, []);

  const onEditPress = async () => {
    if (!state.photoURL) {
      return ShowToast('Please add your photo');
    } else {
      const res = await dispatch(
        editProfile(
          user.user_id,
          user.auth_register_id,
          state.first_name,
          state.last_name,
          state.pickers.area_code,
          state.pickers.exp_level,
          state.pickers.desired_tee,
          state.address,
          state.description,
          state.photoURL,
        ),
      );

      if (res.success) {
        navigation.navigate('Profile');
        return ShowToast(res.message);
      } else {
        return ShowToast(res.message);
      }
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
        ]}
        showsVerticalScrollIndicator={false}>
        <SecondaryHeader
          text={
            options === 'Add New Listings' || changeTab === 'Add New Listings'
              ? 'All Listings'
              : options === 'Players You Follow' ||
                changeTab === 'Players You Follow'
              ? 'Players You Follow'
              : options === 'Add New Groups' || changeTab === 'Add New Groups'
              ? 'All Groups'
              : 'My Profile'
          }
        />
        <View style={styles.screen}>
          <AllOptionsCard
            active={changeTab}
            onChangeTab={text => setChangeTab(text)}
          />
          {changeTab === 'Add New Groups' ? (
            <>
              <SearchFilter
                style={{width: '100%'}}
                selectedValue={groupsCode}
                onSearchPress={() => onGroupSearch()}
                onValueChange={value => setGroupsCode(value)}
              />
              {/* <View style={{height: '400%'}}> */}
              <AddNewGroups buttonPressed={groupSearch} />
              {/* </View> */}
            </>
          ) : changeTab === 'Add New Listings' ? (
            <>
              <SearchFilter
                style={{width: '100%'}}
                selectedValue={listingsCode}
                onSearchPress={() => onListingSearch()}
                onValueChange={value => setListingsCode(value)}
              />
              {/* <View style={{height: '400%'}}> */}
                <AddNewListings buttonPress={listingSearch} />
              {/* </View> */}
            </>
          ) : changeTab === 'Players You Follow' ? (
            follow_loader ? (
              <View style={{alignItems: 'center', marginVertical: hp('4%')}}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : players_follow.length < 1 ? (
              <View style={{alignItems: 'center', marginVertical: hp('4%')}}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}>
                  No Players Found
                </Text>
              </View>
            ) : (
              players_follow.map(item => {
                return (
                  <View style={styles.followCard}>
                    <Text style={styles.userName}>USER NAME:</Text>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.userName}>EMAIL:</Text>
                    <Text style={styles.name}>{item.user_email}</Text>
                  </View>
                );
              })
            )
          ) : (
            <View style={{paddingTop: hp('4%')}}>
              <Text style={styles.heading}>EDIT YOUR PROFILE</Text>
              <View
                style={{
                  position: 'relative',
                  height: hp('14%'),
                  width: '40%',
                  marginTop: hp('2%'),
                }}>
                <Image
                  source={
                    state.photoURL ? {uri: state.photoURL} : images.profile
                  }
                  resizeMode="cover"
                  style={styles.imageStyle}
                  borderRadius={10}
                />
                <TouchableOpacity
                  style={styles.editView}
                  activeOpacity={0.9}
                  onPress={() => onChangePhoto()}>
                  <Edit name={'edit'} color={colors.primary} size={16} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingTop: hp('4%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <ContactInput
                  label={'First Name'}
                  placeholder={'Name/Nickname'}
                  value={state.first_name}
                  onChangeText={text => onInputChange('first_name', text)}
                  style={styles.input}
                  textColor={colors.lightgray}
                />
                <ContactInput
                  label={'Last Name'}
                  placeholder={'Last Name'}
                  value={state.last_name}
                  onChangeText={text => onInputChange('last_name', text)}
                  style={styles.input}
                  textColor={colors.lightgray}
                />
              </View>
              <Text style={styles.textStyle}>AREA CODE</Text>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={state.pickers.area_code}
                  dropdownIconColor={colors.white}
                  style={{color: colors.white}}
                  itemStyle={{color: 'white', fontWeight: 'bold'}}
                  onValueChange={(itemValue, itemIndex) =>
                    onPickerValueChange('area_code', itemValue)
                  }>
                  <Picker.Item
                    label={'Select'}
                    value={null}
                    style={{color: colors.secondary}}
                  />
                  {area_codes?.map(item => (
                    <Picker.Item
                      label={item}
                      value={item}
                      style={{color: colors.secondary}}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: hp('18%')}}>
                  <Text style={styles.textStyle}>Experience Level</Text>
                  <View style={styles.pickerStyle}>
                    <Picker
                      selectedValue={state.pickers.exp_level}
                      itemStyle={{color: 'white', fontWeight: 'bold'}}
                      dropdownIconColor={colors.white}
                      style={{color: colors.white}}
                      onValueChange={(itemValue, itemIndex) =>
                        onPickerValueChange('exp_level', itemValue)
                      }>
                      <Picker.Item
                        label={'Select'}
                        value={null}
                        style={{color: colors.secondary}}
                      />
                      {ExperienceLevel?.map(item => (
                        <Picker.Item
                          label={item.pickerText}
                          value={item.pickerText}
                          style={{color: colors.secondary}}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{width: hp('18%')}}>
                  <Text style={styles.textStyle}>Desired Tee Box</Text>
                  <View style={styles.pickerStyle}>
                    <Picker
                      selectedValue={state.pickers.desired_tee}
                      itemStyle={{color: 'white', fontWeight: 'bold'}}
                      dropdownIconColor={colors.white}
                      style={{color: colors.white}}
                      onValueChange={(itemValue, itemIndex) =>
                        onPickerValueChange('desired_tee', itemValue)
                      }>
                      <Picker.Item
                        label={'Select'}
                        value={null}
                        style={{color: colors.secondary}}
                      />
                      {DesiredItem.map(item => (
                        <Picker.Item
                          label={item.pickerText}
                          value={item.pickerText}
                          style={{color: colors.secondary}}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <ContactInput
                label={'Address'}
                placeholder={'37 Cardinal Lane Petersburg,'}
                value={state.address}
                onChangeText={text => onInputChange('address', text)}
                style={[styles.input, {width: '100%'}]}
                textColor={colors.lightgray}
              />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: hp('1.5%'),
                  marginBottom: hp('4%'),
                }}>
                ITC GIVEAWAY AND RAFFLE ADDRESS
              </Text>
              <ContactInput
                style={[styles.input, {height: hp('16%'), width: '100%'}]}
                value={state.description}
                onChangeText={text => onInputChange('description', text)}
                // placeholder={'37 Cardinal Lane Petersburg,'}
                textColor={colors.lightgray}
                textAlignVertical={'top'}
                label={'Short Description:'}
              />
              <View style={styles.emailCard}>
                <Text style={{color: colors.lightgray, fontSize: hp('1.7%')}}>
                  {user.user_email}
                </Text>
              </View>
              <Button
                buttonText={'UPDATE MY PROFILE'}
                indicator={edit_loading}
                onPress={() => onEditPress()}
                buttonStyle={{
                  width: '60%',
                  borderRadius: 100,
                  marginTop: hp('5%'),
                }}
                textStyle={{color: colors.secondary, fontSize: hp('1.8%')}}
              />
            </View>
          )}
          <SVGImage
            image={icons.pageEnd}
            style={{alignSelf: 'center', marginTop: hp('5%')}}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default AllGroups;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    padding: hp('1.2%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  textBackground: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 100,
    padding: hp('1.8%'),
  },
  // addnewWrapper: {},
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    width: hp('19%'),
    borderColor: colors.gray,
  },
  picker: {
    borderWidth: 1.5,
    width: hp('23%'),
    padding: hp('0.6%'),
    borderColor: colors.gray,
  },
  addView: {
    backgroundColor: colors.primary,
    height: hp('4%'),
    width: hp('4%'),
    borderRadius: 100,
    marginLeft: hp('2%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  heading: {
    color: colors.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  followCard: {
    backgroundColor: colors.gray,
    marginTop: hp('5%'),
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: colors.white,
    padding: hp('4%'),
  },
  userName: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  name: {
    color: colors.white,
    marginBottom: hp('4%'),
    marginTop: hp('1%'),
  },
  imageStyle: {
    height: hp('14%'),
    width: '100%',
  },
  editView: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    position: 'absolute',
    padding: hp('0.6%'),
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    bottom: 5,
  },
  // pickerStyle2: {
  //   borderWidth: 0.2,
  //   width: '50%',
  //   marginBottom: hp('6%'),
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  // },
  pickerStyle: {
    borderWidth: 1.5,
    width: '100%',
    borderRadius: 10,
    marginTop: hp('1.3%'),
    marginBottom: hp('6%'),
    borderColor: colors.gray,
  },
  emailCard: {
    marginTop: hp('2%'),
    borderRadius: 10,
    backgroundColor: colors.gray,
    padding: hp('2%'),
  },
  wrapper: {
    paddingTop: hp('3%'),
    // paddingBottom: hp('3%'),
  },
  textStyle: {
    color: colors.white,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
});
