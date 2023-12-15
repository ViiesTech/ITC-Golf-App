import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import SVGImage from './SVGImage'
import icons from '../assets/icons'

const MyGroupsCard = ({image}) => {
    return (
        <View style={styles.wrapper}>
            <Image
                source={image}
                style={styles.image}
                borderRadius={10}
            />
            <View style={styles.secondaryWrapper}>
                <View>
                    <Text style={styles.name}>Shawn Letit (Sl)</Text>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>Wins :<Text style={{ color: colors.white }}> Indy Heat, Mac Irvin Fire, NJ Scholars</Text></Text>
                        <Text style={[styles.text, { marginTop: hp('0.5%') }]}>Losses :<Text style={{ color: colors.white }}> New Heights Lightning</Text></Text>
                        <View style={styles.border} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1.5%') }}>
                            <View>
                                <Text style={styles.text2}>LAST EVENT:</Text>
                                <Text style={styles.text3}>Kansas City</Text>
                            </View>
                            <View style={styles.verticleLine} />
                            <View style={{marginRight: hp('1%')}}>
                                <Text style={styles.text2}>RECORD:</Text>
                                <Text style={[styles.text3, { marginLeft: hp('2%') }]}>11-8</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.teeView}>
                        <SVGImage
                            image={icons.teeBlack}
                        />
                    </View>
                    <View style={styles.numberView}>
                        <Text style={{ color: colors.primary }}>01</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MyGroupsCard

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: hp('4%')
    },
    image: {
        height: hp('22%'),
        width: hp('20%')
    },
    secondaryWrapper: {
        flexDirection: 'row',
        marginLeft: hp('1.5%'),
        marginTop: hp('1%'),
        flex: 1,
        justifyContent: 'space-between'
    },
    name: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('1.9%')
    },
    teeView: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('3%'),
        borderRadius: 5,
    },
    numberView: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('3%'),
        width: hp('3%'),
        borderRadius: 5,
        marginLeft: hp('1%'),
        borderColor: colors.lightgray
    },
    textWrapper: {
        position: 'absolute',
        top: hp('4%'),
        width: '170%',
    },
    text: {
        color: colors.lightgray,
    },
    border: {
        borderBottomWidth: 1,
        marginTop: hp('1.5%'),
        borderBottomColor: colors.gray
    },
    text2: {
        color: colors.primary,
        fontSize: hp('1.2%')
    },
    text3: {
        color: colors.white,
        fontSize: hp('1.2%'),
        marginTop: hp('0.4%')
    },
    verticleLine: {
        height: hp('6%'),
        width: 1,
        backgroundColor: colors.gray
    }
})