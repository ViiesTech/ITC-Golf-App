import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '../../components/AuthContainer'
import images from '../../assets/images'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import { ShowToast } from '../../Custom'
import { resetPassword } from '../../redux/actions/authAction'

const UpdatePassword = ({ route }) => {

    const resetToken = route.params.verifyToken
    const userName = route.params.name

    const [token, setToken] = useState(resetToken)
    const [username, setUsername] = useState(userName)
    const [newPassword, setNewPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const { reset_loading } = useSelector(state => state.AuthReducer)

    const onUpdatePassword = async () => {
        if (!username) {
            return ShowToast('Please enter your username')
        } else if (!token) {
            return ShowToast('Please enter your verification token')
        } else if (newPassword.length < 8) {
            return ShowToast('Password is too short')
        } else if (cPassword !== newPassword) {
            return ShowToast('Password does not match')
        } else {
            const res = await dispatch(resetPassword(username, token, newPassword))
            if (res) {
                navigation.navigate('Login')
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
                <Text style={styles.heading}>Change Password</Text>
                <Text style={styles.text}>Set a new password for your account to ensure its security.</Text>
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
                    <InputField
                        value={newPassword}
                        icon={'lock'}
                        onChangeText={(text) => setNewPassword(text)}
                        secureTextEntry={true}
                        placeholder={'New Password'}
                        style={styles.input}
                    />
                    <InputField
                        value={cPassword}
                        icon={'lock'}
                        onChangeText={(text) => setCPassword(text)}
                        secureTextEntry={true}
                        placeholder={'Confirm Password'}
                        style={styles.input}
                    />
                    <Button
                        buttonText={'Update Password'}
                        onPress={() => onUpdatePassword()}
                        indicator={reset_loading}
                        buttonStyle={{ marginTop: hp('3%') }}
                    />
                </View>
            </View>
        </AuthContainer>
    )
}

export default UpdatePassword

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
        fontSize: hp('3.8%')
    },
    text: {
        color: colors.white,
        width: '65%',
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        marginTop: hp('2%'),
    },
    input: {
        marginBottom: hp('1%')
    },
})