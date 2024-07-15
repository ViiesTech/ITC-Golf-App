import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const DropDownPicker = ({ text, label1, label2, label3, label4, label5, label6, value4, value5, value6, textStyle, style, itemStyle, labelStyle, value1, value2, value3, onValueChange, selectedValue, iosStyle }) => {


    return (
        <View>
            <Text style={[styles.text, textStyle]}>{text}</Text>
            <View style={[styles.pickerStyle, style]}>
                <Picker
                    selectedValue={selectedValue}
                    style={[styles.textStyle, itemStyle]}
                    dropdownIconColor={colors.white}
                    itemStyle={iosStyle}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     setSelectedOption(itemValue)
                    // }
                    onValueChange={onValueChange}
                >
                    <Picker.Item label={label1} value={value1} style={labelStyle} />
                    <Picker.Item label={label2} value={value2} style={labelStyle} />
                    <Picker.Item label={label3} value={value3} style={labelStyle} />
                    <Picker.Item label={label4} value={value4} style={labelStyle} />
                    <Picker.Item label={label5} value={value5} style={labelStyle} />
                    <Picker.Item label={label6} value={value6} style={labelStyle} />
                </Picker>
            </View>
        </View>
    )
}

export default DropDownPicker

const styles = StyleSheet.create({
    pickerStyle: {
        borderWidth: 0.7,
        borderRadius: 10,
        marginTop: hp('1.5%'),
        marginBottom: hp('4%'),
        borderColor: colors.lightgray,
    },
    text: {
        color: colors.white,
        fontSize: hp('1.6%'),
        fontWeight: 'bold',
    },
    textStyle: {
        color: colors.white
    }
})