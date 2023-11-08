import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { discovers, groups, picker } from '../DummyData';
import DiscoverCard from './DiscoverCard';
import MyGroupsCard from './MyGroupsCard';
import DropDownPicker from './DropDownPicker';
import DateInput from './DateInput';
import ContactInput from './ContactInput';
import Button from './Button';
import UploadPicture from './UploadPicture';
import Switch from './Switch';

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


const MyGroups = () => (
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
                label={'Group Name'}
                placeholder={'Add Title'}
                textColor={colors.lightgray}
                style={styles.input}
            />
            <ContactInput
                label={'Description'}
                placeholder={'Description...'}
                textAlignVertical={'top'}
                style={[styles.input, { height: hp('15%') }]}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DropDownPicker
                    text={'What Kind Of Listing Is This?'}
                    iconColor={colors.lightgray}
                    itemStyle={{ color: colors.lightgray }}
                    label1={'Select'}
                    style={styles.picker}
                />
                <DateInput
                    heading={'Suggested Day'}
                    icon={'date-range'}
                    text={'mm/dd/yy'}
                />
            </View>
            {picker.map((item) => (
                <DropDownPicker
                    text={item.text}
                    iconColor={colors.lightgray}
                    itemStyle={{ color: colors.lightgray }}
                    label1={item.pickerText1}
                    label2={item.pickerText2}
                    label3={item.pickerText3}
                    style={[styles.picker, { width: hp('44%') }]}
                />
            ))}
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
)

const renderScene = SceneMap({
    first: () => <Discover />,
    second: () => <MyGroups />,
    third: () => <AddNew />
});

export const AddNewGroups = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Discover' },
        { key: 'second', title: 'My Groups' },
        { key: 'third', title: 'Add New Groups' },
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
                    style={{ backgroundColor: colors.white, borderRadius: 10, height: hp('6.2%') }}
                    renderLabel={({ route }) => (
                        <Text
                            style={{
                                color: colors.secondary,
                                fontWeight: 'bold',
                                marginRight: 2,
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
        bottom: hp('1%'),
        marginLeft: hp('0.5%'),
        alignItems: 'center',
        borderRadius: 10,
        padding: hp('2%'),
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.gray
    },
    addnewWrapper:{
        paddingTop: hp('4%'),
    }
})