import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  AllListingsPicker,
  DesiredItem,
  ExperienceLevel,
  discovers,
  groups,
  handshake,
  how_many_players,
  picker,
  switchOptions,
} from '../DummyData';
import DiscoverCard from './DiscoverCard';
import MyGroupsCard from './MyGroupsCard';
import DropDownPicker from './DropDownPicker';
import DateInput from './DateInput';
import ContactInput from './ContactInput';
import Button from './Button';
import UploadPicture from './UploadPicture';
import Switch from './Switch';
import Add from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import {ShowToast} from '../Custom';
import {ListingsByUserID, createListing} from '../redux/actions/listingAction';
import {getListings} from '../redux/actions/homeAction';
import images from '../assets/images';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

const Discover = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {listing, loader} = useSelector(state => state.HomeReducer);

  React.useEffect(() => {
    if (listing.length < 1) {
      dispatch(getListings());
    }
  }, []);

  return (
    <View style={{paddingTop: hp('4%')}}>
      {loader ? (
        <View style={{alignItems: 'center', marginVertical: hp('5%')}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={listing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item, index}) => (
            <DiscoverCard
              image={images.discover1}
              onPress={() =>
                navigation.navigate('SecondaryStack', {
                  screen: 'ListingDetails',
                  params: {item},
                })
              }
              count={index + 1}
              title={
                Object.keys(item.listing_title).length == 13
                  ? item.listing_title
                  : 'New Listing'
              }
              // itc={
              //   item.experience_level == ''
              //     ? '5 to 10 par progress level'
              //     : item.experience_level
              // }
              itc={item.the_itc_handshake}
              // desc={
              //   Object.keys(item.match_description).length == 4
              //     ? item.match_description
              //     : 'test'
              // }
              players={item.how_many_players}
              date={item.course_date}
              time={item.course_time == '' ? '23:28' : item.course_time}
            />
          )}
        />
      )}
    </View>
  );
};

const MyListings = () => {
  const {my_listings, my_listings_loader} = useSelector(
    state => state.ListingReducer,
  );
  const {user} = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (my_listings?.length < 1) {
      dispatch(ListingsByUserID(user.user_id));
    }
  }, []);

  const renderLoader = () => {
    return (
      <View style={{alignItems: 'center', paddingTop: hp('5%')}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={{alignItems: 'center', paddingTop: hp('5%')}}>
        <Text
          style={{color: colors.white, fontSize: hp('2%'), fontWeight: 'bold'}}>
          You have no upcoming matches
        </Text>
      </View>
    );
  };

  return (
    <View style={{paddingTop: hp('4%')}}>
      {my_listings_loader
        ? renderLoader()
        : my_listings?.length < 1
        ? renderMessage()
        : my_listings?.map((item, i) => (
            <MyGroupsCard
              image={images.discover1}
              onPress={() =>
                navigation.navigate('SecondaryStack', {
                  screen: 'ListingDetails',
                  params: {item},
                })
              }
              count={i + 1}
              title={
                item.listing_title.length > 15
                  ? 'New Listing'
                  : item.listing_title
              }
              players={item.how_many_players}
              area_code={item.area_code_match}
              date={item.course_date}
              handshake={
                item.the_itc_handshake == ''
                  ? 'CASUAL HANDSHAKE'
                  : item.the_itc_handshake
              }
            />
          ))}
    </View>
  );
};

