import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const DropDownPicker = ({ text, label1, label2, label3, textStyle, style, itemStyle, iconColor, labelStyle }) => {
    const [selectedOption, setSelectedOption] = useState("")

    return (
        <View>
            <Text style={[styles.text, textStyle]}>{text}</Text>
            <View style={[styles.pickerStyle, style]}>
                <Picker
                    selectedValue={selectedOption}
                    style={[styles.textStyle, itemStyle]}
                    dropdownIconColor={[colors.white, iconColor]}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedOption(itemValue)
                    }
                >
                    <Picker.Item label={label1} value={'Select'} style={labelStyle} />
                    <Picker.Item label={label2} value={'Select'} style={labelStyle} />
                    <Picker.Item label={label3} value={'Select'} style={labelStyle} />
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
        fontSize: hp('1.8%'),
        fontWeight: 'bold',
    },
    textStyle: {
        color: colors.white
    }
})