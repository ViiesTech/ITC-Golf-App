import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Heart from 'react-native-vector-icons/AntDesign';
import ColorOptions from './ColorOptions'
import { Colors } from '../utils/DummyData'
import FastImage from 'react-native-fast-image';

const StuffDetailCard = ({ rating, image, title, desc, favourite }) => {
    const [chooseOptions, setChooseOptions] = useState(0)

    return (
        <View style={styles.wrapper}>
            <View style={styles.cardStyle}>
                <FastImage
                    source={image}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.image}
                />
                <View style={styles.heartView}>
                    <Heart
                        name={favourite ? 'heart' : 'hearto'}
                        size={17}
                        color={colors.secondary}
                    />
                </View>
            </View>
            <View style={styles.textWrapper}>
                <Text style={[styles.text, {  }]}>{title}</Text>

                {/* <StarRating
                    starSize={15}
                    style={{ marginTop: hp('1.7%') }}
                    rating={rating}
                    onChange={() => null}
                /> */}
                <Text style={styles.desc}>{desc !== '' ? desc : 'Lorem Ipsum Dolor Sit Amet, Consetetur'}</Text>
                <View style={[styles.border, {  }]} />
                <View style={{ paddingTop: hp('2%'), flexDirection: 'row' }}>
                    {Colors.map((item, i) => (
                        <ColorOptions
                            style={chooseOptions == i ? { backgroundColor: colors.gray, borderWidth: 0 } : { backgroundColor: 'transparent',  }}
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
        height: hp('24.5%'),
        // position: 'absolute',
        borderRadius: 10,
        // bottom: hp('3%'),
        width: '100%'
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
        marginLeft: hp('1%'),
        flex: 2,
        marginTop: hp('1%')
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    desc: {
        color: colors.lightgray,
        // width: '60%',
        marginTop: hp('2%')
    },
    border: {
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 0.5,
        marginTop: hp('1.7%')
    }

})