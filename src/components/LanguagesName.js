import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import Check from 'react-native-vector-icons/AntDesign';

const LanguagesName = ({ text, flag, onPress, selectedLanguage, disabled }) => {
    return (
        <TouchableOpacity style={styles.languageView} onPress={onPress} activeOpacity={0.9} disabled={disabled} >
            <View style={{ flexDirection: 'row' }}>
                <SVGImage
                    image={flag}
                    style={{ alignSelf: 'center' }}
                />
                <Text style={styles.text}>{text}</Text>
            </View>
            {selectedLanguage &&
                <Check
                    name={'check'}
                    color={'#e61824'}
                    size={22}
                    style={{ alignSelf: 'center' }}
                />
            }
        </TouchableOpacity>
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