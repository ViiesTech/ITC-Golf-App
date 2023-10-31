import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import AuthContainer from '../../components/AuthContainer';
import images from '../../assets/images';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {

  const navigation = useNavigation()

  return (
    <AuthContainer>
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <Image
          source={images.logo}
          style={styles.image}
        />
        <View style={{ paddingTop: hp('7%') }}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.message}>Please enter the details below to continue</Text>
          <View style={{ paddingTop: hp('3%') }}>
            <InputField
              style={styles.input}
              placeholder={'Name'}
              icon={'user'}
            />
            <InputField
              style={styles.input}
              placeholder={'Last Name'}
              icon={'user'}
            />
            <InputField
              style={styles.input}
              placeholder={'@example.com'}
              keyboardType={'email-address'}
              icon={'mail'}
            />
            <InputField
              style={styles.input}
              icon={'smartphone'}
              keyboardType={'numeric'}
              placeholder={'Phone number'}
            />
            <InputField
              style={styles.input}
              placeholder={'Password'}
              secureTextEntry={true}
              icon={'lock'}
            />
            <InputField
              style={styles.input}
              icon={'lock'}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.button}
              buttonText={'SIGNUP'}
              onPress={() => navigation.navigate('MainStack')}
            />
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.message}>Have have an account?  <Text style={{ color: colors.primary }}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AuthContainer>
  )
}

export default Signup;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    paddingTop: hp('7%'),
    paddingBottom: hp('7%')
  },
  image: {
    height: hp('16%'),
    width: '30%',
  },
  heading: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('3.8%')
  },
  message: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: hp('2%')
  },
  input: {
    marginBottom: hp('2%')
  },
  button: {
    marginTop: hp('0.5%')
  }
})