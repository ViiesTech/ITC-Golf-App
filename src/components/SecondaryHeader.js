import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Back from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import SVGImage from './SVGImage';
import icons from '../assets/icons';

const SecondaryHeader = ({ icon, text,style }) => {

    const navigation = useNavigation()

    return (
        <View style={[styles.headerView,style]}>
            <View style={{ flexDirection: 'row' }}>
                <Back
                    name={'keyboard-backspace'}
                    color={colors.white}
                    size={25}
                    style={{ alignSelf: 'center' }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerText}>{text}</Text>
            </View>
            {icon &&
                <SVGImage
                    image={icons.sort}
                    style={{ alignSelf: 'center' }}
                />
            }
        </View>
    )
}

export default SecondaryHeader

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp('2%'),
        padding: hp('3%')
    },
    headerText: {
        color: colors.white,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginLeft: hp('3.5%')
    }
})