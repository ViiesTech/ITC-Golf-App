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

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Checkout'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'First Name'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Last Name'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Company name (Optional)</Text>
          {/* <Text style={styles.labelIcon}> *</Text> */}
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Company name'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Country / Region</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>

        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Country / Region'}
          //   icon={'user'}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Street Address</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'House number and street address'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            Apartment, suite, unit, etc. (optional)
          </Text>
          {/* <Text style={styles.labelIcon}> *</Text> */}
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Apartment, suite, unit, etc. (optional)'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Town / City</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Town / City'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'First Name'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'State'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>ZIP Code</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'ZIP Code'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Phone'}
          //   icon={'user'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email address</Text>
          <Text style={styles.labelIcon}> *</Text>
        </View>
        <InputField
          style={styles.input}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Email address'}
          //   icon={'user'}
        />
        <Text style={styles.heading}>ADDITIONAL INFORMATION</Text>
        <Text style={styles.headingLabel}>Order notes (optional)</Text>
        <InputField
          style={styles.inputA}
          multiline={true}
          textAlignVertical={'top'}
          //   value={username}
          //   onChangeText={text => setUsername(text)}
          placeholder={'Note about your order, e.g. special notes for delivery'}
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
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    color: colors.white,
    marginLeft: hp('1%'),
  },
  labelIcon: {
    color: 'red',
    fontSize: 20,
  },
  input: {
    marginBottom: hp('2%'),
  },
  inputA: {
    marginBottom: hp('2%'),
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
