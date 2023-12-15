import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '../../components/AuthContainer'
import images from '../../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

const ForgetPassword = () => {
    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onResetPassword = () => {

    }

    return (
        <AuthContainer>
            <Image
                source={images.logo}
                style={styles.image}
            />
            <View style={styles.screen}>
                <Text style={styles.heading}>Forget Password</Text>
                <Text style={styles.text}>Please enter the details below to reset your password.</Text>
                <View style={{ paddingTop: hp('5%') }}>
                    <InputField
                        icon={'user'}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder={'Username'}
                        style={styles.input}
                    />
                    <InputField
                        icon={'lock'}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholder={'New Password'}
                        style={styles.input}
                    />
                    <Button
                        buttonText={'Reset Password'}
                        onPress={() => onResetPassword()}
                        buttonStyle={{ marginTop: hp('3%') }}
                    />
                </View>
            </View>
        </AuthContainer>
    )
}

export default ForgetPassword

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
    input: {
        marginBottom: hp('1%')
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        marginTop: hp('2%'),
    },
})