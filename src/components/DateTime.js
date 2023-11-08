import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const DateTime = ({number,text,style}) => {
    return (
        <View style={{marginRight: hp('2.2%'),width: '19%'}}>
            <View style={[styles.textView,style]}>
                <Text style={styles.numberText}>{number}</Text>
            </View>
            <Text style={styles.duration}>{text}</Text>
        </View>
    )
}

export default DateTime

const styles = StyleSheet.create({
    numberText: {
        color: colors.secondary,
        fontWeight: 'bold'
    },
    textView: {
        marginTop: hp('1.5%'),
        backgroundColor: colors.white,
        padding: hp('1.5%'),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    duration: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('1.1%'),
        marginLeft: hp('0.7%'),
        marginTop: hp('1.6%')
    }
})