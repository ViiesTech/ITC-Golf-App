import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import colors from '../assets/colors';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TeeBox, handshake, listingPicker} from '../DummyData';
import DiscoverCard from './DiscoverCard';
import MyGroupsCard from './MyGroupsCard';
import DropDownPicker from './DropDownPicker';
import DateInput from './DateInput';
import ContactInput from './ContactInput';
import Button from './Button';
import UploadPicture from './UploadPicture';
import Switch from './Switch';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../Custom';
import {
  DeleteGroup,
  createGroup,
  editGroup,
  getGroupsById,
} from '../redux/actions/groupAction';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {getGroups} from '../redux/actions/homeAction';
import images from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const Discover = ({searchPressed}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {groups, group_loader, groups_filter, filter_loading} = useSelector(
    state => state.HomeReducer,
  );

  // console.log('groups api data =============>', searchPressed);

  React.useEffect(() => {
    // if (groups.length < 1) {
    dispatch(getGroups());
    // }
  }, []);

  const renderAllGroups = () => {
    return group_loader ? (
      <View style={{alignItems: 'center', marginVertical: hp('5%')}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    ) : (
      <FlatList
        data={groups}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <DiscoverCard
            image={
              item.feature_image ? {uri: item.feature_image} : images.dummy
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'GroupDetail',
                params: {item},
              })
            }
            title={item.listing_title}
            titleStyle={{fontSize: hp('1.6%')}}
            count={index + 1}
            group={true}
            players={item.group_desired_teebox}
            date={
              item.suggested_day == '02/18/24' ? item.suggested_day : '02/18/24'
            }
            area_code={
              item.area_code === 'Select a Area Code' ? '240' : item.area_code
            }
            desc={
              item.group_desired_teebox.length == 0
                ? 'All Other'
                : item.group_desired_teebox
            }
            itc={
              item.itc_group_handshake.length == 0
                ? 'CASUAL HANDSHAKE'
                : item.itc_group_handshake
            }
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
          {groups_filter.message}
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

  const renderFilterGroups = () => {
    return filter_loading ? (
      renderLoader()
    ) : groups_filter.message ? (
      renderMessage()
    ) : (
      <FlatList
        data={groups_filter}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <DiscoverCard
            image={
              item.feature_image ? {uri: item.feature_image} : images.dummy
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'GroupDetail',
                params: {item},
              })
            }
            title={item.listing_title}
            titleStyle={{fontSize: hp('1.6%')}}
            count={index + 1}
            group={true}
            players={item.group_desired_teebox}
            date={
              item.suggested_day == '02/18/24' ? item.suggested_day : '02/18/24'
            }
            area_code={
              item.area_code === 'Select a Area Code' ? '240' : item.area_code
            }
            desc={
              item.group_desired_teebox.length == 0
                ? 'All Other'
                : item.group_desired_teebox
            }
            itc={
              item.itc_group_handshake.length == 0
                ? 'CASUAL HANDSHAKE'
                : item.itc_group_handshake
            }
          />
        )}
      />
    );
  };

  return (
    <View style={{paddingTop: hp('4%')}}>
      {searchPressed ? renderFilterGroups() : renderAllGroups()}
    </View>
  );
};

const MyGroups = ({jumpTo, setGroupData}) => {
  const [loaderIndex, setLoaderIndex] = React.useState(null);
  const {my_groups, my_groups_loader, my_groups_message, delete_loader} =
    useSelector(state => state.GroupReducer);

  console.log('my groups from screen =============>', my_groups);
  const {user} = useSelector(state => state.AuthReducer);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGroupsById(user.user_id));
  }, []);

  const renderLoader = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: hp('2%'),
            fontWeight: 'bold',
          }}>
          {my_groups.message || 'No Groups Found'}
        </Text>
      </View>
    );
  };

  const onDeleteGroup = async (group_id, index) => {
    setLoaderIndex(index);
    const res = await dispatch(DeleteGroup(group_id, user.user_id));
    if (res) {
      navigation.navigate('Home');
      return ShowToast(res);
    }
  };
  const onEditGroup = item => {
    jumpTo('third');
    setGroupData(item);
  };

  return (
    <View style={{paddingTop: hp('4%')}}>
      {my_groups_loader
        ? renderLoader()
        : my_groups?.length < 1
        ? renderMessage()
        : my_groups?.map((item, index) => (
            <MyGroupsCard
              deleteText={'Delete Group'}
              onEditPress={() => onEditGroup(item)}
              onDeletePress={() => onDeleteGroup(item.group_id, index)}
              image={
                item.feature_image
                  ? {uri: item.feature_image}
                  : images.dummy
              }
              indicator={loaderIndex == index && delete_loader}
              title={item.listing_title}
              count={index + 1}
              area_code={item.area_code}
              date={item.suggested_day}
              group={true}
              handshake={item.itc_group_handshake}
              players={item.private_group == '1' ? 'Yes' : 'No'}
              onPress={() =>
                navigation.navigate('SecondaryStack', {
                  screen: 'GroupDetail',
                  params: {item, type: 'my groups'},
                })
              }
            />
          ))}
    </View>
  );
};

