import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Screens } from '../DummyData'

const AllOptionsCard = () => {
    return (
        <View style={styles.card}>
            {Screens.map((item) => (
                <>
                    <View style={item.id !== 1 && item.id !== 4 && styles.line} />
                    <Text style={styles.text}>{item.text}</Text>
                </>
            ))}
            {/* <View>
            </View>
            <View style={{ width: '32%' }}>
                <Text style={[styles.text, { color: colors.white, marginLeft: hp('2%') }]}>Add New Listings</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { alignSelf: 'center', marginTop: hp('1.6%'), color: colors.white }]}>My Profile</Text>
                    <View style={[styles.line, { marginTop: hp('2%') }]} />
                    <Text style={[styles.text, { alignSelf: 'center', marginTop: hp('1.6%'), color: colors.white, marginLeft: hp('2%') }]}>Subscription</Text>
                </View>
            </View>
            <View style={styles.line} />
            <Text style={[styles.text, { color: colors.white, marginLeft: hp('2%') }]}>Players You Follow</Text> */}
        </View>
    )
}

export default AllOptionsCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: hp('1.6%'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    text: {
        color: colors.white,
        alignSelf: 'center',
        fontSize: hp('1.4%'),
        fontWeight: 'bold'
    },
    line: {
        height: hp('2.5%'),
        marginHorizontal: hp('1.5%'),
        width: 2,
        backgroundColor: colors.white
    }
})