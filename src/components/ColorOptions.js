import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ColorOptions = ({ image, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.card, style]} activeOpacity={0.9} onPress={onPress}>
            <Image
                source={image}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}

export default ColorOptions

const styles = StyleSheet.create({
    card: {
        borderWidth: 0.7,
        borderColor: colors.lightgray,
        width: '15%',
        padding: hp('0.5%'),
        alignItems: 'center',
        borderRadius: 5,
        marginRight: hp('1.5%')
    },
    image: {
        height: hp('4%'),
        width: '40%'
    }
})