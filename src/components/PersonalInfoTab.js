import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        borderColor: colors.secondary,
        borderWidth: 2,
        alignItems: 'center',
        marginRight: hp('0.5%'),
        padding: hp('1%'),
        borderRadius: 100,
    },
    buttonText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: hp('1.5%')
    }
})