const AddNew = () => {
  const [state, setState] = React.useState({
    location: '',
    suggested_day: '',
    suggested_time: '',
    hyperlink: '',
    pickers: {
      area_code: '',
      how_many_players: '',
      itc_handshake: '',
      desired_tee: '',
      exp_level: '',
    },
    description: '',
    image_details: {
      name: 'No File Chosen',
      path: '',
    },
    listing_gallery: [
      {
        name: 'No File Chosen',
        path: '',
      },
    ],
    smoking_friendly: false,
    drinking_friendly: false,
    private_listing: false,
  });

  const dispatch = useDispatch();

  const {create_listing_loading} = useSelector(state => state.ListingReducer);
  const {area_codes} = useSelector(state => state.HomeReducer);

  // console.log(typeof state.smoking_friendly)
  // console.log(state.listing_gallery)

  const onChoosePhoto = async (type, index) => {
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
        if (type == 'image') {
          setState(prevState => ({
            ...prevState,
            image_details: {
              name: response.assets[0].fileName,
              path: response.assets[0].uri,
            },
          }));
        } else {
          const obj = {
            name: response.assets[0].fileName,
            path: response.assets[0].uri,
          };
          setState(prevState => ({
            ...prevState,
            listing_gallery: prevState.listing_gallery.map((item, i) =>
              i === index ? obj : item,
            ),
          }));
        }
      }
    });
  };

  const onSwitchToggle = (switchName, value) => {
    // console.log(state[switchName])
    setState(prevState => ({
      ...prevState,
      [switchName]: value,
    }));
  };

  const handlePickerChange = (pickerName, text) => {
    setState(prevState => ({
      ...prevState,
      pickers: {
        ...prevState.pickers,
        [pickerName]: text,
      },
    }));
  };

  const onCreateListing = async () => {
    if (!state.location) {
      return ShowToast('Please add your location');
    } else {
      await dispatch(
        createListing(
          state.location,
          state.description,
          state.suggested_day,
          state.suggested_time,
          state.pickers.how_many_players,
          state.pickers.area_code,
          state.pickers.itc_handshake,
          state.pickers.desired_tee,
          state.drinking_friendly,
          state.private_listing,
        ),
      );
    }
  };

  const onAddMore = () => {
    const modifiedArr = [...state.listing_gallery, state.image_details];
    setState({
      ...state,
      listing_gallery: modifiedArr,
    });
  };

  return (
    <View style={styles.addnewWrapper}>
      <ContactInput
        label={'Location/Golf Course/Clubs For Sale.'}
        value={state.location}
        onChangeText={text =>
          setState({
            ...state,
            location: text,
          })
        }
        style={styles.input}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <DateInput
          heading={'Suggested Day'}
          onConfirm={date =>
            setState({
              ...state,
              suggested_day: moment(date).format('MM/DD/YY'),
            })
          }
          text={state.suggested_day !== '' ? state.suggested_day : 'mm/dd/yy'}
          icon={'date-range'}
          mode={'date'}
        />
        <DateInput
          heading={'Suggested Time'}
          icon={'access-time'}
          mode={'time'}
          onConfirm={time =>
            setState({
              ...state,
              suggested_time: moment(time).format('hh:mm'),
            })
          }
          text={state.suggested_time !== '' ? state.suggested_time : 'Select'}
          display={'clock'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingTop: hp('1.3%'),
        }}>
        <View>
          <Text style={styles.textStyle}>Area Code</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={state.pickers.area_code}
              dropdownIconColor={colors.white}
              style={{color: colors.white}}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerChange('area_code', itemValue)
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
        </View>
        <View>
          <Text style={styles.textStyle}>How Many Players</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={state.pickers.how_many_players}
              dropdownIconColor={colors.white}
              style={{color: colors.white}}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerChange('how_many_players', itemValue)
              }>
              <Picker.Item
                label={'Select a Value'}
                value={null}
                style={{color: colors.secondary}}
              />
              {how_many_players.map(item => (
                <Picker.Item
                  label={item.pickerText}
                  value={item.pickerText}
                  style={{color: colors.secondary}}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View>
          <Text style={styles.textStyle}>IN THE CUP HANDSHAKE</Text>
          <View style={[styles.pickerStyle, {width: hp('30%')}]}>
            <Picker
              selectedValue={state.pickers.itc_handshake}
              dropdownIconColor={colors.white}
              style={{color: colors.white}}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerChange('itc_handshake', itemValue)
              }>
              <Picker.Item
                label={'Select'}
                value={null}
                style={{color: colors.secondary}}
              />
              {handshake.map(item => (
                <Picker.Item
                  label={item.pickerText}
                  value={item.pickerText}
                  style={{color: colors.secondary}}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View>
          <Text style={styles.textStyle}>Experience Level</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={state.pickers.exp_level}
              dropdownIconColor={colors.white}
              style={{color: colors.white}}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerChange('exp_level', itemValue)
              }>
              <Picker.Item
                label={'Select'}
                value={null}
                style={{color: colors.secondary}}
              />
              {ExperienceLevel.map(item => (
                <Picker.Item
                  label={item.pickerText}
                  value={item.pickerText}
                  style={{color: colors.secondary}}
                />
              ))}
            </Picker>
          </View>
        </View>
        {DesiredItem.map(item => (
          <DropDownPicker
            text={item.text}
            iconColor={colors.lightgray}
            itemStyle={{color: colors.lightgray}}
            selectedValue={state.pickers.desired_tee}
            onValueChange={itemValue => {
              handlePickerChange('desired_tee', itemValue);
            }}
            value1={null}
            value2={item.pickerText2}
            value3={item.pickerText3}
            value4={item.pickerText4}
            value5={item.pickerText5}
            value6={item.pickerText6}
            label1={item.pickerText1}
            label2={item.pickerText2}
            label3={item.pickerText3}
            label4={item.pickerText4}
            label5={item.pickerText5}
            label6={item.pickerText6}
            style={[styles.picker, {width: hp('20%')}]}
          />
        ))}
      </View>
      <ContactInput
        label={'Description'}
        value={state.description}
        onChangeText={text =>
          setState({
            ...state,
            description: text,
          })
        }
        textAlignVertical={'top'}
        style={[styles.input, {height: hp('15%')}]}
      />
      <UploadPicture
        text={'Image'}
        chooseFile={() => onChoosePhoto('image')}
        fileName={state.image_details.name}
      />
      <ContactInput
        label={'Hyper Link'}
        value={state.hyperlink}
        onChangeText={text =>
          setState({
            ...state,
            hyperlink: text,
          })
        }
        style={styles.input}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'flex-start',
          position: 'relative',
        }}>
        <View style={{flex: 1}}>
          {state.listing_gallery.map((item, i) => {
            return (
              <UploadPicture
                text={i == 0 && 'Listing Gallery'}
                buttonStyle={{width: hp('16%')}}
                chooseFile={() => onChoosePhoto('gallery', i)}
                style={{width: hp('37%')}}
                fileName={item.name}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.addView}
          activeOpacity={0.9}
          onPress={() => onAddMore()}>
          <Add name={'add'} color={colors.secondary} size={25} />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: hp('2%')}}>
        <Text style={styles.text}>Additional Details</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: hp('3%'),
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {switchOptions.map(item => (
            <Switch
              text={item.text}
              isOn={state[item.props]}
              color={state[item.props] ? colors.secondary : colors.lightgray}
              onToggle={isOn => onSwitchToggle(item.props, isOn)}
              style={{marginBottom: hp('3%')}}
            />
          ))}
        </View>
        <Button
          buttonStyle={{width: '50%', borderRadius: 100, marginTop: hp('2%')}}
          onPress={() => onCreateListing()}
          buttonText={'Add New Listings'}
          indicator={create_listing_loading}
          textStyle={{color: colors.secondary}}
        />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: () => <Discover />,
  second: () => <MyListings />,
  third: () => <AddNew />,
});

export const AddNewListings = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Discover'},
    {key: 'second', title: 'My Listing'},
    {key: 'third', title: 'Add New Listings'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      style={{marginTop: hp('2.5%')}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={styling => (
        <TabBar
          indicatorStyle={styles.indicatorStyle}
          {...styling}
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            height: hp('6.8%'),
            justifyContent: 'center',
          }}
          renderLabel={({route}) => (
            <Text
              style={{
                color: colors.secondary,
                // marginTop: hp('0.5%'),
                fontWeight: 'bold',
                fontSize: hp('1.5%'),
              }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: colors.primary,
    width: '30%',
    bottom: hp('1%'),
    // marginLeft: hp('0.5%'
    left: 5,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: hp('2.5%'),
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
  },
  addnewWrapper: {
    paddingTop: hp('4%'),
  },
  pickerStyle: {
    borderWidth: 0.7,
    width: hp('20%'),
    borderRadius: 10,
    marginTop: hp('1.2%'),
    marginBottom: hp('4%'),
    borderColor: colors.lightgray,
  },
  textStyle: {
    color: colors.white,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  addView: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    top: hp('6%'),
    // marginTop: hp('1%'),
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 100,
  },
  text: {
    color: colors.white,
    marginBottom: hp('2%'),
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
});
