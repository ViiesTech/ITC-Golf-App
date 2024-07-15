import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import SVGImage from './SVGImage'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Arrow from 'react-native-vector-icons/FontAwesome6';

const ProfileSettings = ({text,icon, onPress}) => {
    return (
        <TouchableOpacity style={styles.wrapper} activeOpacity={0.9} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconView}>
                    <SVGImage
                        image={icon}
                        stlye={styles.icon}
                    />
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
            <Arrow />
            <Arrow
                name={'arrow-right'}
                color={colors.white}
                size={22}
                style={{ alignSelf: 'center' }}
            />
        </TouchableOpacity>
    )
}

export default ProfileSettings

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('7%')
    },
    iconView: {
        backgroundColor: colors.gray,
        padding: hp('1.2%'),
        width: hp('4.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text:{
        color: colors.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: hp('3.4%'),
        fontSize: hp('2.4%')
    }
})