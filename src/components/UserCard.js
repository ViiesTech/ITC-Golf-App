import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../assets/images';
import colors from '../assets/colors';
import { identifyCardType } from '../utils/HelperFunctions';

const UserCard = ({
  cardStyle,
  masterStyle,
  cardholder_name,
  card_number,
  date,
  onCardPress,
}) => {


  console.log('card_number-=->', identifyCardType(card_number));

  //   console.log('format', identifyCardType(card_number))

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onCardPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: colors.white,
            borderRadius: 10,
          },
          cardStyle,
        ]}>
        <View style={{margin: hp('2.5%')}}>
          <Text style={styles.userCartText}>{cardholder_name}</Text>
          <Image
            source={images.card_scan}
            borderRadius={10}
            style={styles.imageStyle}
          />
          <View style={{marginTop: hp('3%')}}>
            <Text style={styles.userCartText}>{card_number}</Text>
            <Text
              style={{
                fontWeight: 'light',
                color: '#efefef',
                fontSize: hp('1.5%'),
              }}>
              {date}
            </Text>
          </View>
        </View>
        <Image
          // source={images.master_card}
          source={
            identifyCardType(card_number) === 'Visa'
              ? images.visa_card : identifyCardType(card_number) === 'Mastercard' ?
               images.master_card : identifyCardType(card_number) === 'AmericanExpress' && images.express
          }
          style={[styles.image, masterStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCartText: {
    fontWeight: 'light',
    color: '#fff',
    fontSize: hp('2.5%'),
  },
  image: {
    height: hp('6%'),
    marginTop: hp('2.5%'),
    marginRight: hp('5%'),
    width: '19%',
  },
  imageStyle: {
    height: hp('3%'),
    marginTop: hp('3%'),
    width: hp('5%'),
  },
});
