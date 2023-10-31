import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AuthContainer from '../../components/AuthContainer';
import colors from '../../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '../../assets/images';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation()

    return (
        <AuthContainer>
            <Image
                source={images.logo}
                style={styles.image}
            />
            <View style={styles.screen}>
                <Text style={styles.heading}>Login Account</Text>
                <Text style={styles.text}>Please enter the details below to continue.</Text>
                <View style={{ paddingTop: hp('7%') }}>
                    <InputField
                        icon={'mail'}
                        placeholder={'@example.com'}
                        keyboardType={'email-address'}
                        style={styles.input}
                    />
                    <InputField
                        icon={'lock'}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        style={styles.input}
                    />
                    <View style={{ paddingTop: hp('0.5%') }}>
                        <Button
                            buttonText={'LOGIN'}
                            onPress={() => navigation.navigate('MainStack')}
                        />
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={styles.message}>Dont have an account?  <Text style={{ color: colors.primary }}>Sign Up</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </AuthContainer>
    )
}

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: hp('8%'),
        paddingBottom: hp('6.5%')
    },
    image: {
        height: hp('16%'),
        width: '30%',
        marginTop: hp('7%'),
        alignSelf: 'center'
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('3.8%')
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        marginTop: hp('2%')
    },
    input: {
        marginBottom: hp('2%')
    },
    message: {
        color: colors.white,
        alignSelf: 'center',
        marginTop: hp('2.5%')
    }
})