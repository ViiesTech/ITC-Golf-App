import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';

const ListingCard = ({ image, onPress, title, desc, count, exp, date, descStyle }) => {
    return (
        <TouchableOpacity style={styles.wrapper} activeOpacity={0.9} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={images.listing2}
                    style={styles.image}
                    borderRadius={12}
                />
                <View style={styles.textWrapper}>
                    <View style={styles.textView}>
                        <Text style={styles.number}>01</Text>
                    </View>
                    <View style={{ position: 'absolute', top: hp('5%') }}>
                        <Text style={[styles.textStyle, descStyle]}>{desc}</Text>
                    </View>
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={{ marginRight: hp('1%') }}>
                <Text style={styles.eventsText}>NO OF PLAYERS:</Text>
                <Text style={styles.location}>{count}</Text>
                <Text style={styles.recordHeading}>{exp}</Text>
                <Text style={styles.recordsNumber}>{date}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListingCard;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('7%'),
        paddingTop: hp('2%')
    },
    image: {
        height: hp('11%'),
        width: hp('10%')
    },
    textWrapper: {
        marginTop: hp('0.8%'),
        marginHorizontal: hp('1.4%')
    },
    textView: {
        backgroundColor: colors.gray,
        borderRadius: 5,
        padding: hp('0.6%'),
    },
    number: {
        color: colors.white,
        fontSize: hp('1.3%'),
        fontWeight: 'bold'
    },
    text: {
        color: colors.white,
        marginTop: hp('1%'),
        fontSize: hp('1.4%'),
        // width: '40%',
        fontWeight: 'bold',
    },
    eventsText: {
        color: colors.white,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        fontSize: hp('1.4%')
    },
    location: {
        color: colors.white,
        alignSelf: 'flex-end',
        marginBottom: hp('0.5%'),
        fontSize: hp('1.4%'),
        marginTop: hp('2%')
    },
    textStyle: {
        color: colors.white,
        marginTop: hp('0%'),
        fontSize: hp('1.4%'),
        position: 'absolute',
    },
    recordHeading: {
        color: colors.white,
        alignSelf: 'flex-end',
        fontSize: hp('1.4%'),
        marginTop: hp('2%')
    },
    recordsNumber: {
        color: colors.white,
        marginTop: hp('0.5%'),
        fontSize: hp('1.4%'),
        alignSelf: 'flex-end'
    }

})