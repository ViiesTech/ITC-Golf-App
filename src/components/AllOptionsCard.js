import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Screens} from '../utils/DummyData';

const AllOptionsCard = ({active, onChangeTab}) => {
  const onTextPress = text => {
    onChangeTab(text);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {Screens.map((item, index) => (
          <>
            {index !== 0 && <View style={styles.line} />}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onTextPress(item.text)}
              style={styles.touchable}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      active === item.text ? colors.secondary : colors.white,
                  },
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </>
        ))}
      </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onTextPress('My Profile')}>
          <Text
            style={[
              styles.text,
              {
                color:
                  active === 'My Profile' ? colors.secondary : colors.white,
              },
            ]}>
            My Profile
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default AllOptionsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: hp('2%'),
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('1.6%'),
  },
  touchable: {
    paddingHorizontal: wp('2%'),
  },
  text: {
    fontSize: hp('1.3%'),
    fontWeight: 'bold',
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: colors.white,
    // marginHorizontal: wp('1%'),
  },
});
