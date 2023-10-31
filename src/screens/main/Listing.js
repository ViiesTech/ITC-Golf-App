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
import colors from '../../assets/colors'

const Listing = () => {
  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Listing'} />
      <View style={styles.screen}>
        <FlatList
          data={listingDetails}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp('35%') }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <ListingDetailCard
              image={item.image}
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
  endIcon:{
    alignSelf: 'center',
  }
})