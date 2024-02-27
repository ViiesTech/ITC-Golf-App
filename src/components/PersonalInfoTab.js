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
        // width: '40%',
        borderWidth: 2,
        alignItems: 'center',
        marginRight: hp('1%'),
        padding: hp('0.9%'),
        borderRadius: 100,
    },
    buttonText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: hp('1.5%')
    }
})