const AddNew = ({groupData}) => {
  const [state, setState] = React.useState({
    group_title: '',
    description: '',
    hyperlink: '',
    pickers: {
      kind_listing: '',
      area_code: '',
      desired_tee: '',
      itc_handshake: '',
    },
    suggested_day: '',
    private_group: false,
    group_photo_details: {
      name: 'No File Choosen',
      path: '',
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {create_group_loading, edit_loader} = useSelector(
    state => state.GroupReducer,
  );
  const {area_codes} = useSelector(state => state.HomeReducer);
  const {user} = useSelector(state => state.AuthReducer);

  console.log('oh hello', groupData);

  React.useEffect(() => {
    if (groupData) {
      updatedState();
    }
  }, [groupData]);

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
      group_title: '',
      description: '',
      hyperlink: '',
      pickers: {
        kind_listing: '',
        area_code: '',
        desired_tee: '',
        itc_handshake: '',
      },
      suggested_day: '',
      private_group: false,
      group_photo_details: {
        name: 'No File Chosen',
        path: '',
      },
    });
  };

  const onCreateGroup = async () => {
    if (groupData) {
      const res = await dispatch(
        editGroup(
          groupData.group_id,
          user.user_id,
          state.group_title,
          state.description,
          state.private_group,
          state.pickers.area_code,
          state.pickers.itc_handshake,
          state.pickers.desired_tee,
          state.suggested_day,
          state.pickers.kind_listing,
          state.hyperlink,
          state.group_photo_details,
        ),
      );
      if (res) {
        navigation.navigate('Home');
        initialState();
        return ShowToast(res);
      } else {
        return ShowToast(res);
      }
    } else {
      if (state.group_title == '' || state.group_photo_details.path == '' && state.group_photo_details.name == 'No File Choosen') {
        return ShowToast('Please add complete information');
      } else {
        const res = await dispatch(
          createGroup(
            state.group_title,
            state.private_group,
            state.description,
            state.pickers.area_code,
            state.pickers.itc_handshake,
            state.pickers.desired_tee,
            state.suggested_day,
            state.pickers.kind_listing,
            state.hyperlink,
            user.user_id,
            state.group_photo_details,
          ),
        );
        if (res) {
          navigation.navigate('Home');
          initialState();
        }
      }
    }
  };

  const onChoosePhoto = async () => {
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
          group_photo_details: {
            name: response.assets[0].fileName,
            path: response.assets[0].uri,
          },
        }));
      }
    });
  };

  const updatedState = () => {
    setState({
      group_title: groupData.listing_title,
      description: groupData.listing_content,
      hyperlink:
        groupData.hyper_link === 'undefined' ? '' : groupData.hyper_link,
      pickers: {
        kind_listing: groupData.what_kind_of_match_is_this,
        area_code: groupData.area_code,
        desired_tee: groupData.group_desired_teebox,
        itc_handshake: groupData.itc_group_handshake,
      },
      suggested_day: groupData.suggested_day,
      private_group: groupData.private_group === 'false' ? false : true,
      group_photo_details: {
        name: !groupData.feature_image
          ? 'No File Chosen'
          : groupData.feature_image.split('/').pop(),
        path: !groupData.feature_image ? '' : groupData.feature_image,
      },
    });
  };

  return (
    <View style={styles.addnewWrapper}>
      <ContactInput
        label={'Group Name'}
        value={state.group_title}
        onChangeText={text =>
          setState({
            ...state,
            group_title: text,
          })
        }
        placeholder={'Add Title'}
        textColor={colors.lightgray}
        style={styles.input}
      />
      <ContactInput
        label={'Description'}
        value={state.description}
        placeholder={'Description...'}
        onChangeText={text =>
          setState({
            ...state,
            description: text,
          })
        }
        textAlignVertical={'top'}
        style={[styles.input, {height: hp('15%')}]}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between',  }}>
        <View>
          <Text style={styles.textStyle}>What Kind Of Listing Is This?</Text>
          <View style={[styles.pickerStyle, {width: wp('40%')}]}>
            <Picker
              selectedValue={state.pickers.kind_listing}
              dropdownIconColor={colors.white}
              style={{color: colors.white}}
              itemStyle={{fontWeight: 'bold', color: colors.white}}
              onValueChange={(itemValue, itemIndex) =>
                handlePickerChange('kind_listing', itemValue)
              }>
              <Picker.Item
                label={'Select a Value'}
                value={null}
                style={{color: colors.secondary}}
              />
              {listingPicker.map(item => (
                <Picker.Item
                  label={item.pickerText}
                  value={item.pickerText}
                  style={{color: colors.secondary}}
                />
              ))}
            </Picker>
          </View>
        </View>
        <DateInput
          heading={'Suggested Day'}
          onConfirm={date =>
            setState({
              ...state,
              suggested_day: moment(date).format('MM/DD/YY'),
            })
          }
          icon={'date-range'}
          style={{padding: hp('2.3%')}}
          text={state.suggested_day !== '' ? state.suggested_day : 'mm/dd/yy'}
        />
      </View>
      <Text style={styles.textStyle}>IN THE CUP HANDSHAKE</Text>
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={state.pickers.itc_handshake}
          dropdownIconColor={colors.white}
          style={{color: colors.white}}
          itemStyle={{fontWeight: 'bold', color: colors.white}}
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
      <Text style={styles.textStyle}>AREA CODE</Text>
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={state.pickers.area_code}
          dropdownIconColor={colors.white}
          style={{color: colors.white}}
          itemStyle={{fontWeight: 'bold', color: colors.white}}
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
      {TeeBox.map(item => (
        <DropDownPicker
          text={item.text}
          iconColor={colors.lightgray}
          value1={null}
          value2={item.pickerText2}
          value3={item.pickerText3}
          value4={item.pickerText4}
          value5={item.pickerText5}
          iosStyle={{color: colors.white, fontWeight: 'bold'}}
          value6={item.pickerText6}
          onValueChange={itemValue =>
            handlePickerChange('desired_tee', itemValue)
          }
          selectedValue={state.pickers.desired_tee}
          itemStyle={{color: colors.lightgray}}
          label1={item.pickerText1}
          label2={item.pickerText2}
          label3={item.pickerText3}
          label4={item.pickerText4}
          label5={item.pickerText5}
          label6={item.pickerText6}
          style={[styles.picker, {width: '100%'}]}
        />
      ))}
      <Text style={styles.text}>Additional Details</Text>
      <Switch
        text={'Is This A Private Group ?'}
        onToggle={isOn =>
          setState({
            ...state,
            private_group: isOn,
          })
        }
        isOn={state.private_group}
        color={state.private_group ? colors.secondary : colors.lightgray}
      />
      <View style={{paddingTop: hp('4%')}}>
        <UploadPicture
          text={'Picture'}
          fileName={state.group_photo_details.name}
          chooseFile={() => onChoosePhoto()}
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
          textColor={colors.lightgray}
          style={styles.input}
        />
        <Button
          buttonText={groupData ? 'Update Group' : 'Create Group'}
          textStyle={{color: colors.secondary}}
          indicator={groupData ? edit_loader : create_group_loading}
          buttonStyle={{width: '50%', borderRadius: 100, marginTop: hp('2%')}}
          onPress={() => onCreateGroup()}
        />
      </View>
    </View>
  );
};

