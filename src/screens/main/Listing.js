import { StyleSheet, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SecondaryHeader from '../../components/SecondaryHeader'
import ListingDetailCard from '../../components/ListingDetailCard'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Sponsors from '../../components/Sponsors'
import SearchFilter from '../../components/SearchFilter'

const Listing = () => {

  const navigation = useNavigation()
  console.log('lets see', navigation.getState().routes[1].name)
  const routeName = navigation.getState().routes[1].name

  const { listing, loader } = useSelector(state => state.HomeReducer)

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.screen}>
        <SearchFilter
        />
        <SecondaryHeader text={'Listing'} style={{ paddingTop: hp('5%') }} />
        <FlatList
          data={listing}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ padding: hp('2.5%') }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <ListingDetailCard
              // image={item.image}
              route={routeName}
              title={Object.keys(item.listing_title).length == 13 ? item.listing_title : 'New Listing'}
              desc={Object.keys(item.match_description).length == 4 ? item.match_description : 'test'}
              date={item.course_date}
              time={item.course_time == '' ? '23:28' : item.course_time}
              exp={item.experience_level == '' ? '5 to 10 par progress level' : item.experience_level}
              onPress={() => navigation.navigate('SecondaryStack', { screen: 'ListingDetails', params: { item } })}
            />
          )}
        />
        <Sponsors />
      </ScrollView>
    </Container>
  )
}

export default Listing;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('2%'),
  },
})