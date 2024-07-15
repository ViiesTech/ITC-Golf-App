import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Decrement from 'react-native-vector-icons/AntDesign';
import Add from 'react-native-vector-icons/Ionicons';
import { ShowToast } from '../Custom';

const AddMinus = ({number, onIncrementPress,onDecrementPress}) => {
    return (
        <View style={styles.cardStyle}>
            <TouchableOpacity style={styles.DecrementView} activeOpacity={0.9} onPress={onDecrementPress}>
                <Decrement
                    name={'minus'}
                    color={colors.lightgray}
                />
            </TouchableOpacity>
            <View style={styles.numberView}>
                <Text style={{ color: colors.gray }}>{number}</Text>
            </View>
            <TouchableOpacity style={styles.numberView} activeOpacity={0.9} onPress={onIncrementPress}>
                <Add
                    name={'add'}
                    color={colors.gray}
                />
            </TouchableOpacity>
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