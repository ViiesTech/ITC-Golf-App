import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../assets/images';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signin} from '../../redux/actions/authAction';
import {ShowToast} from '../../Custom';
import messaging from '@react-native-firebase/messaging';
import {requestPermission} from '../../utils/HelperFunctions';
import {configureNotification} from '../../notifications';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [device_token, setDevice_Token] = useState('');
  // console.log('deviceToken:----->', device_token);

  const dispatch = useDispatch();

  useEffect(() => {
    askNotificationPermission();
    // configureNotification()
  }, []);

  const {signin_loading} = useSelector(state => state.AuthReducer);

  const navigation = useNavigation();

  const askNotificationPermission = async () => {
    const status = await requestPermission('notifications');
    // console.log('status in askNotificationPermission:----->', status);
    if (
      status === 'granted' ||
      status === messaging.AuthorizationStatus.AUTHORIZED
    ) {
      // await messaging().registerDeviceForRemoteMessages()
      const token = await messaging().getToken();
      // console.log('token:----->', token);
      setDevice_Token(token);
    } else {
      return ShowToast('Permission denied');
    }
  };

  const onLoginPress = async () => {
    if (!username) {
      return ShowToast('Please enter your username');
    } else if (!password) {
      return ShowToast('Please enter your password');
    } else {
      await dispatch(signin(username, password, device_token));
    }
  };

  return (
    <AuthContainer>
      <Image source={images.logo} style={styles.image} />
      {/* <ScrollView contentContainerStyle={{backgroundColor: 'red'}}> */}
      <View style={styles.container}>
        <View style={styles.screen}>
          <Text style={styles.heading}>Login Account</Text>
          <Text style={styles.text}>
            Please enter the details below to continue.
          </Text>
          <View style={{paddingTop: hp('2%')}}>
            <InputField
              icon={'user'}
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder={'Username'}
              style={styles.input}
            />
            <InputField
              icon={'lock'}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder={'Password'}
              style={styles.input}
            />
            <TouchableOpacity
              style={{alignItems: 'center'}}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.text}>Forgot Password ?</Text>
            </TouchableOpacity>
            <View style={{paddingTop: hp('0.5%')}}>
              <Button
                buttonText={'LOGIN'}
                onPress={() => onLoginPress()}
                indicator={signin_loading}
              />
              <Button
                buttonText={'Sign Up'}
                onPress={() => navigation.navigate('Signup')}
                buttonStyle={{marginTop: hp('2%')}}
              />
              {/* <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.message}>
                  Dont have an account?{' '}
                  <Text style={{color: colors.primary}}>Sign Up</Text>
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </AuthContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screen: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: hp('16%'),
    width: hp('16%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('3.8%'),
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  input: {
    marginBottom: hp('1%'),
  },
  message: {
    color: colors.white,
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
});
