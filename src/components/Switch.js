import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Switch = ({text,style}) => {
    const [switchOn, setSwitchOn] = useState(false)

    return (
        <View style={[{ flexDirection: 'row' },style]}>
            <ToggleSwitch
                isOn={switchOn}
                onColor={colors.primary}
                circleColor={switchOn ? colors.secondary : colors.lightgray}
                offColor={colors.white}
                size="medium"
                onToggle={isOn => setSwitchOn(isOn)}
            />
            <Text style={styles.private}>{text}</Text>
        </View>
    )
}

export default Switch

const styles = StyleSheet.create({
    private: {
        marginLeft: hp('2%'),
        alignSelf: 'center',
        color: colors.lightgray
    }
})