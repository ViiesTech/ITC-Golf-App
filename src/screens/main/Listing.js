import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SecondaryHeader from '../../components/SecondaryHeader'
import ListingDetailCard from '../../components/ListingDetailCard'
import { listingDetails } from '../../DummyData'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'

const Listing = () => {

  const navigation = useNavigation()

  const { listing, loader } = useSelector(state => state.HomeReducer)

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Listing'} />
      <View style={styles.screen}>
          <FlatList
            data={listing}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp('35%') }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <ListingDetailCard
                // image={item.image}
                title={Object.keys(item.listing_title).length == 13 ? item.listing_title : 'New Listing'}
                desc={Object.keys(item.match_description).length == 4 ? item.match_description : 'test'}
                date={item.course_date}
                time={item.course_time == '' ? '23:28' : item.course_time}
                exp={item.experience_level == '' ? '5 to 10 par progress level' : item.experience_level}
                onPress={() => navigation.navigate('SecondaryStack', { screen: 'PersonalInfo' })}
              />
            )}
          />
        <SVGImage image={icons.pageEnd} style={styles.endIcon} />
      </View>
    </Container>
  )
}

export default Listing;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('2%'),
    padding: hp('3%'),
  },
  endIcon: {
    alignSelf: 'center',
  }
})