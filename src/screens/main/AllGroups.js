import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AllOptionsCard from '../../components/AllOptionsCard'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import SearchFilter from '../../components/SearchFilter'
import colors from '../../assets/colors'
import { AddNewGroups } from '../../components/AddNewGroups'
import images from '../../assets/images'
import Edit from 'react-native-vector-icons/Feather'
import ContactInput from '../../components/ContactInput'
import DropDownPicker from '../../components/DropDownPicker'
import Button from '../../components/Button'
import { AddNewListings } from '../../components/AddNewListings'

const AllGroups = ({ route }) => {
    const { options } = route.params

    const [changeTab, setChangeTab] = useState(options)

    console.log(changeTab)


    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={[styles.wrapper, { paddingBottom: changeTab === 'Add New Groups' || changeTab === 'Add New Listings' ? hp('215%') : 0 }]} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    text={'All Groups'}
                />
                <View style={styles.screen}>
                    <AllOptionsCard
                        active={changeTab}
                        onChangeTab={(text) => setChangeTab(text)}
                    />
                    {changeTab === 'Add New Groups' ?
                        <>
                            <SearchFilter />
                            <View style={{ height: '200%' }}>
                                <AddNewGroups />
                            </View>
                        </>
                        : changeTab === 'Add New Listings' ?
                            <View style={{ height: '400%' }}>
                                <AddNewListings />
                            </View>
                            :
                            changeTab === 'Players You Follow' ?
                                <View style={styles.followCard}>
                                    <Text style={styles.userName}>USER NAME:</Text>
                                    <Text style={styles.name}>Becker alisson</Text>
                                    <Text style={styles.userName}>EMAIL:</Text>
                                    <Text style={styles.name}>backeraliison23@gmail.com</Text>
                                </View>
                                :
                                <View style={{ paddingTop: hp('4%') }}>
                                    <Text style={styles.heading}>EDIT YOUR PROFILE</Text>
                                    <View style={{ position: 'relative', height: hp('14%'), width: '40%',marginTop: hp('2%') }}>
                                        <Image
                                            source={images.editProfile}
                                            style={styles.imageStyle}
                                            borderRadius={10}
                                        />
                                        <View style={styles.editView}>
                                            <Edit
                                                name={'edit'}
                                                color={colors.primary}
                                                size={16}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ paddingTop: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <ContactInput
                                            label={'First Name'}
                                            placeholder={'First Name'}
                                            style={styles.input}
                                            textColor={colors.lightgray}
                                        />
                                        <ContactInput
                                            label={'Last Name'}
                                            placeholder={'Last Name'}
                                            style={styles.input}
                                            textColor={colors.lightgray}
                                        />
                                    </View>
                                    <DropDownPicker
                                        style={styles.pickerStyle}
                                        text={'Area Code'}
                                        label1={'Select'}
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <DropDownPicker
                                            style={[styles.pickerStyle, { width: hp('20%') }]}
                                            text={'Experience Level'}
                                            label1={'Select'}
                                        />
                                        <DropDownPicker
                                            style={styles.pickerStyle}
                                            text={'Search By Desired Tee Box'}
                                            label1={'Select'}
                                        />
                                    </View>
                                    <DropDownPicker
                                        style={[styles.pickerStyle, { marginBottom: hp('1%') }]}
                                        text={'The Itc Handshake'}
                                        label1={'Select'}
                                    />
                                    <Text style={{ color: colors.primary, fontSize: hp('1.5%'), marginBottom: hp('4%') }}>ITC GIVEAWAY AND RAFFLE ADDRESS</Text>
                                    <ContactInput
                                        style={[styles.input, { height: hp('16%'), width: '100%' }]}
                                        placeholder={'37 Cardinal Lane Petersburg,'}
                                        textColor={colors.lightgray}
                                        textAlignVertical={'top'}
                                        label={'Short Description:'}
                                    />
                                    <View style={styles.emailCard}>
                                        <Text style={{ color: colors.lightgray, fontSize: hp('1.7%') }}>Backeraliison23@Gmail.Com</Text>
                                    </View>
                                    <Button
                                        buttonText={'UPDATE MY PROFILE'}
                                        buttonStyle={{ width: '60%', borderRadius: 100, marginTop: hp('5%') }}
                                        textStyle={{ color: colors.secondary, fontSize: hp('1.8%') }}
                                    />
                                </View>

                    }
                    <SVGImage
                        image={icons.pageEnd}
                        style={{ alignSelf: 'center', marginTop: hp('5%') }}
                    />
                </View>
            </ScrollView>
        </Container >
    )
}

export default AllGroups

const styles = StyleSheet.create({
    screen: {
        padding: hp('2%'),
    },
    tabView: {
        backgroundColor: colors.white,
        padding: hp('1.2%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    textBackground: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        borderRadius: 100,
        padding: hp('1.8%')
    },
    addnewWrapper: {
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        width: hp('22%'),
        borderColor: colors.gray
    },
    picker: {
        borderWidth: 1.5,
        width: hp('23%'),
        padding: hp('0.6%'),
        borderColor: colors.gray
    },
    addView: {
        backgroundColor: colors.primary,
        height: hp('4%'),
        width: hp('4%'),
        borderRadius: 100,
        marginLeft: hp('2%'),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%')
    },
    heading: {
        color: colors.white,
        fontSize: hp('2%'),
        fontWeight: 'bold'
    },
    followCard: {
        backgroundColor: colors.gray,
        marginTop: hp('5%'),
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: colors.white,
        padding: hp('4%')
    },
    userName: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('1.8%')
    },
    name: {
        color: colors.white,
        marginBottom: hp('4%'),
        marginTop: hp('1%')
    },
    imageStyle: {
        height: hp('14%'),
        width: '100%'
    },
    editView: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        position: 'absolute',
        padding: hp('0.6%'),
        alignItems: 'center',
        justifyContent: 'center',
        right: 5,
        bottom: 5,
    },
    pickerStyle: {
        borderWidth: 0.2,
        marginBottom: hp('6%'),
        borderRadius: 5
    },
    emailCard: {
        marginTop: hp('2%'),
        borderRadius: 10,
        backgroundColor: colors.gray,
        padding: hp('2%')
    },
    wrapper: {
        paddingTop: hp('3%'),
    }
})