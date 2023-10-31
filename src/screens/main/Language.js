import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import ContactInput from '../../components/ContactInput'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import LanguagesName from '../../components/LanguagesName'
import { AllLanguages, RecentLanguages } from '../../DummyData'

const Language = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Language'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <ContactInput
                    placeholder={'Search Language'}
                    textColor={colors.lightgray}
                    icon={true}
                />
                <Text style={styles.heading}>Recent Languages</Text>
                <View style={{ paddingTop: hp('3%') }}>
                    {RecentLanguages.map((item, i) => (
                        <LanguagesName
                            key={i}
                            icon={i == 1 && 'check'}
                            flag={item.flag}
                            text={item.text}
                        />
                    ))}
                   </View> 
                    <Text style={[styles.heading, { marginTop: hp('2%') }]}>All Languages</Text>
                    <View style={{ paddingTop: hp('3%') }}>
                        {AllLanguages.map((item, i) => (
                            <LanguagesName
                                key={i}
                                flag={item.flag}
                                text={item.text}
                            />
                        ))}
                    </View>
            </ScrollView>
        </Container>
    )
}

export default Language

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%'),
        paddingTop: hp('0.1%')
    },
    heading: {
        color: colors.white,
        marginTop: hp('1%'),
        fontWeight: 'bold',
        fontSize: hp('2.5%')
    }
})