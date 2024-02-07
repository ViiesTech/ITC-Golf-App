import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Switch = ({ text, style, onToggle, isOn, color }) => {
    // const [switchOn, setSwitchOn] = useState(false)

    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            <ToggleSwitch
                isOn={isOn}
                onColor={colors.primary}
                circleColor={color}
                offColor={colors.white}
                size='small'
                onToggle={onToggle}
            />
            <Text style={styles.private}>{text}</Text>
        </View>
    )
}

export default Switch

const styles = StyleSheet.create({
    private: {
        marginLeft: hp('1%'),
        alignSelf: 'center',
        color: colors.lightgray
    }
})