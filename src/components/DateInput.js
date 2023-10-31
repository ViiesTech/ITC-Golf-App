import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateInput = ({heading,mode, display,icon,text}) => {
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

    const handleConfirm = (date) => {
        console.log('date has been picked', date)
    }

    return (
        <TouchableOpacity style={{ marginBottom: hp('3%') }}
            onPress={() => setIsDatePickerVisible(true)}
            activeOpacity={0.9}
        >
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.view}>
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
                onConfirm={(date) => handleConfirm(date)}
            />
        </TouchableOpacity>
    )
}

export default DateInput

const styles = StyleSheet.create({
    view: {
        borderWidth: 1.5,
        width: hp('20%'),
        marginTop: hp('1.8%'),
        borderRadius: 10,
        padding: hp('2.4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.gray
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
    },
    text: {
        color: colors.lightgray
    }
})