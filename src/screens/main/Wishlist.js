import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import images from '../../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import Button from '../../components/Button'

const Wishlist = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                icon={true}
                text={'Wishlist'}
            />
            <View style={styles.screen}>
                <Image
                    source={images.wishlist1}
                    style={styles.image}
                />
                <Text style={styles.text}>Your Wishlist is Empty</Text>
                <Text style={styles.tap}>Tap heart button to start saving your favorite items.</Text>
                <Button
                    buttonStyle={styles.button}
                    buttonText={'Add Now'}
                    textStyle={{ color: colors.black }}
                />
            </View>
        </Container>
    )
}

export default Wishlist

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: hp('18%'),
        width: hp('18%')
    },
    text: {
        color: colors.white,
        marginTop: hp('5%'),
        fontWeight: 'bold',
        fontSize: hp('2.8%')
    },
    tap: {
        color: colors.white,
        marginTop: hp('2.4%'),
        fontSize: hp('1.9%')
    },
    button: {
        marginTop: hp('6%'),
        width: '80%',
        borderRadius: 100
    }
})