import * as React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import { ShowToast } from '../Custom';
import { createListing } from '../redux/actions/listingAction';
import { getListings } from '../redux/actions/homeAction';
import images from '../assets/images';

const Discover = () => {
    const dispatch = useDispatch()

    const { listing, loader } = useSelector(state => state.HomeReducer)

    React.useEffect(() => {

        if (listing.length < 1) {
            dispatch(getListings())
        }

    }, [])

    return (
        <View style={{ paddingTop: hp('4%') }}>
            {loader ?
                <View style={{ alignItems: 'center', marginVertical: hp('5%') }}>
                    <ActivityIndicator
                        size={'large'}
                        color={colors.primary}
                    />
                </View>
                :
                <FlatList
                    data={listing}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <DiscoverCard
                            image={images.discover1}
                            title={Object.keys(item.listing_title).length == 13 ? item.listing_title : 'New Listing'}
                            itc={item.experience_level == '' ? '5 to 10 par progress level' : item.experience_level}
                            desc={Object.keys(item.match_description).length == 4 ? item.match_description : 'test'}
                            date={item.course_date}
                            time={item.course_time == '' ? '23:28' : item.course_time}
                        />
                    )}
                />
            }
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

const AddNew = () => {
    const [state, setState] = React.useState({
        location: '',
        suggested_day: '',
        suggested_time: '',
        pickers: {
            area_code: '212',
            how_many_players: '2',
            itc_handshake: 'High-Five',
            desired_tee: 'Front Tees',
        },
        description: '',
        image_details: {
            name: 'No File Chosen',
            path: ''
        },
        listing_gallery: '',
        smoking_friendly: false,
        drinking_friendly: false,
        private_listing: false,
    })

    const dispatch = useDispatch()

    const { create_listing_loading } = useSelector(state => state.ListingReducer)

    // console.log(typeof state.smoking_friendly)

    const onChoosePhoto = async (type) => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                quality: 0.5,
            }
        }

        await launchImageLibrary(options, async response => {
            if (response.didCancel) {
                console.log('cancelled', response.didCancel)
            } else {
                if (type == 'image') {
                    setState(prevState => ({
                        ...prevState,
                        image_details: {
                            name: response.assets[0].fileName,
                            path: response.assets[0].uri
                        }
                    }))
                } else {
                    setState({
                        ...state,
                        listing_gallery: response.assets[0].uri
                    })
                }
            }

        })
    }

    const onSwitchToggle = (switchName, value) => {
        // console.log(state[switchName])
        setState(prevState => ({
            ...prevState,
            [switchName]: value
        }))
    }

    const handlePickerChange = (pickerName, text) => {
        setState(prevState => ({
            ...prevState,
            pickers: {
                ...prevState.pickers,
                [pickerName]: text
            }
        }));
    }

    const onCreateListing = async () => {
        if (!state.location) {
            return ShowToast('Please add your location')
        } else {
            await dispatch(createListing(
                state.location,
                state.description,
                state.suggested_day,
                state.suggested_time,
                state.pickers.how_many_players,
                state.pickers.area_code,
                state.pickers.itc_handshake,
                state.pickers.desired_tee,
                state.drinking_friendly,
                state.private_listing
            ))
        }
    }


    return (
        <View style={styles.addnewWrapper}>
            <ContactInput
                label={'Location/Golf Course/Clubs For Sale.'}
                value={state.location}
                onChangeText={(text) => setState({
                    ...state,
                    location: text
                })}
                style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DateInput
                    heading={'Suggested Day'}
                    onConfirm={(date) => setState({
                        ...state,
                        suggested_day: moment(date).format('MM/DD/YY')
                    })}
                    text={state.suggested_day !== '' ? state.suggested_day : 'mm/dd/yy'}
                    icon={'date-range'}
                    mode={'date'}
                />
                <DateInput
                    heading={'Suggested Time'}
                    icon={'access-time'}
                    mode={'time'}
                    onConfirm={(time) =>
                        setState({
                            ...state,
                            suggested_time: moment(time).format('hh:mm')
                        })
                    }
                    text={state.suggested_time !== '' ? state.suggested_time : 'Select'}
                    display={'clock'}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {AllListingsPicker.map((item) => (
                    <DropDownPicker
                        text={item.text}
                        iconColor={colors.lightgray}
                        itemStyle={{ color: colors.lightgray }}
                        selectedValue={state.pickers[item.props]}
                        onValueChange={(itemValue) => {
                            handlePickerChange(item.props, itemValue)
                        }}
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
                value={state.description}
                onChangeText={(text) => setState({
                    ...state,
                    description: text
                })}
                textAlignVertical={'top'}
                style={[styles.input, { height: hp('15%') }]}
            />
            <UploadPicture
                text={'Image'}
                chooseFile={() => onChoosePhoto('image')}
                fileName={state.image_details.name}
            />
            <View style={{ flexDirection: 'row' }}>
                <UploadPicture
                    text={'Listing Gallery'}
                    buttonStyle={{ width: hp('16%') }}
                    chooseFile={() => onChoosePhoto('gallery')}
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
                            isOn={state[item.props]}
                            color={state[item.props] ? colors.secondary : colors.lightgray}
                            onToggle={(isOn) => onSwitchToggle(item.props, isOn)}
                            style={{ marginBottom: hp('3%') }}
                        />
                    ))}
                </View>
                <Button
                    buttonStyle={{ width: '50%', borderRadius: 100, marginTop: hp('2%') }}
                    onPress={() => onCreateListing()}
                    buttonText={'Add New Listings'}
                    indicator={create_listing_loading}
                    textStyle={{ color: colors.secondary }}
                />
            </View>
        </View >
    )
}

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