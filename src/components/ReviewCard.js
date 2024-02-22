import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ReviewGiven from './ReviewGiven';
import {reviews} from '../DummyData';

const ReviewCard = ({image, name, ratings}) => {
  return (
    <View style={styles.cardStyle}>
      <View style={{width: hp('8.9%')}}>
        <Image source={image} style={styles.image} borderRadius={10} />
        <View style={{paddingTop: hp('2%')}}>
          {reviews.map(item => {
            // console.log(ratings[item.text.toLowerCase().replace(/\s+/g, '_')])
            return (
              <ReviewGiven
                text={item.text}
                rating={ratings[item.text.toLowerCase().replace(/\s+/g, '_')]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.wrapper}>
          <Text style={styles.posted}>Posted By:</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.border} />
        </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: '#1C1C1C',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderRadius: 10,
    width: '48%',
    padding: hp('1.5%'),
    borderWidth: 1,
    marginBottom: hp('5%'),
    borderColor: colors.lightgray,
  },
  image: {
    height: hp('8%'),
    width: hp('8%'),
  },
  wrapper: {
    marginTop: hp('1%'),
    height: hp('7%'),
    // width: '10%',
    // backgroundColor: 'blue',
  },
  posted: {
    color: colors.lightgray,
    fontSize: hp('1.3%'),
  },
  name: {
    marginTop: hp('1%'),
    color: colors.white,
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
  },
  border: {
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 0.4,
    // width: '100%',
    marginTop: hp('1.5%'),
  },
});
