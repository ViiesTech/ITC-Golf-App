import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import SVGImage from './SVGImage';
import icons from '../assets/icons';

const DiscoverCard = ({
  image,
  title,
  players,
  date,
  area_code,
  itc,
  titleStyle,
  time,
  count,
  onPress,
  group
}) => {
//   console.log(desc.length);

  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.9} onPress={onPress}>
      <Image source={image} style={styles.image} borderRadius={10} />
      <View style={styles.textWrapper}>
        <View style={styles.numberView}>
          <Text style={{color: colors.primary}}>{count}</Text>
        </View>
       <View style={styles.contentWrapper}> 
        <Text style={[styles.name, titleStyle]}>
          {title}
        </Text>
        <View style={styles.svgImageContainer}>
        <SVGImage image={icons.tee} />
        </View>
        </View>
      </View>
      <View style={styles.secondaryWrapper}>
        <Text style={styles.textStyle}>
            {group ? 'Desired Tee Box:' : 'Total Players:'}
          <Text style={styles.textStyle}> {players}</Text>
        </Text>
        <Text style={styles.loseText}>ITC_HANDSHAKE:<Text style={styles.loseText}> {itc}</Text></Text>
        <View style={styles.border} />
        <View
          style={{
            paddingTop: hp('2%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '95%',
          }}>
          <View>
            <Text style={styles.heading}>DATE:</Text>
            <Text style={styles.text2}>{date}</Text>
          </View>
          <View style={styles.verticleLine} />
          <View>
            <Text style={styles.heading}>{time ? 'TIME:' : 'AREA CODE:'}</Text>
            <Text style={[styles.text2, {marginLeft: time ? 0 : hp('2%')}]}>
              {time ? time : area_code}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscoverCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp('3.5%'),
    borderWidth: 1,
    borderColor: colors.gray,
    height: hp('52%'),
    width: '47%',
    borderRadius: 10,
  },
  image: {
    height: hp('22%'),
    width: '101%',
  },
  // numberView: {
  //   borderWidth: 1,
  //   padding: hp('0.5%'),
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   borderColor: colors.gray,
  // },
  // name: {
  //   color: colors.white,
  //   fontSize: hp('1.7%'),
  //   // flex: 1,
  //   marginLeft: hp('1%'),
  //   alignSelf: 'center',
  // },
  // textWrapper: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   backgroundColor: 'red',
  //   justifyContent: 'space-between',
  //   marginLeft: hp('1%'),
  //   paddingTop: hp('2%'),
  // },
  numberView: {
    borderWidth: 1,
    padding: hp('0.5%'),
    alignItems: 'center',
    borderRadius: 5,
    borderColor: colors.gray,
    alignSelf: 'flex-start'
  },
  name: {
    color: colors.white,
    fontSize: hp('1.7%'),
    marginLeft: hp('1%'),
    alignSelf: 'center',
    flex: 1, 
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    marginLeft: hp('1%'),
    paddingTop: hp('2%'),
  },
  textStyle: {
    color: colors.lightgray,
  },
  loseText: {
    width: '90%',
    marginTop: hp('1%'),
    color: colors.lightgray,
  },
  border: {
    borderBottomWidth: 1,
    width: '95%',
    borderBottomColor: colors.gray,
    marginTop: hp('2%'),
  },
  secondaryWrapper: {
    marginLeft: hp('1%'),
    paddingTop: hp('1.6%'),
    // position: 'absolute',
    // top: hp('29%'),
    // width: '90%'
  },
  heading: {
    color: colors.primary,
    fontSize: hp('1.4%'),
  },
  verticleLine: {
    height: hp('5.5%'),
    width: 1,
    backgroundColor: colors.gray,
  },
  text2: {
    color: colors.white,
    fontSize: hp('1.5%'),
    marginTop: hp('1%'),
  },
  contentWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // alignSelf: 'center',
    flex: 1,
    // alignItems: 'center',
  },
  svgImageContainer:{
    // position: 'absolute',
    marginTop: hp('0.6%')
    // right: 0
  }
});
