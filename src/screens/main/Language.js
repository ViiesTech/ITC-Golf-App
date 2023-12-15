import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import ContactInput from '../../components/ContactInput'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import LanguagesName from '../../components/LanguagesName'
import { AllLanguages } from '../../DummyData'
import { useDispatch, useSelector } from 'react-redux'
import constant from '../../redux/constant'

const Language = () => {
    const [language, setLanguage] = useState([])

    const { checkMark, showRecent } = useSelector(state => state.LanguageReducer)
    const dispatch = useDispatch()
    // console.log('hello world' ,checkMark)
    // console.log('huhuhu')

    useEffect(() => {

        setLanguage(showRecent)

    }, [])

    const onSelectLanguage = (item, i) => {
        dispatch({
            type: constant.SELECTED,
            payload: item.text
        })

        const index = showRecent?.findIndex(item => item == AllLanguages[i])

        if (showRecent[index] == AllLanguages[i]) {
            dispatch({
                type: constant.SELECTED,
                payload: item.text
            })
        } else {
            const set = [...showRecent, AllLanguages[i]]
            dispatch({
                type: constant.ADD_RECENT,
                payload: set
            })
        }
    }

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
                {language.length > 0 &&
                    <>
                        <Text style={styles.heading}>Recent Languages</Text>
                        <View style={{ paddingTop: hp('3%') }}>
                            {/* {RecentLanguages.map((item, i) => ( */}
                            <FlatList
                                data={language}
                                renderItem={({ item, index }) => (
                                    <LanguagesName
                                        key={index}
                                        flag={item.flag}
                                        selectedLanguage={item.text == checkMark}
                                        text={item.text}
                                    />
                                )}
                            />
                            {/* ))} */}
                        </View>
                    </>
                }
                <Text style={[styles.heading, { marginTop: hp('2%') }]}>All Languages</Text>
                <View style={{ paddingTop: hp('3%') }}>
                    {AllLanguages.map((item, i) => (
                        <LanguagesName
                            key={i}
                            onPress={() => onSelectLanguage(item, i)}
                            flag={item.flag}
                            disabled={showRecent < 1 && item.text === 'English'}
                            selectedLanguage={item.text == checkMark}
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