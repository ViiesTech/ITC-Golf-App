import {Platform, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

const InputField = ({
  multiline,
  style,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  icon,
  textAlignVertical,
}) => {
  return (
    <LinearGradient
      style={[styles.inputView, style]}
      colors={[colors.gray, 'transparent']}
      start={{x: 0, y: 0}}
      end={{x: 1.5, y: 0}}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
        placeholderTextColor={colors.font_color}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
      />
      <Icon
        name={icon}
        color={colors.font_color}
        size={20}
        style={styles.icon}
      />
    </LinearGradient>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: colors.lightgray,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'space-between',
    // padding: hp('0.7%'),
    padding: Platform.OS === 'android' ? hp('0.7%') : hp('2%'),
    alignSelf: 'center',
    width: hp('40%'),
  },
  input: {
    color: colors.white,
    marginLeft: hp('0.5%'),
    fontSize: hp('1.9%'),
    width: '90%',
  },
  icon: {
    alignSelf: 'center',
    marginRight: hp('1%'),
  },
});
