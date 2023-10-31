import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import icons from '../assets/icons'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PaymentMethods = ({ icon, text }) => {
    const [checkboxState, setCheckboxState] = useState(false)

    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.payView}>
                    <SVGImage
                        image={icon}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.payment}>{text}</Text>
                    <Text style={styles.number}>…. 1234  … 5678</Text>
                </View>
            </View>
            <BouncyCheckbox
                style={styles.bouncyStyle}
                innerIconStyle={{ display: 'none' }}
                iconStyle={{ borderColor: checkboxState ? colors.primary : '#AFAFAF', borderWidth: 6 }}
                isChecked={checkboxState}
                fillColor={colors.white}
                unfillColor={colors.white}
                disableBuiltInState
                onPress={() => setCheckboxState(!checkboxState)}
            />
        </View>
    )
}

export default PaymentMethods

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('4.5%')
    },
    payView: {
        backgroundColor: colors.white,
        borderRadius: 100,
        height: hp('7.2%'),
        width: hp('7.2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        marginLeft: hp('2.8%'),
        marginTop: hp('0.4%')
    },
    payment: {
        color: colors.white,
        fontSize: hp('2.4%'),
        fontWeight: 'bold'
    },
    number: {
        color: colors.white,
        fontWeight: 'bold',
        marginTop: hp('0.8%')
    },
    bouncyStyle: {
        alignSelf: 'center',
    }
})