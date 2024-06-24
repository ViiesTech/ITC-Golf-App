import {Image, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const Sponsors = ({image, title}) => {
  // const onImagePress = async () => {
  //     await Linking.openURL('https://inthecup.golf')
  // }

  return (
    <View style={{padding: hp('2.5%')}}>
      <Image
        source={image}
        style={styles.listingImage}
        borderRadius={10}
        resizeMode="cover"
      />
      <View style={styles.textCont}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Sponsors;

const styles = StyleSheet.create({
  listingImage: {
    height: hp('32%'),
    marginBottom: hp('4%'),
    alignSelf: 'center',
    width: hp('30%'),
  },
  endIcon: {
    alignSelf: 'center',
    paddingTop: hp('5%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp(4),
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
