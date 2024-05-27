import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import SVGImage from './SVGImage';
import icons from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const Header = ({iconStyle, headerStyle}) => {
  const [isNewNotification, setIsNewNotification] = useState(false);

  const navigation = useNavigation();

  const {user} = useSelector(state => state.AuthReducer);

  return (
    <View style={[styles.headerView, headerStyle]}>
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
          style={styles.image}
        />
        <Text style={styles.headerText}>Hello {user.username}!</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('SecondaryStack', {screen: 'Notifications'})
        }
        style={{paddingTop: hp('1.9%')}}>
        <SVGImage image={icons.notification} style={[styles.icon, iconStyle]} />
        {/* <View style={styles.bellStyle} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('3%'),
    paddingTop: hp('6%'),
  },
  image: {
    height: hp('6.5%'),
    borderRadius: 100,
    width: hp('6.5%'),
  },
  headerText: {
    color: colors.white,
    width: hp(32),
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    marginLeft: hp('2%'),
  },
  icon: {
    alignSelf: 'center',
  },
  bellStyle: {
    backgroundColor: colors.red,
    position: 'absolute',
    bottom: hp(3.7),
    right: 2,
    borderWidth: 1,
    borderColor: colors.white,
    height: hp(1),
    width: hp(1),
    borderRadius: 100,
  },
});
