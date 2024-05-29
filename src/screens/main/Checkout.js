import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PixelRatio,
  Switch,
} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import ContactInput from '../../components/ContactInput';

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Checkout'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <ContactInput
          style={styles.input}
          label={'First Name'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'First Name'}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Last Name'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          // placeholder={'Last Name'}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Company name (Optional)'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Company name'}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Country / Region'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Street Address'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        
        <ContactInput
          style={styles.input}
          label={'Apartment, suite, unit, etc. (optional)'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        
        <ContactInput
          style={styles.input}
          label={'Town / City'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'State'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        
        <ContactInput
          style={styles.input}
          label={'ZIP Code'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Phone'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.input}
          label={'Email Address'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <ContactInput
          style={styles.inputA}
          multiline={true}
          textAlignVertical={'top'}
          label={'ADDITIONAL INFORMATION'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          //   icon={'user'}
        />
        <View style={styles.buttonContainer}>
          <Button
            buttonText={'Continue'}
            textStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate('SecondaryStack', {screen: 'Payments'})
            }
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  screen: {
    padding: hp('1%'),
    paddingVertical: hp('5%'),
    width: '90%',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
  input: {
    // marginBottom: hp('2%'),
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
  },
  inputA: {
    // marginBottom: hp('2%'),
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
    height: hp('15%'),
  },
  heading: {
    color: colors.white,
    marginLeft: hp('1%'),
    fontSize: 15,
    fontWeight: 'bold',
  },
  headingLabel: {
    color: colors.white,
    marginLeft: hp('1%'),
    marginVertical: hp('2%'),
  },
  buttonContainer: {
    marginTop: hp('5%'),
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: hp('2%'),
    color: colors.secondary,
  },
  button: {
    borderRadius: 100,
  },
});
