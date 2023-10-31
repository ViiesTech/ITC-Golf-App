import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const PersonalInfoTab = ({ text, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} activeOpacity={0.9} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default PersonalInfoTab

const styles = StyleSheet.create({
    button: {
        borderColor: colors.secondary,
        borderWidth: 2,
        alignItems: 'center',
        padding: hp('1.3%'),
        borderRadius: 100,
        width: '45%',
    },
    buttonText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: hp('1.5%')
    }
})