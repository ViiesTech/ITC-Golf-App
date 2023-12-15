import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import StarRating from 'react-native-star-rating-widget'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ReviewGiven = ({ text, textStyle,ratingStyle}) => {
    const [rating, setRating] = useState(5)

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.text,textStyle]}>{text}</Text>
            <StarRating
                rating={rating}
                starSize={9}
                style={[{ marginTop: hp('4%') },ratingStyle]}
                onChange={setRating}
            />
        </View>
    )
}

export default ReviewGiven

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp('1%'),
    },
    text: {
        color: colors.white,
        width: '140%',
        fontSize: hp('1.4%'),
        position: 'absolute',
    }
})