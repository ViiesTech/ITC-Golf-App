import {  Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React  from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Heart from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'

const MerchandiseCard = ({ text, image, onPress, style, desc, imageStyle, favourite, heartPress, descStyle, hideFav }) => {

    return (
        <View style={[styles.component, style]}>
            <TouchableOpacity style={styles.cardStyle} onPress={onPress} activeOpacity={0.9}>
                <FastImage
                    source={image}
                    resizeMode={FastImage.resizeMode.cover}
                    style={[styles.image, imageStyle]}
                />
            </TouchableOpacity>
            <View style={{  flexDirection: 'row' }}> 
                <Text style={styles.productName}>{text}</Text>
               {!hideFav &&
                <TouchableOpacity style={styles.heartView} activeOpacity={0.9} onPress={heartPress}>
                    <Heart
                        name={favourite ? 'heart' : 'hearto'}
                        size={15}
                        color={colors.secondary}
                    />
                </TouchableOpacity>
                }
            </View>
            <Text style={[styles.desc, { paddingTop: text?.length > 45 && hp('1.6%') },descStyle]}>{desc == '' ? 'Lorem Ipsum Dolor Sit Amet, Consetetur' : desc}</Text>
            {/* <View style={styles.wrapper}>
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
            <View style={styles.border} /> */}
        </View>
    )
}

export default MerchandiseCard

const styles = StyleSheet.create({
    component: {
        marginBottom: hp('5%'),
    },
    cardStyle: {
        borderWidth: 2,
        padding: hp('1.5%'),
        borderRadius: 10,
        // width: Platform.OS === 'ios' ? hp('18%') : '100%',
        width: wp('42%'),
        borderColor: colors.gray
    },
    image: {
        height: hp('18%'),
        borderRadius: 10,
        width: hp('18%'),
        alignSelf: 'center'
    },
    productName: {
        color: colors.white,
        width: hp('18%'),
        fontSize: hp('1.8%'),
        marginTop: hp('3%'),
        fontWeight: 'bold'
    },
    desc: {
        color: colors.lightgray,
        // position: 'absolute',
        // top: hp('29.5%'),
        width: hp(20),
        marginTop: hp('1%'),
    },
    // wrapper: {
    //     paddingTop: 50,
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    // },
    // verticleLine: {
    //     backgroundColor: colors.gray,
    //     width: 1,
    //     height: hp('3%')
    // },
    heartView: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: hp('0.7%'),
        alignItems: 'center',
        marginTop: hp('2.6%'),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    // border: {
    //     borderBottomColor: colors.gray,
    //     marginTop: hp('2%'),
    //     width: '100%',
    //     borderBottomWidth: 0.8
    // }
})