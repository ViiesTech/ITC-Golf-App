import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import Video from 'react-native-video'
import { useNavigation } from '@react-navigation/native'
import AppStatusBar from '../../components/AppStatusBar'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from '../../redux/actions/homeAction'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("")

  const width = Dimensions.get('screen').width;

  const { listing, loader } = useSelector(state => state.HomeReducer)
  console.log('listinggg', listing)

  const dispatch = useDispatch()

  const navigation = useNavigation()

  useEffect(() => {

    if (listing.length < 1) {
      dispatch(getListings())
    }

  }, [])

  if (loader) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
        />
      </View>
    )
  }

  return (
    <>
      <AppStatusBar />
      <Container>
        <ScrollView>
          <View style={styles.headerWrapper}>
            <Header />
          </View>
          <Video
            source={require('../../assets/video/homeVideo.mp4')}
            style={[styles.backgroundVideo, { width: width }]}
            resizeMode={"cover"}
            repeat
            paused={false}
          />
          <View style={styles.videoBackground} />
          <View style={styles.logoWrapper}>
            <Image
              source={images.logo}
              style={styles.logoStyle}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>A PLACE FOR GOLFERS</Text>
            <Text style={styles.message}>Of All Skills Level To Find Each Other</Text>
          </View>
          <View style={{ padding: hp('2%') }}>
            <View style={styles.border}>
              <Text style={styles.textStyle}>Area Code</Text>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={selectedOption}
                  dropdownIconColor={colors.white}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedOption(itemValue)
                  }
                >
                  {picker.map((item) => (
                    <Picker.Item
                      label={item.pickerText} value={item} style={{ color: colors.white }}
                    />
                  ))}
                </Picker>
              </View>
              <Button
                buttonText={'Search'}
                icon={true}
                onPress={() => alert('working in progress')}
              />
            </View>
            <Text style={styles.text}>Listing</Text>
            <View style={styles.cardWrapper}>
              {listing?.map((item, index) => (
                <View style={index !== 7 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lightgray,
                  marginBottom: hp('2.5%')
                }}>
                  <ListingCard
                    key={item.id}
                    title={Object.keys(item.listing_title).length == 13 ? item.listing_title : 'New Listing'}
                    // descStyle={{ width: index == 0 ? '20%' : index == 1 ? '40%' : '100%' }}
                    count={item.how_many_players == 'Select a Value' ? '3' : item.how_many_players}
                    exp={item.experience_level == "" ? '5 to 10 par progress-level' : item.experience_level}
                    date={item.course_date}
                    desc={Object.keys(item.match_description).length == 4 ? item.match_description : 'test'}
                    // image={item.image}
                    onPress={() => navigation.navigate('SecondaryStack', { screen: 'ListingDetails', params: { item } })}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('Listing')}>
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
    </>
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
    top: hp('64%'),
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
  },
  logoStyle: {
    height: hp('22%'),
    width: hp('22%')
  },
  logoWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('27%'),
    right: 0,
    left: 0
  },
  backgroundVideo: {
    height: hp('100%'),
  },
  videoBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  pickerStyle: {
    borderWidth: 0.7,
    borderRadius: 10,
    marginTop: hp('1.5%'),
    marginBottom: hp('4%'),
    borderColor: colors.lightgray,
  },
  textStyle: {
    color: colors.white,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  }
})