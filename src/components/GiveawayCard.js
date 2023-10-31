import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import Button from './Button'

const GiveawayCard = ({buttonText,style,textStyle,imageStyle}) => {
    return (
        <View style={[styles.wrapper,style]}>
            <View style={textStyle}>
                <Text style={styles.heading}>GIVEAWAY</Text>
                <Text style={styles.text}>Enter To Win A Free Giveaway </Text>
                <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, m erat.</Text>
                <Button 
                    buttonStyle={styles.button}
                    buttonText={buttonText}
                    textStyle={styles.buttonText}
                />
            </View>
            <Image 
                source={images.giveaway1}
                style={[styles.image,imageStyle]}
                borderRadius={5}
            />
        </View>
    )
}

export default GiveawayCard

const styles = StyleSheet.create({
    wrapper: {
        // flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('10%')
    },
    heading: {
        color: colors.primary,
        fontSize: hp('2.2%'),
    },
    text: {
        color: colors.white,
        fontSize: hp('2%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        width: '50%'
    },
    textStyle:{
        color: colors.white,
        fontSize: hp('1.4%'),
        marginTop: hp('2%')
    },
    buttonText:{
        color: colors.secondary
    },
    button:{
        borderRadius: 100,
        padding: hp('1.5%'),
        marginTop: hp('3%'),
        width: '65%'
    },
    image:{
        height: hp('20%'),
        width: '45%',
        alignSelf: 'center'
    }
})