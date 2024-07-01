import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Back from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
import SVGImage from './SVGImage';
import icons from '../assets/icons';

const SecondaryHeader = ({icon, text, style, link, onLinkPress, linkButton, headerStyle}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerView, style]}>
      <View style={{flexDirection: 'row',  width: hp(33)}}>
        <Back
          name={'keyboard-backspace'}
          color={colors.white}
          size={25}
          style={{alignSelf: 'center'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.headerText,headerStyle]}>{text}</Text>
      </View>
        {link && (
          <TouchableOpacity style={[styles.linkStyle,linkButton]} activeOpacity={0.9} onPress={onLinkPress}>
            <Text style={styles.textStyle}>View Link</Text>
          </TouchableOpacity>
        )}
      {icon && <SVGImage image={icons.sort} style={{alignSelf: 'center'}} />}
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: hp('1.5%'),
    padding: hp('3%'),
  },
  headerText: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    width: hp(28),
    marginLeft: hp('2%'),
  },
  linkStyle: {
    borderRadius: 100,
    padding: hp('0.9%'),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: hp('0.4%'),
    alignItems: 'center',
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('1.7%'),
  },
});
