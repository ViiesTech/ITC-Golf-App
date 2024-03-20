import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import AuthContainer from '../../components/AuthContainer';
import images from '../../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {ShowToast} from '../../Custom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordLink} from '../../redux/actions/authAction';
import {useNavigation} from '@react-navigation/native';

const ForgetPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const {password_link_loading} = useSelector(state => state.AuthReducer);

  const navigation = useNavigation();

  const onSendResetLink = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!username) {
      return ShowToast('Please type your username');
    } else if (!email) {
      return ShowToast('Please type your email');
    } else if (reg.test(email) === false) {
      return ShowToast('Please enter a valid email');
    } else {
      const res = await dispatch(resetPasswordLink(username, email));
      if (res) {
        navigation.navigate('VerifyOTP', {name: username, email: email});
      }
    }
  };

  return (
    <AuthContainer>
      <Image source={images.logo} style={styles.image} />
      <View style={styles.screen}>
        <Text style={styles.heading}>Forget Password</Text>
        <Text style={styles.text}>
          Please enter the details below to reset your password.
        </Text>
        <View style={{paddingTop: hp('5%')}}>
          <InputField
            icon={'user'}
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder={'Username'}
            style={styles.input}
          />
          <InputField
            icon={'mail'}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Email'}
            keyboardType={'email-address'}
            style={styles.input}
          />
          <Button
            buttonText={'Reset Password'}
            indicator={password_link_loading}
            onPress={() => onSendResetLink()}
            buttonStyle={{marginTop: hp('3%')}}
          />
        </View>
      </View>
    </AuthContainer>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  image: {
    height: hp('16%'),
    width: hp('16%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: hp('8%'),
    alignItems: 'center',
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('3.8%'),
  },
  input: {
    marginBottom: hp('1%'),
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
});