export const AddNewGroups = ({buttonPressed}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Discover'},
    {key: 'second', title: 'My Groups'},
    {key: 'third', title: 'Add New Groups'},
  ]);

  const [groupData, setGroupData] = React.useState(null);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'first':
        return <Discover searchPressed={buttonPressed} />;
      case 'second':
        return <MyGroups jumpTo={jumpTo} setGroupData={setGroupData} />;
      case 'third':
        return <AddNew groupData={groupData} jumpTo={jumpTo} />;
      default:
        return null;
    }
  };

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
            justifyContent: 'center',
            height: hp('6.8%'),
          }}
          renderLabel={({route}) => (
            <Text
              style={{
                color: colors.secondary,
                fontWeight: 'bold',
                // marginRight: 2,
                // marginTop: hp('0.4%'),
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
    left: 5,
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    paddingVertical: hp('2.5%'),
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0.3,
    borderColor: colors.white,
  },
  addnewWrapper: {
    paddingTop: hp('4%'),
  },
  text: {
    color: colors.white,
    marginBottom: hp('2%'),
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
  pickerStyle: {
    borderWidth: 0.7,
    width: '100%',
    borderRadius: 10,
    marginTop: hp('1.3%'),
    marginBottom: hp('4%'),
    borderColor: colors.lightgray,
  },
  textStyle: {
    color: colors.white,
    fontSize: hp('1.8%'),
    width: Platform.OS === 'ios' && '80%',
    fontWeight: 'bold',
  },
});
