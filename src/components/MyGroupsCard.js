import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import SVGImage from './SVGImage';
import icons from '../assets/icons';

const MyGroupsCard = ({image, count, title, players, date, area_code, handshake, onPress}) => {
  console.log(title.length);

  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.9} onPress={onPress}>
      <Image source={image} style={styles.image} borderRadius={10} />
      <View style={styles.secondaryWrapper}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.teeView}>
                <SVGImage image={icons.teeBlack} />
              </View>
              <View style={styles.numberView}>
                <Text style={{color: colors.primary}}>{count}</Text>
              </View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              Total Players:
              <Text style={{color: colors.white}}> {players}</Text>
            </Text>
            <Text style={[styles.text, {marginTop: hp('0.5%')}]}>
              ITC HANDSHAKE:
              <Text style={{color: colors.white}}> {handshake}</Text>
            </Text>
            <View style={styles.border} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: hp('1.5%'),
              }}>
              <View>
                <Text style={styles.text2}>AREA CODE:</Text>
                <Text style={styles.text3}>{area_code}</Text>
              </View>
              <View style={styles.verticleLine} />
              <View>
                <Text style={styles.text2}>DATE:</Text>
                <Text style={styles.text3}>{date}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyGroupsCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: hp('4%'),
  },
  image: {
    height: hp('20%'),
    width: hp('18%'),
  },
  secondaryWrapper: {
    // flexDirection: 'row',
    marginLeft: hp('1%'),
    marginTop: hp('1%'),
    // flex: 1,
    // justifyContent: 'space-between'
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('1.9%'),
  },
  teeView: {
    backgroundColor: colors.primary,
    // position: 'relative',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('3%'),
    borderRadius: 5,
  },
  numberView: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: 5,
    marginLeft: hp('1%'),
    borderColor: colors.lightgray,
  },
  textWrapper: {
    // position: 'absolute',
    // backgroundColor: 'red',
    width: hp('26%'),
    marginTop: hp('1.5%'),
  },
  text: {
    color: colors.lightgray,
    // width: hp('17%')
    // fontSize: hp('1.4%'),
  },
  border: {
    borderBottomWidth: 1,
    marginTop: hp('1.5%'),
    borderBottomColor: colors.gray,
  },
  text2: {
    color: colors.primary,
    fontSize: hp('1.2%'),
  },
  text3: {
    color: colors.white,
    fontSize: hp('1.2%'),
    marginTop: hp('0.4%'),
  },
  verticleLine: {
    height: hp('6%'),
    width: 1,
    backgroundColor: colors.gray,
  },
});
