import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating-widget'
import Heart from 'react-native-vector-icons/AntDesign'
import SVGImage from './SVGImage'
import icons from '../assets/icons'

const MerchandiseCard = ({ text, image, onPress, style, desc, rating, imageStyle, favourite, heartPress }) => {

    return (
        <View style={[styles.component, style]}>
            <TouchableOpacity style={styles.cardStyle} onPress={onPress} activeOpacity={0.9}>
                <Image
                    source={image}
                    resizeMode='cover'
                    style={[styles.image, imageStyle]}
                />
            </TouchableOpacity>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.productName}>{text}</Text>
                <TouchableOpacity style={styles.heartView} activeOpacity={0.9} onPress={heartPress}>
                    <Heart
                        name={favourite ? 'heart' : 'hearto'}
                        size={15}
                        color={colors.secondary}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.desc, { paddingTop: text.length > 45 && hp('3%') }]}>{desc == '' ? 'Lorem Ipsum Dolor Sit Amet, Consetetur' : desc}</Text>
            <View style={styles.wrapper}>
                <StarRating
                    starSize={12}
                    style={{ alignSelf: 'center' }}
                    rating={rating}
                    onChange={() => null}
                />
                <View style={styles.verticleLine} />
                <SVGImage
                    image={icons.person}
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View style={styles.border} />
        </View>
    )
}

export default MerchandiseCard

const styles = StyleSheet.create({
    component: {
        marginBottom: hp('7%')
    },
    cardStyle: {
        borderWidth: 2,
        padding: hp('1.5%'),
        borderRadius: 10,
        width: hp('21%'),
        borderColor: colors.gray
    },
    image: {
        height: hp('18%'),
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center'
    },
    productName: {
        color: colors.white,
        width: hp('18%'),
        fontSize: hp('2%'),
        marginTop: hp('3%'),
        fontWeight: 'bold'
    },
    desc: {
        color: colors.lightgray,
        position: 'absolute',
        top: hp('30%'),
        marginTop: hp('1%'),
    },
    wrapper: {
        paddingTop: hp('7%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    verticleLine: {
        backgroundColor: colors.gray,
        width: 1,
        height: hp('3%')
    },
    heartView: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: hp('0.7%'),
        alignItems: 'center',
        marginTop: hp('2.6%'),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    border: {
        borderBottomColor: colors.gray,
        marginTop: hp('2%'),
        borderBottomWidth: 0.8
    }
})