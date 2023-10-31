import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import colors from '../assets/colors'

const ContactInfo = ({icon,text}) => {
    return (
        <View style={styles.wrapper}>
            <SVGImage
                image={icon}
                style={{ marginTop: hp('0.4%') }}
            />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default ContactInfo

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp('3%'),
        flexDirection: 'row'
    },
    text: {
        color: colors.white,
        width: '75%',
        marginLeft: hp('2%'),
        fontSize: hp('2%')
    }
})