import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'

const ListingDetailCard = ({ image, onPress }) => {
    return (
        <TouchableOpacity style={{ marginBottom: hp('10%') }} activeOpacity={0.9} onPress={onPress}>
            <Image
                source={image}
                style={styles.image}
                borderRadius={10}
            />
            <View style={styles.textView}>
                <Text style={styles.numberText}>01</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.text}>MOKAN Elite (MO)</Text>
                <Text style={styles.winText}>Wins:<Text style={{ color: colors.lightgray }}> Indy Heat, Mac Irvin Fire, NJ Scholars</Text></Text>
                <Text style={styles.loseText}>Losses: New Heights Lightning</Text>
                <View style={styles.line} />
                <View style={styles.textWrapper}>
                    <View style={{ paddingTop: hp('3%') }}>
                        <Text style={styles.textStyle}>LAST EVENT:</Text>
                        <Text style={styles.fontStyle}>Nike EYBL IV: Kansas City</Text>
                    </View>
                    <View style={{ paddingTop: hp('3%') }}>
                        <Text style={styles.textStyle}>RECORD:</Text>
                        <Text style={[styles.fontStyle, { alignSelf: 'flex-end' }]}>11-8</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListingDetailCard;

const styles = StyleSheet.create({
    image: {
        height: hp('25%'),
        width: '97%'
    },
    textView: {
        backgroundColor: colors.primary,
        padding: hp('1%'),
        position: 'absolute',
        left: hp('1.5%'),
        top: hp('1.3%')
    },
    numberText: {
        color: colors.secondary
    },
    wrapper: {
        paddingTop: hp('2%')
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2.2%')
    },
    winText: {
        color: colors.white,
        position: 'absolute',
        top: hp('6%'),
        // fontSize: hp('1.8%'),
        fontWeight: 'bold'
    },
    loseText: {
        color: colors.white,
        marginTop: hp('7.5%'),
        fontSize: hp('1.5%')
    },
    line: {
        borderBottomWidth: 0.5,
        width: '100%',
        borderBottomColor: colors.lightgray,
        marginTop: hp('4%')
    },
    textWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('1.5%')
    },
    fontStyle: {
        color: colors.white,
        fontSize: hp('1.2%'),
        marginTop: hp('1.5%')
    }
})