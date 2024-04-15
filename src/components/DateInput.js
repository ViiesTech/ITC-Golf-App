import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateInput = ({ heading, mode, display, icon, text, onConfirm, style }) => {
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

    // const handleConfirm = (date) => {
    //     console.log('date has been picked', date)
    // }

    return (
        <TouchableOpacity style={{ marginBottom: hp('3%'), marginRight: 20 }}
            onPress={() => setIsDatePickerVisible(true)}
            activeOpacity={0.9}
        >
            <Text style={styles.heading}>{heading}</Text>
            <View style={[styles.view,style]}>
                <Text style={styles.text}>{text}</Text>
                <Icon
                    name={icon}
                    size={12}
                    color={colors.lightgray}
                    style={{ alignSelf: 'center' }}
                />

            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                display={display}
                onCancel={() => setIsDatePickerVisible(false)}
                onConfirm={onConfirm}
            />
        </TouchableOpacity>
    )
}

export default DateInput

const styles = StyleSheet.create({
    view: {
        borderWidth: 0.3,
        width: wp('32%'),
        marginTop: Platform.OS === 'ios' ? hp('3.4%') : hp('1.4%'),
        borderRadius: 10,
        padding: hp('2.4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.white
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
    },
    text: {
        color: colors.lightgray,
        fontSize: hp('1.6%')
    }
})