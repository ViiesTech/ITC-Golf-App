import { Image, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import images from '../../assets/images'
import PersonalInfoTab from '../../components/PersonalInfoTab'
import { ReviewImages, Tabs } from '../../DummyData'
import ReviewCard from '../../components/ReviewCard'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'

const PersonalInfo = () => {
    const [chooseButton, setChooseButton] = useState(1)
    const [changeTab, setChangeTab] = useState(false)

    const onChangeTab = (index) => {
        setChooseButton(index)
        if (index == 2) {
            setChangeTab(true)
        } else {
            setChangeTab(false)
        }

    }

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'MOKAN Elite (MO)'}
            />
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={styles.tabView}>
                    {Tabs.map((item) => (
                        <PersonalInfoTab
                            text={item.text}
                            style={chooseButton == item.id ? { backgroundColor: colors.primary, borderWidth: 0 } : { backgroundColor: 'transparent', borderWidth: 2 }}
                            onPress={() => onChangeTab(item.id)}
                        />
                    ))}
                </View>
                {changeTab ?
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: hp('5%'),paddingBottom: hp('10%') }}>
                            <Text style={styles.review}>Reviews</Text>
                            <View style={{ paddingTop: hp('3%') }}>
                                <FlatList
                                    data={ReviewImages}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    renderItem={({ item, index }) => (
                                        <ReviewCard
                                            image={item.image}
                                        />
                                    )}
                                />
                            </View>
                            <SVGImage 
                                image={icons.pageEnd} 
                                style={{alignSelf: 'center'}}
                            />
                        </ScrollView>
                    </> : <>
                        <View style={{ paddingTop: hp('10%') }}>
                            <View style={styles.headingView}>
                                <Image
                                    source={images.personal1}
                                    style={styles.image}
                                />
                                <Text style={styles.name}>MOKAN Elite (MO)</Text>
                            </View>
                        </View>
                        <View style={styles.formWrapper}>
                            <View>
                                <Text style={styles.heading}>MATCH DESCRIPTION:</Text>
                                <Text style={styles.heading}>LISTER'S NAME:</Text>
                                <Text style={styles.heading}>MATCH NAME:</Text>
                                <Text style={styles.heading}>AREA CODE:</Text>
                                <Text style={styles.heading}>MATCH TYPE:</Text>
                                <Text style={styles.heading}>EXPERIENCE LEVEL:</Text>
                                <View style={{ paddingTop: hp('3%') }}>
                                    <Text style={styles.heading}>SUGGESTED DAY:</Text>
                                    <Text style={styles.heading}>SUGGESTED TIME:</Text>
                                    <Text style={styles.heading}>HOW MANY PLAYERS:</Text>
                                    <Text style={styles.heading}>THE ITC HANDSHAKE:</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.line} />
                                <View style={[styles.line, { marginTop: hp('5.5%'), height: hp('32%') }]} />
                            </View>
                            <View>
                                <Text style={styles.text}>Test</Text>
                                <Text style={styles.text}>Kelvin James</Text>
                                <Text style={styles.text}>MOKAN Elite</Text>
                                <Text style={styles.text}>216</Text>
                                <Text style={styles.text}>Singles Match Play</Text>
                                <Text style={[styles.text, { width: '50%' }]}>Around Par To 5 High Level</Text>
                                <Text style={[styles.text, { marginTop: hp('1%') }]}>2023-08-23</Text>
                                <Text style={styles.text}>23:28</Text>
                                <Text style={styles.text}>2</Text>
                                <Text style={[styles.text, { width: '50%' }]}>CASUAL HANDSHAKE</Text>
                            </View>
                        </View>
                    </>
                }

            </ScrollView>
        </Container >
    )
}

export default PersonalInfo

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%')
    },
    headingView: {
        backgroundColor: colors.gray,
        padding: hp('2%'),
        borderRadius: 10,
    },
    image: {
        height: hp('15%'),
        position: 'absolute',
        marginLeft: hp('3%'),
        top: hp('-4%'),
        width: hp('15%')
    },
    name: {
        color: colors.white,
        alignSelf: 'flex-end',
        marginRight: hp('3%'),
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    tabView: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heading: {
        color: colors.white,
        fontSize: hp('1.8%'),
        marginBottom: hp('6%'),
        fontWeight: 'bold'
    },
    formWrapper: {
        paddingTop: hp('11%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        width: 1.1,
        backgroundColor: colors.gray,
        marginLeft: hp('5%'),
        height: hp('48%')
    },
    text: {
        color: colors.lightgray,
        fontSize: hp('1.7%'),
        marginBottom: hp('6%'),
        marginLeft: hp('5%'),
        marginTop: hp('0.1%')
    },
    review: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2.4%')
    }
})