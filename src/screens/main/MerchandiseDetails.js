import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import StuffDetailCard from '../../components/StuffDetailCard'
import Button from '../../components/Button'
import colors from '../../assets/colors'
import AddMinus from '../../components/AddMinus'
import MerchandiseCard from '../../components/MerchandiseCard'
import images from '../../assets/images'

const MerchandiseDetails = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Free Stuff Merchandise'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <StuffDetailCard />
                <View style={styles.wrapper}>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            buttonText={'Add To Cart'}
                            textStyle={styles.buttonText}
                            buttonStyle={styles.button}
                        />
                        <Button
                            buttonText={'Book Now'}
                            textStyle={styles.button2Text}
                            buttonStyle={styles.button2}
                        />
                    </View>
                    <View style={{ marginLeft: hp('2%'), }}>
                        <Text style={styles.price}>$99.00</Text>
                        <View style={{ paddingTop: hp('1%') }}>
                            <AddMinus />
                        </View>
                    </View>
                </View>
                <View style={styles.border} />
                <View style={{ paddingTop: hp('4%'), flexDirection: 'row',justifyContent: 'space-between' }}>
                    <MerchandiseCard
                        image={images.stuff3}
                        text={'Golf Gloves'}
                    />
                    <MerchandiseCard
                        image={images.stuff4}
                        style={{ marginLeft: hp('3.5%') }}
                        text={'Golf Tees'}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

export default MerchandiseDetails

const styles = StyleSheet.create({
    screen: {
        padding: hp('1.6%'),
        paddingTop: hp('5%')
    },
    wrapper: {
        paddingTop: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 100,
        width: hp('15%'),
    },
    button2: {
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: colors.white,
        borderRadius: 100,
        width: hp('15%'),
        marginLeft: hp('1%')
    },
    buttonText: {
        fontSize: hp('2%'),
        color: colors.secondary
    },
    button2Text: {
        fontSize: hp('2%'),
    },
    price: {
        color: colors.white,
        marginLeft: hp('4%'),
        fontWeight: 'bold'
    },
    border: {
        borderBottomWidth: 1,
        marginTop: hp('5%'),
        borderBottomColor: colors.gray
    }
})