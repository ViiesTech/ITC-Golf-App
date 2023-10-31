import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AllOptionsCard from '../../components/AllOptionsCard'
import { discovers, groups, switchOptions } from '../../DummyData'
import DiscoverCard from '../../components/DiscoverCard'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import MyGroupsCard from '../../components/MyGroupsCard'
import SearchFilter from '../../a../../components/SearchFilter'
import colors from '../../assets/colors'
import ContactInput from '../../components/ContactInput'
import DropDownPicker from '../../components/DropDownPicker'
import DateInput from '../../components/DateInput'
import UploadPicture from '../../components/UploadPicture'
import Button from '../../components/Button'
import Tabs from '../../components/Tabs'
import Switch from '../../components/Switch'
import Add from 'react-native-vector-icons/MaterialIcons'

const AllGroups = () => {
    const [chooseOption, setChooseOption] = useState('Discover')

    const onTabChange = (text) => {
        setChooseOption(text)
    }

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'All Groups'}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <AllOptionsCard />
                <View style={{ paddingTop: hp('3%') }}>
                    <SearchFilter />
                    <ScrollView contentContainerStyle={{ paddingTop: hp('3%') }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <Tabs
                            onChangeTab={(text) => onTabChange(text)}
                            active={chooseOption}
                        />
                    </ScrollView>
                    <View style={{ paddingTop: hp('5%') }}>
                        {chooseOption === 'Discover' ?
                            <FlatList
                                data={discovers}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                renderItem={({ item }) => (
                                    <DiscoverCard
                                        image={item.image}
                                    />
                                )}
                            />
                            : chooseOption === 'My Groups' ?
                                <>
                                    {
                                        groups.map((item) => (
                                            <MyGroupsCard
                                                image={item.image}
                                            />
                                        ))
                                    }
                                </>
                                : chooseOption === 'Add New Groups' ?
                                    <View style={styles.addnewWrapper}>
                                        <ContactInput
                                            label={'Group Name'}
                                            placeholder={'Add Title'}
                                            textColor={colors.lightgray}
                                            style={styles.input}
                                        />
                                        <ContactInput
                                            label={'Description'}
                                            textAlignVertical={'top'}
                                            style={[styles.input, { height: hp('15%') }]}
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <DropDownPicker
                                                text={'What Kind Of Listing Is This?'}
                                                iconColor={colors.lightgray}
                                                itemStyle={{ color: colors.lightgray }}
                                                label1={'Select a Value'}
                                                style={styles.picker}
                                            />
                                            <DateInput
                                                icon={'date-range'}
                                            />
                                        </View>
                                        <DropDownPicker
                                            text={'Area Code'}
                                            iconColor={colors.lightgray}
                                            itemStyle={{ color: colors.lightgray }}
                                            label1={'Select'}
                                            style={[styles.picker, { width: hp('30%') }]}
                                        />
                                        <DropDownPicker
                                            text={'The Itc Handshake'}
                                            iconColor={colors.lightgray}
                                            itemStyle={{ color: colors.lightgray }}
                                            label1={'Select'}
                                            style={[styles.picker, { width: hp('45%') }]}
                                        />
                                        <DropDownPicker
                                            text={'Desired Tee Box'}
                                            iconColor={colors.lightgray}
                                            itemStyle={{ color: colors.lightgray }}
                                            label1={'Front Tees'}
                                            style={[styles.picker, { width: hp('45%') }]}
                                        />
                                        <Switch
                                            text={'Is This A Private Group ?'}
                                        />
                                        <View style={{ paddingTop: hp('4%') }}>
                                            <UploadPicture
                                                text={'Picture'}
                                            />
                                            <Button
                                                buttonText={'Create Groups'}
                                                textStyle={{ color: colors.secondary }}
                                                buttonStyle={{ width: '50%', borderRadius: 100, marginTop: hp('2%') }}
                                                onPress={() => alert('working in progress')}
                                            />
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <ContactInput
                                            label={'Location/Golf Course/Clubs For Sale.'}
                                            style={styles.input}
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <DateInput
                                                heading={'Suggested Day'}
                                                text={'mm/dd/yy'}
                                                icon={'date-range'}
                                                mode={'date'}
                                            />
                                            <DateInput
                                                heading={'Suggested Time'}
                                                icon={'access-time'}
                                                mode={'time'}
                                                text={'Select'}
                                                display={'clock'}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <DropDownPicker
                                                text={'Area Code'}
                                                iconColor={colors.lightgray}
                                                itemStyle={{ color: colors.lightgray }}
                                                label1={'Select'}
                                                style={[styles.picker, { width: hp('20%') }]}
                                            />
                                            <DropDownPicker
                                                text={'How Many Players?'}
                                                iconColor={colors.lightgray}
                                                itemStyle={{ color: colors.lightgray }}
                                                label1={'Select'}
                                                style={[styles.picker, { width: hp('20%') }]}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <DropDownPicker
                                                text={'The Itc Handshake'}
                                                iconColor={colors.lightgray}
                                                itemStyle={{ color: colors.lightgray }}
                                                label1={'Select'}
                                                style={[styles.picker, { width: hp('20%') }]}
                                            />
                                            <DropDownPicker
                                                text={'Desired Tee Box'}
                                                iconColor={colors.lightgray}
                                                itemStyle={{ color: colors.lightgray }}
                                                label1={'Select'}
                                                style={[styles.picker, { width: hp('20%') }]}
                                            />
                                        </View>
                                        <ContactInput
                                            label={'Description'}
                                            textAlignVertical={'top'}
                                            style={[styles.input, { height: hp('15%') }]}
                                        />
                                        <UploadPicture
                                            text={'Image'}
                                        />
                                        <View style={{ flexDirection: 'row' }}>
                                            <UploadPicture
                                                text={'Listing Gallery'}
                                                buttonStyle={{ width: hp('16%') }}
                                                style={{ width: hp('37%') }}
                                            />
                                            <View style={styles.addView}>
                                                <Add
                                                    name={'add'}
                                                    color={colors.secondary}
                                                    size={25}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: hp('2%') }}>
                                            <Text style={styles.heading}>Additional Details</Text>
                                            <View style={{ flexDirection: 'row', paddingTop: hp('3%'), flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                {switchOptions.map((item) => (
                                                    <Switch
                                                        text={item.text}
                                                        style={item.id == 3 && { marginTop: hp('2.4%') }}
                                                    />
                                                ))}
                                            </View>
                                            <Button
                                                buttonStyle={{ width: '50%', borderRadius: 100, marginTop: hp('5%') }}
                                                onPress={() => alert('working in progress')}
                                                buttonText={'Add New Listings'}
                                                textStyle={{ color: colors.secondary }}
                                            />
                                        </View>
                                    </View>
                        }
                    </View>
                </View>
                <SVGImage
                    image={icons.pageEnd}
                    style={{ alignSelf: 'center',marginTop: hp('5%') }}
                />
            </ScrollView>
        </Container >
    )
}

export default AllGroups

const styles = StyleSheet.create({
    screen: {
        padding: hp('2%'),
        paddingBottom: hp('20%')
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
    }
})