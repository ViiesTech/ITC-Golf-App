import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import Button from './Button'

const RaffleCard = ({ image }) => {
    return (
        <View style={{ marginBottom: hp('20%') }}>
            <View style={styles.imageBorder}>
                <Image
                    source={image}
                    style={styles.image}
                />
            </View>
            <View style={{ paddingTop: hp('2%') }}>
                <Text style={styles.heading}>Win A Scotty Cameron Special</Text>
                <View style={styles.border} />
                <View style={{ position: 'absolute', top: hp('7%') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('2%'), }}>

                        <Text style={{ color: colors.primary, fontSize: hp('2%'), marginTop: hp('1%') }}>$2.99</Text>

                        <Text style={{ color: colors.white, alignSelf: 'center', left: hp('7%'), marginTop: hp('1%'),fontSize: hp('1.4%') }}>Per Entry</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.numberView}>
                        <Text style={{ color: colors.secondary, fontWeight: 'bold', fontSize: hp('2%') }}>1500</Text>
                    </View>
                    <Text style={styles.text}>Entries Remaining</Text>
                </View>

                <Button
                    buttonStyle={styles.button}
                    onPress={() => alert('working in progress')}
                    textStyle={{ color: colors.secondary,fontSize: hp('1.5%') }}
                    buttonText={'ENTER NOW'}
                />
            </View>
        </View>
    )
}

export default RaffleCard

const styles = StyleSheet.create({
    imageBorder: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: '82%',
        borderColor: colors.lightgray,
        alignItems: 'center'
    },
    image: {
        height: hp('15%'),
        marginTop: hp('3%'),
        width: '47%'
    },
    heading: {
        color: colors.white,
        width: '60%',
        fontWeight: 'bold',
        fontSize: hp('1.7%')
    },
    border: {
        borderBottomWidth: 1,
        width: '80%',
        borderBottomColor: colors.gray,
        marginTop: hp('2%')
    },
    numberView: {
        marginTop: hp('2.5%'),
        position: 'absolute',
        top: hp('4.5%'),
        backgroundColor: colors.white,
        padding: hp('0.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    button: {
        borderRadius: 100,
        top: hp('10%'),
        padding: hp('1.2%'),
        width: '82%',
        marginTop: hp('5%')
    },
    text: {
        color: colors.white,
        alignSelf: 'center',
        fontSize: hp('1.1%'),
        marginTop: hp('2%'),
        position: 'absolute',
        left: hp('10%'),
        top: hp('6%')
    }
})