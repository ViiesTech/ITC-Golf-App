import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../assets/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ExperienceLevel,
  TeeBox,
  handshake,
  how_many_players,
  switchOptions,
} from '../utils/DummyData';
import DiscoverCard from './DiscoverCard';
import MyGroupsCard from './MyGroupsCard';
import DropDownPicker from './DropDownPicker';
import DateInput from './DateInput';
import ContactInput from './ContactInput';
import Button from './Button';
import UploadPicture from './UploadPicture';
import Switch from './Switch';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import {ShowToast} from '../Custom';
import {
  DeleteListing,
  ListingsByUserID,
  createListing,
  editListing,
} from '../redux/actions/listingAction';
import {getListings} from '../redux/actions/homeAction';
import images from '../assets/images';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {timeFormatting} from '../utils/HelperFunctions';
import ConfirmationModal from './ConfirmationModal';

const Discover = ({searchPressed}) => {
  const [listings, setListings] = React.useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loader, listings_filter, listings_filter_loader} = useSelector(
    state => state.HomeReducer,
  );

  console.log('listings', searchPressed);

  React.useEffect(() => {
    // if (listing.length < 1) {
    dispatch(getListings(setListings));
    // }
  }, []);

  const renderAllListings = () => {
    return loader ? (
      <View style={{alignItems: 'center', marginVertical: hp('5%')}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    ) : (
      <FlatList
        data={listings}
        numColumns={2}
        scrollEnabled={true}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        // style={{flexGrow: 1}}
        renderItem={({item, index}) => (
          <DiscoverCard
            image={
              item.feature_image
                ? {uri: item.feature_image, priority: FastImage.priority.high}
                : images.dummy
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'ListingDetails',
                params: {id: item.listing_id},
              })
            }
            count={index + 1}
            title={item.listing_title}
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
            area_code={item.area_code_match}
            time={timeFormatting(item.course_time)}
          />
        )}
      />
    );
  };

  const renderFilterListings = () => {
    return listings_filter_loader ? (
      renderLoader()
    ) : listings_filter.message ? (
      renderMessage()
    ) : (
      <FlatList
        data={listings_filter}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <DiscoverCard
            image={
              item.featured_image_url
                ? {
                    uri: item.featured_image_url,
                    priority: FastImage.priority.high,
                  }
                : images.dummy
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'ListingDetails',
                params: {id: item.id},
              })
            }
            count={index + 1}
            title={item.listing_title}
            // itc={
            //   item.experience_level == ''
            //     ? '5 to 10 par progress level'
            //     : item.experience_level
            // }
            itc={item.the_itc_handshake}
            area_code={item.area_code_match}
            // desc={
            //   Object.keys(item.match_description).length == 4
            //     ? item.match_description
            //     : 'test'
            // }
            players={item.how_many_players}
            time={timeFormatting(item.course_time)}
          />
        )}
      />
    );
  };

  const renderMessage = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('4%')}}>
        <Text
          style={{
            alignItems: 'center',
            color: colors.white,
            fontWeight: 'bold',
            fontSize: hp('2%'),
          }}>
          {listings_filter.message}
        </Text>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('4%')}}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );
  };

  return (
    <View style={{paddingTop: hp('4%')}}>
      {searchPressed ? renderFilterListings() : renderAllListings()}
    </View>
  );
};

const MyListings = ({setIndex, setListingData}) => {
  const [loaderIndex, setLoaderIndex] = React.useState(null);
  const [my_listings, setMy_listings] = React.useState([]);
  const {my_listings_loader, delete_loader} = useSelector(
    state => state.ListingReducer,
  );
  const {user} = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    dispatch(ListingsByUserID(user.user_id, setMy_listings));
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
          style={{
            color: colors.white,
            fontSize: hp('2%'),
            fontWeight: 'bold',
          }}>
          {my_listings?.message || 'No match found for the user'}
        </Text>
      </View>
    );
  };

  const onDeleteListing = async (listing_id, index) => {
    setLoaderIndex(index);
    const res = await dispatch(DeleteListing(listing_id, user.user_id));
    if (res) {
      // navigation.navigate('Home');
      dispatch(ListingsByUserID(user.user_id, setMy_listings));
      return ShowToast(res);
    }
  };

  const onEditListing = item => {
    setIndex('third');
    setListingData(item);
  };

  return (
    <View style={{paddingTop: hp('4%')}}>
      {my_listings_loader
        ? renderLoader()
        : my_listings?.message || my_listings?.length < 1
        ? renderMessage()
        : my_listings?.map((item, index) => (
            <MyGroupsCard
              key={index}
              deleteText={'Delete Listing'}
              onDeletePress={() => onDeleteListing(item.listing_id, index)}
              onEditPress={() => onEditListing(item)}
              image={
                item.feature_image
                  ? {uri: item.feature_image, priority: FastImage.priority.high}
                  : images.dummy
              }
              onPress={() =>
                navigation.navigate('SecondaryStack', {
                  screen: 'ListingDetails',
                  params: {id: item.listing_id, type: 'my listings'},
                })
              }
              count={index + 1}
              indicator={index == loaderIndex && delete_loader}
              title={item.listing_title}
              players={item.how_many_players}
              area_code={item.area_code_match}
              date={item.course_date}
              handshake={
                item.the_itc_handshake == '' ? 'Select' : item.the_itc_handshake
              }
            />
          ))}
    </View>
  );
};

