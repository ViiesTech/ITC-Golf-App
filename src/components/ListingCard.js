import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../assets/colors';

const ListingCard = ({image}) => {
    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={image}
                    style={styles.image}
                    borderRadius={12}
                />
                <View style={styles.textWrapper}>
                    <View style={styles.textView}>
                        <Text style={styles.number}>01</Text>
                    </View>
                    <View style={{ position: 'absolute', top: hp('5%') }}>
                        <Text style={styles.textStyle}>Wins: Indy Heat, Mac Irvin Fire</Text>
                    </View>
                </View>
                <Text style={styles.text}>MOKAN Elite (MO)</Text>
            </View>
            <View>
                <Text style={styles.eventsText}>LAST EVENT:</Text>
                <Text style={styles.location}>Nike EYBL IV: Kansas City</Text>
                <Text style={styles.recordHeading}>RECORD:</Text>
                <Text style={styles.recordsNumber}>11-8</Text>
            </View>
        </View>
    )
}

export default ListingCard;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('4.5%'),
        paddingTop: hp('2%')
    },
    image: {
        height: hp('11%'),
        width: hp('10%')
    },
    textWrapper: {
        marginLeft: hp('1.5%'),
        marginTop: hp('0.5%')
    },
    textView: {
        backgroundColor: colors.gray,
        padding: hp('1%'),
    },
    number: {
        color: colors.white,
        fontWeight: 'bold'
    },
    text: {
        color: colors.white,
        marginTop: hp('1.7%'),
        fontWeight: 'bold',
        marginLeft: hp('1%')
    },
    eventsText: {
        color: colors.white,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        fontSize: hp('1.4%')
    },
    location: {
        color: colors.white,
        marginBottom: hp('0.5%'),
        fontSize: hp('1.2%'),
        marginTop: hp('2%')
    },
    textStyle: {
        color: colors.white,
        marginTop: hp('2%'),
        position: 'absolute',
    },
    recordHeading: {
        color: colors.white,
        alignSelf: 'flex-end',
        marginTop: hp('2%')
    },
    recordsNumber: {
        color: colors.white,
        marginTop: hp('0.5%'),
        alignSelf: 'flex-end'
    }

})