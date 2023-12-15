import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { filterItems } from '../DummyData'
import Button from './Button'
import { Picker } from '@react-native-picker/picker'

const SearchFilter = () => {
    const [selectedOption, setSelectedOption] = useState('')

    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1%') }}>
                {filterItems.map((item) => (
                    <View>
                        <Text style={styles.text}>{item.text}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={selectedOption}
                                style={styles.textStyle}
                                dropdownIconColor={colors.secondary}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedOption(itemValue)
                                }
                            >
                                {/* {filterItems.map((value) => ( */}
                                {/* <> */}
                                <Picker.Item label={item.pickerText1} value={item.pickerText1} style={styles.labelStyle} />
                                <Picker.Item label={item.pickerText2} value={item.pickerText2} style={styles.labelStyle} />
                                <Picker.Item label={item.pickerText3} value={item.pickerText3} style={styles.labelStyle} />
                                {/* </> */}
                                {/* ))} */}
                            </Picker>
                        </View>
                    </View>
                ))}
            </View>
            <Button
                buttonText={'Sign up / Sign in'}
                textStyle={{ color: colors.secondary, fontSize: hp('1.8%') }}
                buttonStyle={{ borderRadius: 100, width: '50%', alignSelf: 'center', marginTop: hp('3%') }}
            />
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        marginTop: hp('2%'),
        borderRadius: 15,
        padding: hp('1.7%'),
    },
    pickerStyle: {
        width: hp('13%'),
        marginTop: hp('1%'),
        borderRadius: 5,
        borderWidth: 0.4
    },
    text: {
        color: colors.secondary,
        fontSize: hp('1.8%'),
        fontWeight: 'bold',
    },
    textStyle: {
        color: colors.secondary,
        fontSize: hp('2%')
    },
    labelStyle: {
        color: colors.secondary,
        fontSize: hp('1.6%')
    }
})