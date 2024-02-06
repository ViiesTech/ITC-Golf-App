import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import ContactInput from '../../components/ContactInput'
import colors from '../../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Button from '../../components/Button'
import ContactInfo from '../../components/ContactInfo'
import { ContactOptions } from '../../DummyData'
import { useDispatch, useSelector } from 'react-redux'
import { ShowToast } from '../../Custom'
import { contactUs } from '../../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native'

const ContactUs = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        comment: ''
    })

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const { contact_loading } = useSelector(state => state.AuthReducer)

    const onSubmit = async () => {
        if (!state.name) {
            return ShowToast('Please type your name')
        } else if (!state.email) {
            return ShowToast('Please type your email')
        } else if (!state.comment) {
            return ShowToast('Please type any comment')
        } else {
            const res = await dispatch(contactUs(state.name, state.email, state.comment))
            if (res.success) {
                navigation.navigate('Home')
                return ShowToast(res.message)
            } else {
                return ShowToast(res.message)
            }
        }
    }

    const onChange = (value, text) => {
        setState({
            ...state,
            [value]: text
        })
    }

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
                    value={state.name}
                    onChangeText={(text) => onChange('name', text)}
                    inputStyle={{ marginLeft: hp('1%') }}
                    textColor={colors.white}
                />
                <ContactInput
                    label={'Email:'}
                    placeholder={'Your Email'}
                    value={state.email}
                    keyboardType={'email-address'}
                    onChangeText={(text) => onChange('email', text)}
                    textColor={colors.white}
                    inputStyle={{ marginLeft: hp('1%') }}
                />
                <ContactInput
                    label={'Comment:'}
                    placeholder={'Enter Your Message'}
                    value={state.comment}
                    inputStyle={{ height: hp('16%'), marginLeft: hp('1%') }}
                    onChangeText={(text) => onChange('comment', text)}
                    textColor={colors.white}
                    textAlignVertical={'top'}
                />
                <Button
                    buttonText={'Submit'}
                    indicator={contact_loading}
                    textStyle={{ color: colors.black }}
                    onPress={() => onSubmit()}
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