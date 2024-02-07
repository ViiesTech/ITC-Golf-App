import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import StarRating from 'react-native-star-rating-widget'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ReviewGiven = ({ text, textStyle, ratingStyle, rating }) => {

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
            <StarRating
                rating={rating}
                starSize={9}
                style={[{ marginTop: hp('5%') }, ratingStyle]}
                onChange={() => null}
            />
        </View>
    )
}

export default ReviewGiven

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp('2%'),
    },
    text: {
        color: colors.white,
        width: '160%',
        fontSize: hp('1.4%'),
        position: 'absolute',
    }
})