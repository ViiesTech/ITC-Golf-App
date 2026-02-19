import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const Sponsors = ({image, title, onPress}) => {
  // const onImagePress = async () => {
  //     await Linking.openURL('https://inthecup.golf')
  // }

  // console.log('title:-', title);

  return (
    <TouchableOpacity
      style={{padding: hp('2.5%')}}
      activeOpacity={0.9}
      onPress={onPress}>
      <Image
        source={image}
        style={styles.listingImage}
        borderRadius={10}
        resizeMode="contain"
      />

      <View style={styles.textCont}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Sponsors;

const styles = StyleSheet.create({
  listingImage: {
    height: hp('15%'),
    width: hp('15%'),
    // alignSelf: 'center',
    // backgroundColor: '#fff',
  },
  endIcon: {
    alignSelf: 'center',
    paddingTop: hp('5%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp(3.7),
    color: colors.white,
  },
  textCont: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
