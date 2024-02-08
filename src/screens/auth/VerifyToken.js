import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '../../components/AuthContainer'
import images from '../../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { ShowToast } from '../../Custom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { verifyResetToken } from '../../redux/actions/authAction'

const VerifyToken = ({ route }) => {

  const userName = route.params.name

  const [username, setUsername] = useState(userName)
  const [token, setToken] = useState('')

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const { verify_loading } = useSelector(state => state.AuthReducer)

  const onTokenVerify = async () => {
    if (!username) {
      return ShowToast('Please enter your username')
    } else if (!token) {
      return ShowToast('Please enter your verification token')
    } else {
      const res = await dispatch(verifyResetToken(username, token))
      if (res) {
        navigation.navigate('UpdatePassword', { verifyToken: token, name: username })
      }
    }
  }

  return (
    <AuthContainer>
      <Image
        source={images.logo}
        style={styles.image}
      />
      <View style={styles.screen}>
        <Text style={styles.heading}>Password Reset Verification</Text>
        <Text style={styles.text}>Enter the verification token sent to your email to proceed with resetting your password.</Text>
        <View style={{ paddingTop: hp('5%') }}>
          <InputField
            icon={'user'}
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder={'Username'}
            style={styles.input}
          />
          <InputField
            value={token}
            icon={'key'}
            onChangeText={(text) => setToken(text)}
            placeholder={'Token'}
            style={styles.input}
          />
          <Button
            buttonText={'Continue'}
            onPress={() => onTokenVerify()}
            indicator={verify_loading}
            buttonStyle={{ marginTop: hp('3%') }}
          />
          <Button
            buttonText={'Back'}
            onPress={() => navigation.goBack()}
            buttonStyle={{ marginTop: hp('3%') }}
          />
        </View>
      </View>
    </AuthContainer>
  )
}

export default VerifyToken

const styles = StyleSheet.create({
  image: {
    height: hp('16%'),
    width: '32%',
    marginTop: hp('5%'),
    alignSelf: 'center'
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
    fontSize: hp('3.2%')
  },
  text: {
    color: colors.white,
    width: '80%',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  input: {
    marginBottom: hp('1%')
  },
})