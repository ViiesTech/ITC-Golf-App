import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import images from '../../assets/images'
import colors from '../../assets/colors'
import StarRating from 'react-native-star-rating-widget'
import Button from '../../components/Button'

const Rating = () => {
    const [rating, setRating] = useState(4);

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Rate This App'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <Image
                    source={images.rating1}
                    style={styles.image}
                />
                <Text style={styles.text}>Your Opinion Matters To Us</Text>
                <Text style={styles.review}>Get Us A Quick Review And Help Us Understand</Text>
                <View style={{ paddingTop: hp('3%') }}>
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        buttonText={'Rate'}
                        textStyle={{ color: colors.secondary }}
                        buttonStyle={styles.button}
                        onPress={() => alert('working in progress')}
                    />
                    <Button
                        buttonText={'Not Now'}
                        buttonStyle={styles.button2}
                        onPress={() => alert('working in progress')}
                    />
                </View>
            </ScrollView>
        </Container>

    )
}

export default Rating

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        paddingBottom: hp('10%')
    },
    image: {
        height: hp('50%'),
        width: '90%'
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2.8%'),
        marginTop: hp('2%')
    },
    review: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%'),
        marginTop: hp('2%')
    },
    buttonWrapper: {
        flexDirection: 'row',
        paddingTop: hp('4%')
    },
    button: {
        width: hp('16%'),
        marginRight: hp('3%'),
        borderRadius: 100
    },
    button2: {
        borderWidth: 2,
        borderColor: colors.white,
        width: hp('16%'),
        backgroundColor: 'transparent',
        borderRadius: 100
    }
})