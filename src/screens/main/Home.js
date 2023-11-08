import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import images from '../../assets/images'
import colors from '../../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DropDownPicker from '../../components/DropDownPicker'
import { cardImages, listingImages, picker } from '../../DummyData'
import ListingCard from '../../components/ListingCard'
import Button from '../../components/Button'
import ArrowDown from 'react-native-vector-icons/SimpleLineIcons';
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'

const Home = () => {
  return (
    <Container>
      <ScrollView>
        <View style={styles.headerWrapper}>
          <Header />
        </View>
        <Image
          source={images.home1}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.heading}>A PLACE FOR GOLFERS</Text>
          <Text style={styles.message}>Of All Skills Level To Find Each Other</Text>
        </View>
        <View style={{ padding: hp('2%') }}>
          <View style={styles.border}>
            {picker.map((item, i) => (
              <DropDownPicker
                key={i}
                text={item.text}
                label1={item.pickerText1}
                label2={item.pickerText2}
                label3={item.pickerText3} />
            ))}
            <Button
              buttonText={'Search'}
              icon={true}
              onPress={() => alert('working in progress')}
            />
          </View>
          <Text style={styles.text}>Listing</Text>
          <View style={styles.cardWrapper}>
            {cardImages.map((item) => (
              <View style={item.id !== 5 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.lightgray,
                marginBottom: hp('2.5%')
              }}>
                <ListingCard
                  key={item.id}
                  image={item.image}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.9}>
            <ArrowDown
              name={'arrow-down'}
              color={colors.white}
              size={24}
            />
          </TouchableOpacity>
          <View style={{ paddingTop: hp('5%') }}>
            <Image
              source={images.home2}
              style={styles.golfImage}
            />
            <Text style={styles.heading}>Listing</Text>
            <View style={{ paddingTop: hp('5%') }}>
              {listingImages.map((item) => (
                <Image
                  source={item.image}
                  style={styles.listingImage}
                  borderRadius={10}
                />
              ))}
              <SVGImage
                image={icons.pageEnd}
                style={styles.endIcon}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  )
}

export default Home;

const styles = StyleSheet.create({
  image: {
    height: hp('88%'),
    width: '100%',
  },
  headerWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 1
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    width: '70%',
    fontSize: hp('4%')
  },
  message: {
    color: colors.white,
    marginTop: hp('2%'),
    fontWeight: 'bold',
    fontSize: hp('2%')
  },
  textWrapper: {
    left: hp('4%'),
    position: 'absolute',
    top: hp('45%'),
  },
  border: {
    borderColor: colors.lightgray,
    padding: hp('5%'),
    borderWidth: 1.5,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('3.8%'),
    marginTop: hp('7%')
  },
  wrapper: {
    paddingTop: hp('3%'),
    marginLeft: hp('1%')
  },
  cardWrapper: {
    paddingTop: hp('5%'),
  },
  button: {
    backgroundColor: colors.gray,
    padding: hp('2%'),
    borderRadius: 5,
    marginTop: hp('2%'),
    alignItems: 'center'
  },
  golfImage: {
    height: hp('35%'),
    width: '85%',
    alignSelf: 'center'
  },
  listingImage: {
    height: hp('20%'),
    marginBottom: hp('4%'),
    width: '100%'
  },
  endIcon: {
    alignSelf: 'center',
    paddingTop: hp('5%')
  }
})