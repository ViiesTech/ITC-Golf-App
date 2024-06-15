import React, { useState } from 'react'
import { StyleSheet, Text, View, Image,  TouchableOpacity } from 'react-native'
import AuthContainer from '../../components/AuthContainer';
import images from '../../assets/images';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/actions/authAction';
import { ShowToast } from '../../Custom';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const { signup_loading } = useSelector(state => state.AuthReducer)

  const initialState = () => {
    setUsername('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setCPassword('')
  }

  const onSignupPress = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!username) {
      return ShowToast('Please fill all fields')
    } else if (password.length < 8) {
      return ShowToast('Password is too short')
    } else if (cpassword !== password) {
      return ShowToast('Password does not match')
    } else if (reg.test(email) === false) {
      return ShowToast('Please enter a valid email')
    } else {
      const res = await dispatch(signup(
        username,
        firstname,
        lastname,
        email,
        password,
        cpassword
      ))
      if (res) {
        navigation.goBack()
        initialState()
        return ShowToast('User created Successfully')
      }
    }
  }

  return (
    <AuthContainer>
      <View style={styles.screen}>
        <Image
          source={images.logo}
          style={styles.image}
        />
        <View style={{ paddingTop: hp('4%') }}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.message}>Please enter the details below to continue</Text>
          <View style={{ paddingTop: hp('3%') }}>
            <InputField
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder={'Username'}
              icon={'user'}
            />
            <InputField
              style={styles.input}
              value={firstname}
              onChangeText={(text) => setFirstName(text)}
              placeholder={'First Name'}
              icon={'user'}
            />
            <InputField
              style={styles.input}
              value={lastname}
              onChangeText={(text) => setLastName(text)}
              placeholder={'Last Name'}
              icon={'user'}
            />
            <InputField
              style={styles.input}
              placeholder={'@example.com'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType={'email-address'}
              icon={'mail'}
            />
            {/* <InputField
              style={styles.input}
              icon={'smartphone'}
              keyboardType={'numeric'}
              placeholder={'Phone number'}
            /> */}
            <InputField
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder={'Password'}
              secureTextEntry={true}
              icon={'lock'}
            />
            <InputField
              style={styles.input}
              icon={'lock'}
              value={cpassword}
              onChangeText={(text) => setCPassword(text)}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.button}
              buttonText={'SIGNUP'}
              indicator={signup_loading}
              onPress={() => onSignupPress()}
            />
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.message}>Have an account? <Text style={{ color: colors.primary }}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthContainer>
  )
}

export default Signup;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    paddingTop: hp('4%'),
  },
  image: {
    height: hp('16%'),
    width: hp('16%'),
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
    marginTop: hp('3%')
  },
  input: {
    marginBottom: hp('2%'),
  },
  button: {
    marginTop: hp('0.5%')
  }
})