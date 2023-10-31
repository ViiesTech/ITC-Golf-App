import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import images from '../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Heart from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating-widget'
import ColorOptions from './ColorOptions'
import { Colors } from '../DummyData'

const StuffDetailCard = () => {
    const [rating, setRating] = useState(4)
    const [chooseOptions, setChooseOptions] = useState(0)

    return (
        <View style={styles.wrapper}>
            <View style={styles.cardStyle}>
                <Image
                    source={images.stuff1}
                    style={styles.image}
                />
                <View style={styles.heartView}>
                    <Heart
                        name={'heart'}
                        size={12}
                        color={colors.secondary}
                    />
                </View>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>Golf Ball Markers</Text>
                <StarRating
                    starSize={15}
                    style={{ marginTop: hp('1.7%') }}
                    rating={rating}
                    onChange={setRating}
                />
                <Text style={styles.desc}>Lorem Ipsum Dolor Sit Amet, Consetetur </Text>
                <View style={styles.border} />
                <View style={{ paddingTop: hp('2%'), flexDirection: 'row' }}>
                    {Colors.map((item, i) => (
                        <ColorOptions
                            style={chooseOptions == i ? { backgroundColor: colors.gray, borderWidth: 0 } : { backgroundColor: 'transparent' }}
                            onPress={() => setChooseOptions(i)}
                            image={item.image}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default StuffDetailCard

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    cardStyle: {
        backgroundColor: colors.gray,
        borderRadius: 10,
        width: '46%',
        padding: hp('1%')
    },
    image: {
        height: hp('24%'),
        position: 'absolute',
        bottom: hp('3%'),
        width: '80%'
    },
    heartView: {
        backgroundColor: colors.primary,
        position: 'absolute',
        borderRadius: 5,
        right: hp('1.7%'),
        top: hp('-0.6%'),
        padding: hp('1%'),
        alignItems: 'center',
        marginTop: hp('2.6%'),
        justifyContent: 'center'
    },
    textWrapper: {
        marginLeft: hp('1.6%'),
        marginTop: hp('1%')
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    desc: {
        color: colors.lightgray,
        width: '60%',
        marginTop: hp('2%')
    },
    border: {
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 0.5,
        width: '74%',
        marginTop: hp('1.7%')
    }

})