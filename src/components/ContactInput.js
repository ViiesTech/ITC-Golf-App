import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Search from 'react-native-vector-icons/Feather'

const ContactInput = ({ style,inputStyle, label, placeholder, value, onChangeText, textAlignVertical, textColor, icon, keyboardType, multiline, length }) => {
    return (
        <View>
            <Text style={styles.labelText}>{label}</Text>
            <View style={[styles.wrapper,style]}>
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholder={placeholder}
                    value={value}
                    maxLength={length}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    placeholderTextColor={textColor}
                    multiline={multiline}
                    textAlignVertical={textAlignVertical}
                />
                {icon &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.border} />
                        <Search
                            name={'search'}
                            color={colors.lightgray}
                            size={23}
                            style={styles.icon}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

export default ContactInput;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: Platform.OS === 'ios' ? hp('2%') : hp('1%'),
        marginTop: hp('2%'),
    },
    input: {
        marginLeft: hp('1%'),
        width: '100%',
        color: colors.white
    },
    labelText: {
        color: colors.white,
        fontSize: hp('2.2%'),
        fontWeight: 'bold'
    },
    icon: {
        alignSelf: 'center',
        marginRight: hp('2%'),
        marginTop: hp('0.5%')
    },
    border: {
        height: '70%',
        alignSelf: 'center',
        marginRight: hp('2%'),
        width: 0.4,
        backgroundColor: colors.lightgray,
    }
})