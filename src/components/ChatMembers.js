import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const ChatMembers = ({image, text}) => {
  return (
    <View style={styles.border}>
      <Image
        source={image}
        style={styles.avatarStyle}
        borderRadius={100}
      />
      <Text style={styles.name}>{text}</Text>
    </View>
  );
};

export default ChatMembers;

const styles = StyleSheet.create({
  border: {
   
  },
  avatarStyle: {
    height: hp('7%'),
    width: hp('7%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  name: {
    color: colors.white,
    fontSize: hp('2%'),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
