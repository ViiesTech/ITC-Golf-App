import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import SVGImage from './SVGImage';
import icons from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = ({iconStyle, headerStyle}) => {
  const [isNewNotification, setIsNewNotification] = useState(false);

  const navigation = useNavigation();

  const {user} = useSelector(state => state.AuthReducer);

  return (
    <View style={[styles.headerView, headerStyle]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={
            user?.featured_image_url
              ? {uri: user?.featured_image_url}
              : user?.feature_image_url
              ? {uri: user.feature_image_url}
              : images.profile
          }
          style={styles.image}
          borderRadius={100}
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
    width: hp('6.5%'),
  },
  headerText: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    marginLeft: hp('2.7%'),
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
