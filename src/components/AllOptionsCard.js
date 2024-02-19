import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Screens } from '../DummyData'

const AllOptionsCard = ({ active, onChangeTab }) => {

    const onTextPress = (text) => {
        onChangeTab(text)
    }

    return (
        <View style={styles.card}>
            {Screens.map((item) => (
                <>
                    <View style={item.id !== 1 && item.id !== 4 && styles.line} />
                    <TouchableOpacity activeOpacity={0.9} onPress={() => onTextPress(item.text)}>
                        <Text style={[styles.text, { color: active === item.text ? colors.secondary : colors.white }]}>{item.text}</Text>
                    </TouchableOpacity>
                </>
            ))}
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
        alignSelf: 'center',
        fontSize: hp('1.4%'),
        fontWeight: 'bold'
    },
    line: {
        height: hp('2.5%'),
        marginHorizontal: hp('1.5%'),
        width: 1,
        backgroundColor: colors.white
    }
})