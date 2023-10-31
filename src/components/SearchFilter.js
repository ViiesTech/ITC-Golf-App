import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DropDownPicker from './DropDownPicker'
import { pickerss } from '../DummyData'
import Button from './Button'

const SearchFilter = () => {
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: hp('1%') }}>
                {pickerss.map((item) => (
                    <DropDownPicker
                        text={item.text}
                        textStyle={{ color: colors.secondary, fontSize: hp('1.5%') }}
                        style={styles.picker}
                        itemStyle={{ color: colors.secondary }}
                        labelStyle={{ fontSize: hp('1.1%') }}
                        label1={'Select'}
                        label2={'Select'}
                        label3={'Select'}
                        iconColor={colors.secondary}
                    />
                ))}
            </View>
            <Button
                buttonText={'Sign up / Sign in'}
                textStyle={{ color: colors.secondary, fontSize: hp('1.8%') }}
                buttonStyle={{ borderRadius: 100, width: '50%', alignSelf: 'center' }}
            />
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: hp('1.7%'),
    },
    picker: {
        width: hp('13%'),
        borderWidth: 1
    }
})