import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { tabs } from '../utils/DummyData'

const Tabs = ({ onChangeTab, active, }) => {

    const onTabPress = (text) => {
        onChangeTab(text)
    }

    return (
        <View style={styles.tabView}>
            {
                tabs.map((item) => {
                    return (
                        <TouchableOpacity style={[active == item.text && styles.textBackground, { marginHorizontal: hp('2%') }]}
                            onPress={() => onTabPress(item.text)}
                        >
                            <Text style={styles.tabText}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default Tabs

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: colors.white,
        padding: hp('1.2%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    tabText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: hp('1.8%')
    },
    textBackground: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        borderRadius: 100,
        padding: hp('1.8%')
    },
})