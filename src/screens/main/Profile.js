import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../assets/images';
import colors from '../../assets/colors';
import ProfileOptions from '../../components/ProfileOptions';
import {MainSettings, Options, settings} from '../../utils/DummyData';
import ProfileSettings from '../../components/ProfileSettings';
import {useNavigation} from '@react-navigation/native';
import Arrow from 'react-native-vector-icons/FontAwesome6';
import {useDispatch, useSelector} from 'react-redux';
import constant from '../../redux/constant';
import {ShowToast} from '../../Custom';
import ConfirmationModal from '../../components/ConfirmationModal';
import {DeactivateAccount} from '../../redux/actions/authAction';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accountModal, setAccountModal] = useState(false);

  const url = 'https://inthecup.golf';

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthReducer);

  const onSettingsPress = async index => {
    if (index == 0) {
      return ShowToast('Coming soon');
      // navigation.navigate('SecondaryStack', {screen: 'Payments'});
    } else if (index == 1) {
      navigation.navigate('SecondaryStack', {screen: 'Notifications'});
    } else if (index == 2) {
      navigation.navigate('SecondaryStack', {screen: 'Wishlist'});
    } else if (index == 3) {
      navigation.navigate('SecondaryStack', {screen: 'ContactUs'});
    } else if (index == 4) {
      // navigation.navigate('SecondaryStack', {screen: 'Language'});
      return ShowToast('Coming soon');
    } else if (index == 5) {
      // navigation.navigate('SecondaryStack', {screen: 'Rating'});
      return ShowToast('Coming soon');
    } else if (index == 6) {
      await Linking.openURL(url);
    } else if (index == 7) {
      navigation.navigate('SecondaryStack', {screen: 'About'});
    } else {
      setAccountModal(true);
    }
  };

  const onMainSettingsPress = index => {
    if (index == 0) {
      navigation.navigate('SecondaryStack', {
        screen: 'AllGroups',
        params: {options: 'Add New Groups'},
      });
    } else if (index == 1) {
      navigation.navigate('SecondaryStack', {
        screen: 'AllGroups',
        params: {options: 'Add New Listings'},
      });
    } else {
      navigation.navigate('SecondaryStack', {
        screen: 'AllGroups',
        params: {options: 'Players You Follow'},
      });
    }
  };

  const onOptionsPress = index => {
    if (index == 1) {
      navigation.navigate('SecondaryStack', {
        screen: 'AllGroups',
        params: {options: 'My Profile'},
      });
    } else if (index == 2) {
      setModalVisible(true);
    }
  };

  const onConfirmLogout = async type => {
    if (type === 'logout') {
      dispatch({
        type: constant.LOGOUT,
      });
      return ShowToast('Logout Successfully');
    } else {
      const res = await dispatch(DeactivateAccount(user.user_id));
      if (res.success) {
        return ShowToast(res.message);
      } else {
        return ShowToast(res.message);
      }
    }
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Profile'} />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={
              user?.featured_image_url
                ? {uri: user?.featured_image_url, priority: FastImage.priority.high}
                : user?.feature_image_url
                ? {uri: user.feature_image_url, priority: FastImage.priority.high}
                : images.profile
            }
            resizeMode={FastImage.resizeMode.cover}
            style={styles.profileImage}
          />
          <View style={styles.wrapper}>
            <Text style={styles.name}>
              {user?.firstname + ' ' + user?.lastname}
            </Text>
            <Text style={styles.email}>@{user?.username}</Text>
          </View>
        </View>
        <View style={{paddingTop: hp('5%')}}>
          <View style={styles.optionsCard}>
            {Options.map((item, i) => (
              <ProfileOptions
                key={i}
                text={item.id == 1 ? user?.user_email : item.text}
                onPress={() => onOptionsPress(i)}
                image={item.icon}
                icon={i !== 0 && 'arrow-right'}
              />
            ))}
          </View>
        </View>
        <View style={{paddingTop: hp('3%')}}>
          <Text style={styles.heading}>Main</Text>
          {MainSettings.map((item, i) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onMainSettingsPress(i)}
              style={styles.mainWrapper}>
              <Text key={i} style={styles.settingsText}>
                {item.text}
              </Text>
              <Arrow
                name={'arrow-right'}
                color={colors.white}
                size={22}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          ))}
          <Text style={[styles.heading, {marginTop: hp('4%')}]}>
            General Settings
          </Text>
          <View style={{paddingTop: hp('5%')}}>
            {settings.map((item, i) => (
              <ProfileSettings
                key={i}
                text={item.text}
                icon={item.icon}
                onPress={() => onSettingsPress(i)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <ConfirmationModal
        visible={modalVisible}
        modalText={'Are you sure you want to logout?'}
        onPressOut={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => onConfirmLogout('logout')}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <ConfirmationModal
        visible={accountModal}
        onPressOut={() => setAccountModal(false)}
        modalText={'Are you sure you want to deactivate your account?'}
        onCancel={() => setAccountModal(false)}
        onConfirm={() => onConfirmLogout('deactivate')}
        onRequestClose={() => {
          setAccountModal(!accountModal);
        }}
      />
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    padding: hp('3%'),
    paddingTop: hp('4%'),
  },
  profileImage: {
    height: hp('18%'),
    borderRadius: 10,
    width: hp('18%'),
  },
  wrapper: {
    marginLeft: hp('3%'),
    marginTop: hp('3%'),
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  email: {
    color: colors.lightgray,
    marginTop: hp('1%'),
    fontSize: hp('2%'),
  },
  optionsCard: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: hp('3%'),
    padding: hp('0.1%'),
  },
  heading: {
    color: colors.white,
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  settingsText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  mainWrapper: {
    flexDirection: 'row',
    paddingTop: hp('4%'),
    justifyContent: 'space-between',
  },
});
