import { Image, StyleSheet, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import { listingImages } from '../DummyData'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from './SVGImage'
import icons from '../assets/icons'

const Sponsors = () => {

    const onImagePress = async () => {
        await Linking.openURL('https://inthecup.golf')
    }

    return (
        <View style={{ padding: hp('2.5%') }}>
            {listingImages.map((item, i) => (
                <TouchableOpacity activeOpacity={0.9} onPress={() => onImagePress(i)}>
                    <Image
                        source={item.image}
                        style={styles.listingImage}
                        borderRadius={10}
                    />
                </TouchableOpacity>
            ))}
            <SVGImage
                image={icons.pageEnd}
                style={styles.endIcon}
            />
        </View>
    )
}

export default Sponsors

const styles = StyleSheet.create({
    listingImage: {
        height: hp('20%'),
        marginBottom: hp('4%'),
        width: '100%'
    },
    endIcon: {
        alignSelf: 'center',
        paddingTop: hp('5%')
    },
})