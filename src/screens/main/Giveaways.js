import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import GiveawayCard from '../../components/GiveawayCard'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import images from '../../assets/images'
import { dateTime, giveaways } from '../../DummyData'
import colors from '../../assets/colors'
import DateTime from '../../components/DateTime'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'

const Giveaways = () => {

  const navigation = useNavigation()

  const onGiveawayPress = (index) => {
    if (index == 2 || 3) {
      navigation.navigate('GiveawayStack', { screen: 'RaffleGiveaways' })
    }
  }

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Giveaways'} />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.wrapper}>
          <Image
            source={images.giveaway1}
            style={styles.image}
            borderRadius={5}
          />
          <View style={styles.wrapperStyle}>
            <Text style={styles.heading}>GIVEAWAY</Text>
            <Text style={styles.text}>Enter To Win A Free Giveaway </Text>
            <View style={styles.line} />
            <View style={styles.dateWrapper}>
              {dateTime.map((item) => (
                <DateTime
                  text={item.text}
                  number={item.number}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={{ paddingTop: hp('7%') }}>
          {giveaways.map((item) => {
            return (
              <GiveawayCard
                buttonText={item.id == 2 ? 'Get Started' : 'Sign Up'}
                onPress={() => onGiveawayPress(item.id)}
                style={{ flexDirection: item.id == 1 ? 'row' : item.id == 2 ? 'row-reverse' : 'row' }}
                textStyle={{ marginLeft: item.id == 2 && hp('15%') }}
                imageStyle={{ marginLeft: item.id == 2 && hp('3.5%') }}
              />
            )
          })}
        </View>
        <SVGImage
          image={icons.pageEnd}
          style={{ alignSelf: 'center' }}
        />
      </ScrollView>
    </Container>
  )
}

export default Giveaways

const styles = StyleSheet.create({
  screen: {
    padding: hp('4.5%'),
    paddingBottom: hp('5%')
  },
  wrapper: {
    flexDirection: 'row',

  },
  image: {
    height: hp('20%'),
    width: '47%'
  },
  heading: {
    color: colors.primary,
    fontSize: hp('2.2%'),
  },
  wrapperStyle: {
    marginLeft: hp('2.6%')
  },
  text: {
    color: colors.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    width: '50%'
  },
  line: {
    marginTop: hp('3%'),
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    width: '75%'
  },
  dateWrapper: {
    paddingTop: hp('1%'),
    flexDirection: 'row'
  },

})