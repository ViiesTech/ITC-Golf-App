import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import Check from 'react-native-vector-icons/AntDesign';

const LanguagesName = ({ icon, text, flag }) => {
    return (
        <View style={styles.languageView}>
            <View style={{ flexDirection: 'row' }}>
                <SVGImage
                    image={flag}
                    style={{ alignSelf: 'center' }}
                />
                <Text style={styles.text}>{text}</Text>
            </View>
            <Check
                name={icon}
                color={'#e61824'}
                size={22}
                style={{ alignSelf: 'center' }}
            />
        </View>
    )
}

export default LanguagesName

const styles = StyleSheet.create({
    languageView: {
        backgroundColor: colors.gray,
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: hp('2%'),
        flexDirection: 'row',
        marginBottom: hp('2.5%')
    },
    text: {
        color: colors.white,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginLeft: hp('3%'),
        fontSize: hp('2%')
    }
})