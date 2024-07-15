import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import Button from './Button';

const UploadPicture = ({text, style, buttonStyle, chooseFile, fileName}) => {
  return (
    <View style={{marginBottom: hp('2%')}}>
      <Text style={styles.heading}>{text}</Text>
      <View style={[styles.uploadView, style]}>
        <View>
          <Button
            buttonText={'Choose File'}
            textStyle={{color: colors.primary}}
            buttonStyle={[styles.button, buttonStyle]}
            onPress={chooseFile}
          />
        </View>
        <Text style={styles.text}>{fileName}</Text>
      </View>
    </View>
  );
};

export default UploadPicture;

const styles = StyleSheet.create({
  uploadView: {
    borderWidth: 1.5,
    padding: hp('2%'),
    borderColor: colors.gray,
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  button: {
    backgroundColor: colors.white,
    padding: hp('0.4%'),
  },
  text: {
    color: colors.lightgray,
    alignSelf: 'center',
    flex: 1,
    fontSize: hp('2%'),
    marginLeft: hp('2%'),
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});
