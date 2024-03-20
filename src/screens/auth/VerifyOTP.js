import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AuthContainer from '../../components/AuthContainer';
import images from '../../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import {ShowToast} from '../../Custom';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  resetPasswordLink,
  verifyOTP,
} from '../../redux/actions/authAction';
import CodeInput from '../../components/CodeInput';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';

const VerifyOTP = ({route}) => {
  const userName = route.params.name;
  const email = route.params.email;

  const [otpCode, setOtpCode] = useState('');
  const [seconds, setSeconds] = useState(60);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {verify_loading} = useSelector(state => state.AuthReducer);

  const onVerifyOTP = async () => {
    if (!otpCode) {
      return ShowToast('Please enter your OTP Code');
    } else {
      const res = await dispatch(verifyOTP(userName, otpCode));
      if (res) {
        navigation.navigate('UpdatePassword', {
          otp: otpCode,
          name: userName,
        });
      } else {
        return ShowToast('Wrong OTP!')
      }
    }
  };

  const onResendCode = async () => {
    StartTimer();
    setOtpCode('')
    const res = await dispatch(resetPasswordLink(userName, email));
    console.log('from screeen =========>', res);
    if (res) {
      return ShowToast('OTP send to your email');
    } else {
      return ShowToast('Unable to send OTP Code');
    }
  };

  const StartTimer = () => {
    let interval = setInterval(() => {
      setSeconds(prevSeconds => {
        const timer = prevSeconds > 0 && prevSeconds - 1;
        if (timer === 0) {
          clearInterval(interval);
          setSeconds(60);
        }
        return timer;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <AuthContainer>
      <ScrollView contentContainerStyle={styles.screen}>
      <Image source={images.logo} style={styles.image} />
        <Text style={styles.heading}>Password Reset Verification</Text>
        <Text style={styles.text}>
          Enter the otp sent to {email} to proceed with resetting your password.
        </Text>
        <View style={{paddingTop: hp('2%')}}>
          <CodeInput setValue={setOtpCode} value={otpCode} />
          {seconds < 60 ? (
            <Text style={styles.timerDigits}>
              {seconds < 10 ? seconds : '0:' + seconds}
            </Text>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{marginTop: hp('4%')}}
              onPress={() => onResendCode()}>
              <FontAwesome5
                name="refresh-outline"
                type="Ionicons"
                color="#e0e0e0"
                size={32}
                style={{textAlign: 'center', color: colors.primary}}
              />
              <Text
                style={{
                  color: colors.primary,
                  textAlign: 'center',
                }}>
                Resend code
              </Text>
            </TouchableOpacity>
          )}
          <Button
            buttonText={'Continue'}
            onPress={() => onVerifyOTP()}
            indicator={verify_loading}
            buttonStyle={{marginTop: hp('3%')}}
          />
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  image: {
    height: hp('16%'),
    width: hp('16%'),
    marginBottom: hp('7%'),
    alignSelf: 'center',
  },
  screen: {
    // flex: 0.8,
    // justifyContent: 'flex-end',
    paddingTop: hp('5.5%'),
    // paddingBottom: hp('8%'),
    alignItems: 'center',
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('3.2%'),
  },
  text: {
    color: colors.white,
    width: '80%',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  input: {
    marginBottom: hp('1%'),
  },
  timerDigits: {
    color: colors.primary,
    fontSize: hp('1.9%'),
    alignSelf: 'center',
  },
});
