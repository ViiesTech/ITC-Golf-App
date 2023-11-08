import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import SVGImage from './SVGImage'
import icons from '../assets/icons'

const DiscoverCard = ({ image }) => {
    return (
        <View style={styles.wrapper}>
            <Image
                source={image}
                style={styles.image}
                borderRadius={10}
            />
            <View style={styles.textWrapper}>
                <View style={styles.numberView}>
                    <Text style={{ color: colors.primary }}>01</Text>
                </View>
                <Text style={styles.name}>Shawn Letit (Sl)</Text>
                <SVGImage
                    image={icons.tee}
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View style={styles.secondaryWrapper}>
                <Text style={styles.textStyle}>Wins: <Text style={{ color: colors.white }}> Indy Heat, Mac Irvin Fire, NJ Scholars</Text></Text>
                <Text style={styles.loseText}>Losses: <Text style={{ color: colors.white }}> New Heights Lightning</Text></Text>
                <View style={styles.border} />
                <View style={{ paddingTop: hp('2%'), justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.heading}>LAST EVENT:</Text>
                        <Text style={styles.text2}>Kansas City</Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View>
                        <Text style={styles.heading}>RECORD:</Text>
                        <Text style={[styles.text2,{marginLeft: hp('2%')}]}>11-8</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DiscoverCard

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp('3.5%'),
        borderWidth: 1,
        borderColor: colors.gray,
        height: hp('52%'),
        width: '47%',
        borderRadius: 10,
    },
    image: {
        height: hp('22%'),
        width: '101%'
    },
    numberView: {
        borderWidth: 1,
        padding: hp('0.5%'),
        alignItems: 'center',
        borderRadius: 5,
        borderColor: colors.gray
    },
    name: {
        color: colors.white,
        fontSize: hp('1.7%'),
        alignSelf: 'center'
    },
    textWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: hp('1%'),
        paddingTop: hp('2%')
    },
    textStyle: {
        color: colors.lightgray,
    },
    loseText: {
        width: '90%',
        marginTop: hp('1%'),
        color: colors.lightgray
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        marginTop: hp('2%'),
    },
    secondaryWrapper: {
        marginLeft: hp('1%'),
        position: 'absolute',
        top: hp('29%'),
        width: '90%'
    },
    heading: {
        color: colors.primary,
        fontSize: hp('1.4%')
    },
    verticleLine: {
        height: hp('5.5%'),
        width: 1,
        backgroundColor: colors.gray
    },
    text2: {
        color: colors.white,
        fontSize: hp('1.5%'),
        marginTop: hp('1%')
    }
})