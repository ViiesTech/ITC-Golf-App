import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Search from 'react-native-vector-icons/AntDesign';
import Loader from './Loader';

const Button = ({ onPress, buttonStyle, buttonText, textStyle, icon, indicator, disable }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]}
            onPress={onPress}
            disabled={disable}
            activeOpacity={0.9}
        >
            <View style={{ flexDirection: icon && 'row' }}>
                {icon &&
                    <Search
                        name={'search1'}
                        color={colors.white}
                        size={25}
                        style={{ marginRight: hp('1.5%') }}
                    />
                }
                {indicator ?
                    <Loader
                        size={'small'}
                        color={colors.secondary}
                    />
                    :
                    <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: hp('2%'),
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2.3%')
    }
})