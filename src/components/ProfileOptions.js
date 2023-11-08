import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import Arrow from 'react-native-vector-icons/FontAwesome6';

const ProfileOptions = ({ text, icon, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.9}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconView}>
                    <SVGImage
                        image={image}
                    />
                </View>
                <Text style={styles.emailText}>{text}</Text>
            </View>
            <Arrow
                name={icon}
                color={colors.secondary}
                size={25}
                style={{ alignSelf: 'center' }}
            />
        </TouchableOpacity>
    )
}

export default ProfileOptions

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('5%'),
    },
    iconView: {
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: hp('1.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: hp('4.5%')
    },
    emailText: {
        marginLeft: hp('3%'),
        fontSize: hp('2%'),
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colors.secondary,
    }
})