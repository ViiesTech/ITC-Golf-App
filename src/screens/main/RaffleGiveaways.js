import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RaffleCard from '../../components/RaffleCard'
import { raffles } from '../../DummyData'

const RaffleGiveaways = () => {
  return (
    <Container>
      <Header />
      <SecondaryHeader
        text={'Raffles'}
      />
      <View style={styles.screen}>
        <FlatList
          data={raffles}
          numColumns={2}
          contentContainerStyle={{paddingBottom: hp('15%')}}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <RaffleCard
              image={item.image}
            />
          )}
        />
      </View>
    </Container>
  )
}

export default RaffleGiveaways

const styles = StyleSheet.create({
  screen: {
    padding: hp('3%')
  }
})