import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating-widget'
import Heart from 'react-native-vector-icons/AntDesign'
import SVGImage from './SVGImage'
import icons from '../assets/icons'

const MerchandiseCard = ({ text, image, onPress,style }) => {
    const [rating, setRating] = useState(4)

    return (
        <TouchableOpacity style={[styles.component,style]} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.cardStyle}>
                <Image
                    source={image}
                    resizeMode='contain'
                    style={styles.image}
                />
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.productName}>{text}</Text>
                <View style={styles.heartView}>
                    <Heart
                        name={'heart'}
                        size={12}
                        color={colors.secondary}
                    />
                </View>
            </View>
            <Text style={styles.desc}>Lorem Ipsum Dolor Sit Amet, Consetetur </Text>
            <View style={styles.wrapper}>
                <StarRating
                    starSize={12}
                    style={{ alignSelf: 'center' }}
                    rating={rating}
                    onChange={setRating}
                />
                <View style={styles.verticleLine} />
                <SVGImage
                    image={icons.person}
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View style={styles.border} />
        </TouchableOpacity>
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
        height: hp('17%'),
        marginTop: hp('1.5%'),
        width: '80%',
        alignSelf: 'center'
    },
    productName: {
        color: colors.white,
        fontSize: hp('2%'),
        marginTop: hp('3%'),
        fontWeight: 'bold'
    },
    desc: {
        color: colors.lightgray,
        position: 'absolute',
        top: hp('28%'),
        marginTop: hp('1%'),
    },
    wrapper: {
        paddingTop: hp('6%'),
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