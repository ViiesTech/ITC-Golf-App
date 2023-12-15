import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import images from '../../assets/images'
import colors from '../../assets/colors'

const About = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'About-Us'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <Image
                    source={images.about1}
                    style={styles.image}
                    borderRadius={10}
                />
                <View style={{ paddingTop: hp('3%') }}>
                    <Text style={styles.aboutText}>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.{'\n'}{'\n'}{'\n'}

                        Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.{'\n'}{'\n'}{'\n'}

                        Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.{'\n'}{'\n'}{'\n'}

                        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.</Text>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={images.about2}
                            style={styles.image2}
                            borderRadius={10}
                        />
                        <View>
                            <Image
                                source={images.about3}
                                style={styles.image3}
                                borderRadius={10}
                            />
                            <Image
                                source={images.about4}
                                style={[styles.image3, { marginTop: hp('1%') }]}
                                borderRadius={10}
                            />
                        </View>
                    </View>
                    <Text style={styles.heading}>About-Us</Text>
                    <View style={{ paddingTop: hp('3%') }}>
                        <Text style={styles.aboutText}>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.{'\n'}{'\n'}{'\n'}

                            Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.{'\n'}{'\n'}{'\n'}

                            Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.{'\n'}{'\n'}{'\n'}

                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.{'\n'}{'\n'}{'\n'}
                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt. {'\n'}{'\n'}{'\n'}

                            Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.{'\n'}{'\n'}{'\n'}

                            Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.{'\n'}{'\n'}{'\n'}

                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

export default About

const styles = StyleSheet.create({
    screen: {
        padding: hp('2%'),
        paddingBottom: hp('10%')
    },
    image: {
        height: hp('24%'),
        width: '98%'
    },
    aboutText: {
        color: colors.white
    },
    imageWrapper: {
        paddingTop: hp('5%'),
        flexDirection: 'row'
    },
    image2: {
        height: hp('21%'),
        width: '54%'
    },
    image3: {
        height: hp('10%'),
        marginLeft: hp('2%'),
        width: hp('17%')
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2.7%'),
        marginTop: hp('4%')
    }

})