const AddNew = ({listingData, locationAreaCode}) => {
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
    // listing_gallery: [
    //   {
    //     name: 'No File Chosen',
    //     path: '',
    //   },
    // ],
    smoking_friendly: false,
    drinking_friendly: false,
    private_match: false,
  });
  const [modalVisible, setModalVisible] = React.useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {create_listing_loading, edit_loader} = useSelector(
    state => state.ListingReducer,
  );
  const {area_codes} = useSelector(state => state.HomeReducer);
  const {user} = useSelector(state => state.AuthReducer);

  console.log('user_id', user.user_id);

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

  const initialState = () => {
    setState({
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
      smoking_friendly: false,
      drinking_friendly: false,
      private_listing: false,
    });
  };

  React.useEffect(() => {
    if (listingData) {
      updatedState();
    }
  }, [listingData]);

  React.useEffect(() => {
    if (locationAreaCode) {
      setState(prevState => ({
        ...prevState,
        pickers: {
          ...prevState.pickers,
          area_code: locationAreaCode,
        },
      }));
    }
  }, [locationAreaCode]);

  const updatedState = () => {
    setState({
      location: listingData.listing_title,
      suggested_day: listingData.course_date,
      suggested_time: listingData.course_time,
      hyperlink:
        listingData.hyper_link === 'undefined' ? '' : listingData.hyper_link,
      pickers: {
        area_code: listingData.area_code_match,
        how_many_players: listingData.how_many_players,
        itc_handshake: listingData.the_itc_handshake,
        desired_tee: listingData.desired_tee_box,
        exp_level: listingData.experience_level,
      },
      description: listingData.match_description,
      image_details: {
        name: !listingData.feature_image
          ? ''
          : listingData.feature_image.split('/').pop(),
        path: !listingData.feature_image ? '' : listingData.feature_image,
      },
      smoking_friendly: listingData.smoking_friendly === 'true' && true,
      drinking_friendly: listingData.drinking_friendly === 'true' && true,
      private_match: listingData.private_group === 'false' ? false : true,
    });
  };

  const onCreateListing = async () => {
    if (listingData) {
      const res = await dispatch(
        editListing(
          listingData.listing_id,
          user.user_id,
          state.location,
          state.description,
          state.suggested_day,
          state.suggested_time,
          state.pickers.how_many_players,
          state.pickers.area_code,
          state.pickers.itc_handshake,
          state.pickers.desired_tee,
          state.smoking_friendly,
          state.drinking_friendly,
          state.pickers.exp_level,
          state.private_match,
          state.hyperlink,
          state.image_details,
        ),
      );
      if (res) {
        // setIndex('second')
        navigation.navigate('Home');
        initialState();
        return ShowToast(res);
      } else {
        return ShowToast('Some problem occured');
      }
    } else {
      if (state.location == '') {
        return ShowToast('Please add the listing title');
      } else {
        const res = await dispatch(
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
            state.smoking_friendly,
            state.pickers.exp_level,
            state.private_group,
            state.hyperlink,
            user.user_id,
            state.image_details,
          ),
        );
        if (res) {
          navigation.navigate('Home');
          initialState();
        }
      }
    }
  };

  // const onAddMore = () => {
  //   const modifiedArr = [...state.listing_gallery, state.image_details];
  //   setState({
  //     ...state,
  //     listing_gallery: modifiedArr,
  //   });
  // };

  return (
    <View style={styles.addnewWrapper}>
      <ContactInput
        label={'Listing Title'}
        instruction={true}
        onInstructionPress={() => setModalVisible(!modalVisible)}
        value={state.location}
        onChangeText={text =>
          setState({
            ...state,
            location: text,
          })
        }
        style={styles.input}
      />

      <DateInput
        heading={'Expiration Date'}
        onConfirm={date =>
          setState({
            ...state,
            suggested_day: moment(date).format('MM/DD/YYYY'),
          })
        }
        text={state.suggested_day !== '' ? state.suggested_day : 'mm/dd/yyyy'}
        icon={'date-range'}
        mode={'date'}
        style={{width: '100%'}}
      />

      <Text style={[styles.textStyle, {marginTop: hp('2%')}]}>Area Code</Text>
      <View style={[styles.pickerStyle, {width: '100%'}]}>
        <Picker
          selectedValue={state.pickers.area_code}
          dropdownIconColor={colors.white}
          itemStyle={{color: colors.white}}
          style={{color: colors.white}}
          onValueChange={(itemValue, itemIndex) =>
            handlePickerChange('area_code', itemValue)
          }>
          <Picker.Item
            label={'Select'}
            value={null}
            style={{color: colors.secondary}}
          />
          {area_codes?.map((item, ind) => {
            return (
              <Picker.Item
                key={ind}
                label={item?.area_code}
                value={item?.area_code}
                style={{color: colors.secondary}}
              />
            );
          })}
        </Picker>
      </View>

      <ContactInput
        label={'Description/Services/Item'}
        value={state.description}
        onChangeText={text =>
          setState({
            ...state,
            description: text,
          })
        }
        multiline={true}
        style={styles.input}
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

      <View style={{paddingTop: hp('2%')}}>
        <Text style={styles.text}>Additional Details</Text>
        <Switch
          text={'Chat Off/On'}
          isOn={state.private_match}
          color={state.private_match ? colors.secondary : colors.lightgray}
          onToggle={isOn => onSwitchToggle('private_match', isOn)}
          style={{marginBottom: hp('3%')}}
        />
        <Button
          buttonStyle={{width: '50%', borderRadius: 100, marginTop: hp('2%')}}
          onPress={() => onCreateListing()}
          buttonText={listingData ? 'Update Listing' : 'Add New Listing'}
          indicator={listingData ? edit_loader : create_listing_loading}
          textStyle={{
            color: colors.secondary,
            fontSize: Platform.OS === 'ios' ? hp(1.8) : hp(2.3),
          }}
        />
      </View>
      <ConfirmationModal
        visible={modalVisible}
        instruction={true}
        onConfirm={() => setModalVisible(!modalVisible)}
        onPressOut={() => setModalVisible(!modalVisible)}
        onRequestClose={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

export const AddNewListings = ({
  buttonPress,
  defaultTab = 'first',
  locationAreaCode,
}) => {
  // console.log('buttonPress =======>', buttonPress);
  const [index, setIndex] = React.useState(defaultTab);
  const [routes] = React.useState([
    {key: 'first', title: 'Discover'},
    {key: 'second', title: 'My Listing'},
    {key: 'third', title: 'Add New Listings'},
  ]);

  const [listingData, setListingData] = React.useState(null);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItem: 'center',
          justifyContent: 'space-evenly',
          marginTop: hp('2.5%'),
          paddingVertical: hp(0.5),
          borderRadius: hp(1),
        }}>
        <TouchableOpacity
          onPress={() => setIndex('first')}
          style={[
            index == 'first'
              ? {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  paddingHorizontal: 5,
                }
              : null,
            {
              width: wp(25),
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(5),
            },
          ]}>
          <Text
            style={{
              color: colors.secondary,
              fontWeight: 'bold',
              fontSize: hp('1.5%'),
            }}>
            Discover
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIndex('second')}
          style={[
            index == 'second'
              ? {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  paddingHorizontal: 5,
                }
              : null,
            {
              width: wp(25),
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(5),
            },
          ]}>
          <Text
            style={{
              color: colors.secondary,
              fontWeight: 'bold',
              fontSize: hp('1.5%'),
            }}>
            My listing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIndex('third')}
          style={[
            index == 'third'
              ? {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  paddingHorizontal: 5,
                }
              : null,
            {
              width: wp(25),
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(5),
            },
          ]}>
          <Text
            style={{
              color: colors.secondary,
              fontWeight: 'bold',
              fontSize: hp('1.5%'),
            }}>
            Add New Listing
          </Text>
        </TouchableOpacity>
      </View>
      {index == 'first' ? (
        <Discover searchPressed={buttonPress} />
      ) : index == 'second' ? (
        <MyListings setListingData={setListingData} setIndex={setIndex} />
      ) : index == 'third' ? (
        <AddNew listingData={listingData} locationAreaCode={locationAreaCode} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: colors.primary,
    width: '30%',
    bottom: hp('1%'),
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
