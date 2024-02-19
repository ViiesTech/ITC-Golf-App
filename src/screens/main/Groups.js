import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ListingDetailCard from '../../components/ListingDetailCard'
import { useDispatch, useSelector } from 'react-redux'
import { getGroups } from '../../redux/actions/homeAction'
import colors from '../../assets/colors'
import { useNavigation } from '@react-navigation/native'
import SearchFilter from '../../components/SearchFilter'
import Sponsors from '../../components/Sponsors'

const Groups = () => {

    const navigation = useNavigation()

    const { group_loader, groups } = useSelector(state => state.HomeReducer)
    console.log('from group screen =============>', groups)

    const routeName = navigation.getState().routes[3].name

    const dispatch = useDispatch()

    useEffect(() => {
        if (groups.length < 1) {
            dispatch(getGroups())
        }
    }, [])

    if (group_loader) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.secondary }}>
                <ActivityIndicator
                    size={'large'}
                    color={colors.primary}
                />
            </View>
        )
    }

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.screen}>
                <SearchFilter />
                <SecondaryHeader
                    text={'Groups'}
                    style={{ paddingTop: hp('5%') }}
                />
                <FlatList
                    data={groups}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: hp('2.5%') }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <ListingDetailCard
                            hideTag
                            route={routeName}
                            title={item.listing_title}
                            desc={item.group_desired_teebox == '' ? 'All Other' : item.group_desired_teebox}
                            date={item.suggested_day == '02/18/24' ? item.suggested_day : '02/18/24'}
                            area={item.area_code}
                        />
                    )}
                />
                <Sponsors />
            </ScrollView>
        </Container>
    )
}

export default Groups

const styles = StyleSheet.create({
    screen: {
        paddingTop: hp('2%')
    }
})