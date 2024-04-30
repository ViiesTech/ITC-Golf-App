import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const NotificationsCard = ({
  image,
  text,
  date,
  desc,
  onAcceptPress,
  onRejectPress,
  accept_loader,
  reject_loader,
  hidebuttons,
  status
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row'}}>
        <Image source={image} style={styles.image} borderRadius={5} />
        <View style={styles.Textwrapper}>
          <Text style={styles.text}>{text}</Text>
          <Text
            style={[
              styles.text,
              {fontSize: hp('1.5%'), color: colors.lightgray, marginBottom: 2},
            ]}>
            {desc}
          </Text>
          <View style={{flexDirection: 'row', marginTop: hp('1%'), gap: 15}}>
            {/* <Alarm
              name={'alarm'}
              color={colors.lightgray}
              size={17}
              style={{alignSelf: 'center'}}
            /> */}
            {/* <Text style={styles.date}>{date}</Text>  */}
            {!hidebuttons ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.9}
                  onPress={onAcceptPress}>
                  {accept_loader ? (
                    <ActivityIndicator
                      size={'small'}
                      color={colors.secondary}
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    <Text style={styles.buttonText}>Accept</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.9}
                  onPress={onRejectPress}>
                  {reject_loader ? (
                    <ActivityIndicator
                      size={'small'}
                      color={colors.secondary}
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    <Text style={styles.buttonText}>Reject</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.statusText}>{status}</Text>
            )}
          </View>
        </View>
      </View>
      {/* <More
        name={'more-vert'}
        color={colors.lightgray}
        size={22}
      /> */}
    </View>
  );
};

export default NotificationsCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('5%'),
  },
  image: {
    height: hp('11%'),
    width: hp('11.5%'),
  },
  Textwrapper: {
    marginLeft: hp('1.5%'),
    marginTop: hp('1%'),
  },
  text: {
    color: colors.white,
    marginBottom: hp('1%'),
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  date: {
    color: colors.lightgray,
    fontSize: hp('1.5%'),
    marginLeft: hp('1.2%'),
  },
  button: {
    padding: hp('0.5%'),
    width: hp('11%'),
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  buttonText: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: hp('1.3%'),
    color: colors.lightgray,
    marginBottom: 2,
  },
});
