import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
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
      {Screens.slice(0, 3).map(item => (
        <>
          <View style={item.id !== 1 && item.id !== 4 && styles.line} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onTextPress(item.text)}>
            <Text
              style={[
                styles.text,
                {color: active === item.text ? colors.secondary : colors.white},
              ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        </>
      ))}
      <TouchableOpacity onPress={() =>onTextPress('My Profile')} activeOpacity={0.9}>
        <Text
          style={[
            styles.text,
            {color: active === 'My Profile' ? colors.secondary : colors.white},
          ]}>
          {'My Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllOptionsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: hp('1.6%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // gap: 0.1,
    flexWrap: 'wrap',
  },
  text: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? hp('1.1%') : hp('1.4%'),
    fontWeight: 'bold',
  },
  line: {
    height: hp('2.5%'),
    marginHorizontal: hp('1.5%'),
    width: 1,
    backgroundColor: colors.white,
  },
});
