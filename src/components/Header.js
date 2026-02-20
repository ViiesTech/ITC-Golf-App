import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import SVGImage from './SVGImage';
import icons from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const Header = ({iconStyle, headerStyle, showBell = true}) => {
  const navigation = useNavigation();

  const {user} = useSelector(state => state?.AuthReducer);
  const {noti_count} = useSelector(state => state?.HomeReducer);

  return (
    <View style={[styles.headerView, headerStyle]}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          source={
            user?.featured_image_url
              ? {
                  uri: user?.featured_image_url,
                  priority: FastImage.priority.high,
                }
              : user?.feature_image_url
              ? {uri: user.feature_image_url, priority: FastImage.priority.high}
              : images.profile
          }
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
        />
        <Text style={styles.headerText}>Hello {user.username}!</Text>
      </View>
      {showBell && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('SecondaryStack', {screen: 'Notifications'})
          }
          style={{paddingTop: hp('1.9%')}}>
          <SVGImage
            image={icons.notification}
            style={[styles.icon, iconStyle]}
          />
          {!noti_count == 0 && (
            <View style={styles.bellStyle}>
              <Text style={styles.count}>{noti_count}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
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
    width: 'auto',
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
    alignItems: 'center',
    justifyContent: 'center',
    bottom: hp(3.7),
    // right: 0,
    left: 11,
    borderWidth: 1,
    borderColor: colors.white,
    height: hp(2),
    width: hp(2),
    borderRadius: 100,
  },
  count: {
    color: colors.white,
    fontSize: hp(1.2),
    fontWeight: 'bold',
  },
});
