import {StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {filterItems, picker} from '../DummyData';
import Button from './Button';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';

const SearchFilter = ({
  searchStyle,
  style,
  onValueChange,
  selectedValue,
  onSearchPress,
}) => {
  // const [selectedOption, setSelectedOption] = useState('');

  const {area_codes} = useSelector(state => state.HomeReducer);

  // console.log('area codessss =======>', selectedValue)

  return (
    <View style={[styles.card, style]}>
      <View style={{paddingTop: hp('1%')}}>
        <Text style={styles.text}>AREA CODE</Text>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={selectedValue}
            style={styles.textStyle}
            dropdownIconColor={colors.secondary}
            onValueChange={onValueChange}>
            <Picker.Item
              label="Select"
              value={null}
              style={styles.labelStyle}
            />
            {area_codes?.map(item => (
              <Picker.Item
                label={item}
                value={item}
                style={styles.labelStyle}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Button
        buttonText={'Search'}
        onPress={onSearchPress}
        textStyle={{color: colors.secondary, fontSize: hp('2%')}}
        buttonStyle={[
          {
            borderRadius: 100,
            marginTop: hp('3%'),
            width: hp('22%'),
            alignSelf: 'center',
          },
          searchStyle,
        ]}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    width: '90%',
    marginTop: hp('2%'),
    borderRadius: 15,
    padding: hp('1.7%'),
  },
  pickerStyle: {
    width: '99%',
    alignSelf: 'center',
    marginTop: hp('1%'),
    borderRadius: 5,
    borderWidth: 0.4,
  },
  text: {
    color: colors.secondary,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  textStyle: {
    color: colors.secondary,
    fontSize: hp('2%'),
  },
  labelStyle: {
    color: colors.secondary,
  },
});
