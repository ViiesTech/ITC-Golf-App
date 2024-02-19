import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import SVGImage from './SVGImage'
import icons from '../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Header = ({ iconStyle, headerStyle }) => {
    const navigation = useNavigation()

    const { user } = useSelector(state => state.AuthReducer)

    return (
        <View style={[styles.headerView, headerStyle]}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={images.header_image}
                    style={styles.image}
                />
                <Text style={styles.headerText}>Hello {user.username}!</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9}
                onPress={() => navigation.navigate('SecondaryStack', { screen: 'Notifications' })}
                style={{ paddingTop: hp('1.9%') }}
            >
                <SVGImage
                    image={icons.notification}
                    style={[styles.icon, iconStyle]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: hp('3%'),
        paddingTop: hp('6%')
    },
    image: {
        height: hp('6.5%'),
        width: hp('6.5%'),
    },
    headerText: {
        color: colors.white,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginLeft: hp('2.7%')
    },
    icon: {
        alignSelf: 'center',
    }
})