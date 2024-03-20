import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const PersonalInfoTab = ({ text, style, onPress, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} activeOpacity={0.9} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default PersonalInfoTab

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        // borderColor: colors.secondary,
        width: hp('28%'),
        alignSelf: 'center',
        // borderWidth: 2,
        alignItems: 'center',
        // marginRight: hp('1%'),
        padding: hp('1.2%'),
        borderRadius: 100,
    },
    buttonText: {
        color: colors.secondary,
        marginVertical: hp('0.3%'),
        fontWeight: 'bold',
        fontSize: hp('1.5%')
    }
})