import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Decrement from 'react-native-vector-icons/AntDesign';
import Add from 'react-native-vector-icons/Ionicons';

const AddMinus = () => {
    return (
        <View style={styles.cardStyle}>
            <View style={styles.DecrementView}>
                <Decrement
                    name={'minus'}
                    color={colors.lightgray}
                />
            </View>
            <View style={styles.numberView}>
                <Text style={{ color: colors.gray }}>1</Text>
            </View>
            <View style={styles.numberView}>
                <Add
                    name={'add'}
                    color={colors.gray}
                />
            </View>
        </View>
    )
}

export default AddMinus

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: colors.gray,
        borderRadius: 100,
        padding: hp('0.7%'),
        flexDirection: 'row',
    },
    DecrementView: {
        borderWidth: 1,
        alignItems: 'center',
        height: hp('2.5%'),
        width: hp('2.5%'),
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: colors.lightgray
    },
    numberView: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('2.5%'),
        width: hp('2.5%'),
        borderRadius: 100,
        marginLeft: hp('1%')
    }
})