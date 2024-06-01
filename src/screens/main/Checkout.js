import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import ContactInput from '../../components/ContactInput';

const Checkout = () => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    country: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    email: '',
    note: '',
  });

  const navigation = useNavigation();

  const onChangeText = (value, text) => {
    setState({
      ...state,
      [value]: text,
    });
  };

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
          value={state.first_name}
          onChangeText={text => onChangeText('first_name', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Last Name'}
          value={state.last_name}
          onChangeText={text => onChangeText('last_name', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Company name (Optional)'}
          value={state.company_name}
          onChangeText={text => onChangeText('company_name', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Country / Region'}
          value={state.country}
          onChangeText={text => onChangeText('country', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Street Address'}
          value={state.address}
          onChangeText={text => onChangeText('address', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Apartment, suite, unit, etc. (optional)'}
          value={state.apartment}
          onChangeText={text => onChangeText('apartment', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Town / City'}
          value={state.city}
          onChangeText={text => onChangeText('city', text)}
        />
        <ContactInput
          style={styles.input}
          label={'State'}
          value={state.state}
          onChangeText={text => onChangeText('state', text)}
        />
        <ContactInput
          style={styles.input}
          label={'ZIP Code'}
          value={state.zip_code}
          onChangeText={text => onChangeText('zip_code', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Phone'}
          value={state.phone}
          onChangeText={text => onChangeText('phone', text)}
        />
        <ContactInput
          style={styles.input}
          label={'Email Address'}
          value={state.email}
          onChangeText={text => onChangeText('email', text)}
        />
        <ContactInput
          style={styles.inputA}
          multiline={true}
          label={'ADDITIONAL INFORMATION'}
          value={state.note}
          onChangeText={text => onChangeText('note', text)}
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
    paddingVertical: hp('2%'),
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
  },
  inputA: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
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
    marginTop: hp('2%'),
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
