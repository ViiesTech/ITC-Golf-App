import * as React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AllListingsPicker, discovers, groups, switchOptions } from '../DummyData';
import DiscoverCard from './DiscoverCard';
import MyGroupsCard from './MyGroupsCard';
import DropDownPicker from './DropDownPicker';
import DateInput from './DateInput';
import ContactInput from './ContactInput';
import Button from './Button';
import UploadPicture from './UploadPicture';
import Switch from './Switch';
import Add from 'react-native-vector-icons/MaterialIcons'

const Discover = () => {
    return (
        <View style={{ paddingTop: hp('4%') }}>
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
        </View>
    )
}


const MyListings = () => (
    <View style={{ paddingTop: hp('4%') }}>
        {
            groups.map((item) => (
                <MyGroupsCard
                    image={item.image}
                />
            ))
        }
    </View>
);

const AddNew = () => (
    <View style={styles.addnewWrapper}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {AllListingsPicker.map((item) => (
                <DropDownPicker
                    text={item.text}
                    iconColor={colors.lightgray}
                    itemStyle={{ color: colors.lightgray }}
                    value1={item.pickerText1}
                    value2={item.pickerText2}
                    value3={item.pickerText3}
                    label1={item.pickerText1}
                    label2={item.pickerText2}
                    label3={item.pickerText3}
                    style={[styles.picker, { width: hp('20%') }]}
                />
            ))}
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
            <TouchableOpacity style={styles.addView} activeOpacity={0.9}
                onPress={() => alert('working in progress')}
            >
                <Add
                    name={'add'}
                    color={colors.secondary}
                    size={25}
                />
            </TouchableOpacity>
        </View>
        <View style={{ paddingTop: hp('2%') }}>
            <Text style={styles.heading}>Additional Details</Text>
            <View style={{ flexDirection: 'row', paddingTop: hp('3%'), flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {switchOptions.map((item) => (
                    <Switch
                        text={item.text}
                        style={{ marginBottom: hp('3%') }}
                    />
                ))}
            </View>
            <Button
                buttonStyle={{ width: '50%', borderRadius: 100, marginTop: hp('2%') }}
                onPress={() => alert('working in progress')}
                buttonText={'Add New Listings'}
                textStyle={{ color: colors.secondary }}
            />
        </View>
    </View>

)

const renderScene = SceneMap({
    first: () => <Discover />,
    second: () => <MyListings />,
    third: () => <AddNew />
});

export const AddNewListings = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Discover' },
        { key: 'second', title: 'My Listing' },
        { key: 'third', title: 'Add New Listings' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            style={{ marginTop: hp('2.5%') }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={styling => (
                <TabBar
                    indicatorStyle={styles.indicatorStyle}
                    {...styling}
                    style={{ backgroundColor: colors.white, borderRadius: 10, height: hp('6.8%') }}
                    renderLabel={({ route }) => (
                        <Text
                            style={{
                                color: colors.secondary,
                                marginTop: hp('0.5%'),
                                fontWeight: 'bold',
                                fontSize: hp('1.4%'),
                            }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    indicatorStyle: {
        backgroundColor: colors.primary,
        width: '30%',
        bottom: hp('1.2%'),
        marginLeft: hp('0.5%'),
        alignItems: 'center',
        borderRadius: 50,
        padding: hp('2.3%'),
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.gray
    },
    addnewWrapper: {
        paddingTop: hp('4%'),
    }
})