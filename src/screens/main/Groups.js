import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ListingDetailCard from '../../components/ListingDetailCard'
import { Group } from '../../DummyData'
import { useDispatch, useSelector } from 'react-redux'
import { getGroups } from '../../redux/actions/homeAction'
import Loader from '../../components/Loader'
import colors from '../../assets/colors'

const Groups = () => {

    const { group_loader, groups } = useSelector(state => state.HomeReducer)
    console.log('from group screen =============>', groups)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getGroups())

    }, [])

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Groups'}
            />
            <View style={styles.screen}>
                {group_loader ?
                    <Loader
                        color={colors.white}
                        size={'large'}
                    />
                    :
                    <FlatList
                        data={groups}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: hp('35%') }}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <ListingDetailCard
                                hideTag
                                title={item.listing_title}
                                desc={item.group_desired_teebox == '' ? 'All Other' : item.group_desired_teebox}
                                date={item.suggested_day}
                                area={item.area_code}
                            />
                        )}
                    />
                }
            </View>
        </Container>
    )
}

export default Groups

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%'),
        paddingTop: hp('2%')
    }
})