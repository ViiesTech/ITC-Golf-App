import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import Arrow from 'react-native-vector-icons/FontAwesome6';

const ProfileOptions = ({ text, icon, image }) => {
    return (
        <View style={styles.wrapper}> 
            <View style={{ flexDirection: 'row'}}>
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
        </View>
    )
}

export default ProfileOptions

const styles = StyleSheet.create({
    wrapper:{
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