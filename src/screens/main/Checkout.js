import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import SecondaryHeader from '../../components/SecondaryHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import InputField from '../../components/InputField';

const Checkout = () => {
  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Checkout'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        {/* <InputField
          style={styles.input}
        //   value={username}
        //   onChangeText={text => setUsername(text)}
          placeholder={'Username'}
        //   icon={'user'}
        /> */}
      </ScrollView>
    </Container>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  screen: {
    padding: hp('1%'),
    paddingVertical: hp('5%'),
    // backgroundColor:'red'
  },
  input: {
    marginBottom: hp('2%'),
  },
});
