import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import ContactInput from '../../components/ContactInput'
import colors from '../../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Button from '../../components/Button'
import ContactInfo from '../../components/ContactInfo'
import { ContactOptions } from '../../DummyData'

const ContactUs = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Contact-Us'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <ContactInput
                    label={'Name:'}
                    placeholder={'Your Name'}
                    textColor={colors.white}
                />
                <ContactInput
                    label={'Email:'}
                    placeholder={'Your Email'}
                    textColor={colors.white}
                />
                <ContactInput
                    label={'Comment:'}
                    placeholder={'Enter Your Message'}
                    inputStyle={{ height: hp('20%') }}
                    textColor={colors.white}
                    textAlignVertical={'top'}
                />
                <Button
                    buttonText={'Submit'}
                    textStyle={{ color: colors.black }}
                    onPress={() => alert('working in progress')}
                    buttonStyle={styles.button}
                />
                <View style={styles.contactWrapper}>
                    <Text style={styles.heading}>Contact Us</Text>
                    <View style={{ paddingTop: hp('5%') }}>
                        {ContactOptions.map((item) => (
                            <ContactInfo
                                icon={item.icon}
                                text={item.text}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Container>

    )
}

export default ContactUs


const styles = StyleSheet.create({
    screen: {
        padding: hp('2.5%'),
        paddingBottom: hp('10%'),
        paddingTop: hp('1%')
    },
    button: {
        borderRadius: 100,
        width: '40%'
    },
    contactWrapper: {
        paddingTop: hp('5%')
    },
    heading: {
        color: colors.white,
        fontSize: hp('2.7%'),
        fontWeight: 'bold'
    }
})