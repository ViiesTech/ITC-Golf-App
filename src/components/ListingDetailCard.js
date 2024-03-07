import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';

const ListingDetailCard = ({
  image,
  onPress,
  hideTag,
  title,
  desc,
  exp,
  date,
  time,
  area,
  route,
  count,
  total,
  listingImage
}) => {
  return (
    <TouchableOpacity
      style={{marginBottom: hp('10%'), width: '45%'}}
      activeOpacity={0.9}
      onPress={onPress}>
      <Image
        source={route === 'Listing' ? listingImage : image}
        style={styles.image}
        borderRadius={10}
        resizeMode="cover"
      />
      {!hideTag && (
        <View style={styles.textView}>
          <Text style={styles.numberText}>{total}</Text>
        </View>
      )}
      <View style={styles.wrapper}>
        <View
          style={
            hideTag && {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
          }>
          <Text
            style={[
              styles.text,
              {fontSize: hideTag && hp('1.7%'),},
            ]}>
            {title}
          </Text>
          {hideTag && (
            <View style={styles.groupNumberView}>
              <Text style={[styles.numberText, {fontSize: hp('1.5%')}]}>
                {count}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.winText}>{desc}</Text>
        {!hideTag && <Text style={styles.loseText}>{exp}</Text>}
        <View
          style={[styles.line, {marginTop: hideTag ? hp('8%') : hp('4%')}]}
        />

        <View style={styles.textWrapper}>
          <View style={{paddingTop: hp('3%')}}>
            <Text style={styles.textStyle}>DATE:</Text>
            <Text style={styles.fontStyle}>{date}</Text>
          </View>
          <View style={{paddingTop: hp('3%')}}>
            <Text style={styles.textStyle}>{time ? 'TIME:' : 'AREA-CODE'}</Text>
            <Text style={[styles.fontStyle, {alignSelf: 'flex-end'}]}>
              {time ? time : area}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListingDetailCard;

const styles = StyleSheet.create({
  image: {
    height: hp('25%'),
    width: '97%',
  },
  textView: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: hp('1%'),
    position: 'absolute',
    left: hp('1.5%'),
    top: hp('1.3%'),
  },
  groupNumberView: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: hp('0.7%'),
  },
  numberText: {
    color: colors.secondary,
  },
  wrapper: {
    paddingTop: hp('2%'),
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  winText: {
    color: colors.white,
    // position: 'absolute',
    marginTop: hp('2%'),
    fontSize: hp('1.6%'),
    fontWeight: 'bold',
  },
  loseText: {
    color: colors.white,
    marginTop: hp('1.5%'),
    fontSize: hp('1.5%'),
  },
  line: {
    borderBottomWidth: 0.5,
    width: '100%',
    borderBottomColor: colors.lightgray,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('1.5%'),
  },
  fontStyle: {
    color: colors.white,
    fontSize: hp('1.2%'),
    marginTop: hp('1.5%'),
  },
});
