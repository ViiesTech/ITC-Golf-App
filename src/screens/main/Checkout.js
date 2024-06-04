import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import ContactInput from '../../components/ContactInput';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {ShowToast} from '../../Custom';

const Checkout = () => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    email: '',
    note: '',
  });

  const [country, setCountry] = useState('United States');
  const [countryCode, setCountryCode] = useState('US');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onSelect = selectedCountry => {
    // setCountryCode(country.cca2)
    // console.log('countryyy picker response', selectedCountry.name)
    setCountry(selectedCountry.name);
    setCountryCode(selectedCountry.cca2);
  };

  const navigation = useNavigation();

  const onChangeText = (value, text) => {
    setState({
      ...state,
      [value]: text,
    });
  };

  const onContinueCheckout = () => {
    if (!state.address) {
      return ShowToast('Address is required');
    } else if (!state.email) {
      return ShowToast('Email is required');
    } else if (!state.city) {
      return ShowToast('City is required');
    } else {
      navigation.navigate('SecondaryStack', {
        screen: 'Payments',
        params: {
          address: state.address,
          email: state.email,
          desc: state.note,
          country: country,
          city: state.city
        },
      });
    }
  };

  console.log('country name =====>', country);

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
        <Text style={styles.heading}>Country / Region</Text>
        <TouchableOpacity
          onPress={() => setIsPickerVisible(true)}
          activeOpacity={0.9}
          style={styles.countryButton}>
          <Text style={styles.countryText}>{country}</Text>
          <Arrow name={'keyboard-arrow-down'} color={colors.white} size={25} />
        </TouchableOpacity>
        {isPickerVisible && (
          <CountryPicker
            theme={DARK_THEME}
            onSelect={onSelect}
            onClose={() => setIsPickerVisible(false)}
            cca2={countryCode}
            translation="eng"
            visible={isPickerVisible}
          />
        )}
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
            onPress={onContinueCheckout}
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
    marginBottom: hp(2.5),
    fontSize: hp(2.2),
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryButton: {
    padding: hp(2.4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(4),
    borderWidth: 1.2,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  countryText: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: colors.white,
  },
});
