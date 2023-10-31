import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ReviewGiven from './ReviewGiven'
import { reviews } from '../DummyData'

const ReviewCard = ({image}) => {
    return (
        <View style={styles.cardStyle}>
            <View>
                <Image
                    source={image}
                    style={styles.image}
                    borderRadius={10}
                />
                <View style={{ paddingTop: hp('2%') }}>
                    {reviews.map((item) => (
                        <ReviewGiven
                            text={item.text}
                            textStyle={{top: item.id == 1 || 2 && hp('-1%')}}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.posted}>Posted By:</Text>
                <Text style={styles.name}>Kevin</Text>
                <View style={styles.border} />
            </View>
        </View>
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: colors.gray,
        flexDirection: 'row',
        borderRadius: 10,
        width:  hp('21%'),
        padding: hp('1.6%'),
        borderWidth: 1,
        marginBottom: hp('5%'),
        borderColor: colors.lightgray
    },
    image: {
        height: hp('9%'),
        width: hp('9%')
    },
    wrapper: {
        marginTop: hp('1%'),
        marginRight: hp('4%')
    },
    posted: {
        color: colors.lightgray,
        fontSize: hp('1.3%')
    },
    name: {
        marginTop: hp('1%'),
        color: colors.white,
        fontSize: hp('1.5%'),
        fontWeight: 'bold'
    },
    border: {
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 0.4,
        width: '100%',
        marginTop: hp('1.5%')
    }
})