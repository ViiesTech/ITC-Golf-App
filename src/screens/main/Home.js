import {
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import images from '../../assets/images';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListingCard from '../../components/ListingCard';
import Button from '../../components/Button';
import ArrowDown from 'react-native-vector-icons/SimpleLineIcons';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import AppStatusBar from '../../components/AppStatusBar';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  ListingsByAreaCodes,
  getAllAreaCodes,
  getListings,
} from '../../redux/actions/homeAction';
import Sponsors from '../../components/Sponsors';
import FastImage from 'react-native-fast-image';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listings, setListings] = useState([]);

  const width = Dimensions.get('screen').width;

  const {loader, area_codes, listings_filter, listings_filter_loader} =
    useSelector(state => state.HomeReducer);
  // console.log('listinggg filtered =====>', listings_filter?.length < 1);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    // if (listing.length < 1 && area_codes.length < 1) {
    dispatch(getListings(setListings));
    dispatch(getAllAreaCodes());
    // }
  }, []);

  if (loader) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  const onSearchAreaCode = async () => {
    if (selectedOption) {
      await dispatch(ListingsByAreaCodes(selectedOption));
      setSearchPressed(true);
    } else {
      setSearchPressed(false);
    }
  };

  const renderAllListings = () => {
    return (
      <FlatList
        data={listings}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={
                index !== 7 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lightgray,
                  marginBottom: hp('2.5%'),
                }
              }>
              <ListingCard
                key={item.id}
                number={index + 1}
                title={item.listing_title}
                image={
                  item.feature_image
                    ? {
                        uri: item.feature_image,
                        priority: FastImage.priority.high,
                      }
                    : images.dummy
                }
                // descStyle={{ width: index == 0 ? '20%' : index == 1 ? '40%' : '100%' }}
                count={
                  item.how_many_players == 'Select a Value'
                    ? '3'
                    : item.how_many_players
                }
                exp={
                  item.experience_level == ''
                    ? '5 to 10 par progress-level'
                    : item.experience_level
                }
                date={item.course_date}
                // descStyle={{top: Object.keys(item.listing_title).length > 13 ? hp('10%') : null}}
                desc={item.match_description}
                // image={item.image}
                onPress={() =>
                  navigation.navigate('SecondaryStack', {
                    screen: 'ListingDetails',
                    params: {item},
                  })
                }
              />
            </View>
          );
        }}
      />
    );
  };

  const renderFilterListings = () => {
    return listings_filter_loader
      ? renderFilterLoader()
      : listings_filter?.message
      ? renderFilterMessage()
      : listings_filter?.map((item, index) => (
          <View
            key={index}
            style={
              index !== 7 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.lightgray,
                marginBottom: hp('2.5%'),
              }
            }>
            <ListingCard
              key={item.id}
              number={index + 1}
              title={item.listing_title}
              // descStyle={{ width: index == 0 ? '20%' : index == 1 ? '40%' : '100%' }}
              count={
                item.how_many_players == 'Select a Value'
                  ? '3'
                  : item.how_many_players
              }
              exp={
                item.experience_level == ''
                  ? '5 to 10 par progress-level'
                  : item.experience_level
              }
              date={item.course_date}
              desc={item.match_description}
              image={
                item.feature_image
                  ? {uri: item.feature_image, priority: FastImage.priority.high}
                  : images.dummy
              }
              onPress={() =>
                navigation.navigate('SecondaryStack', {
                  screen: 'ListingDetails',
                  params: {item},
                })
              }
            />
          </View>
        ));
  };

  const renderFilterLoader = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('2%')}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderFilterMessage = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('2%')}}>
        <Text
          style={{color: colors.white, fontWeight: 'bold', fontSize: hp('2%')}}>
          {listings_filter?.message}
        </Text>
      </View>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        dispatch(getListings(setListings));
        dispatch(getAllAreaCodes());
      } catch (error) {
        console.log('refreshing data error =====>', error);
        return ShowToast('Some problem occured');
      } finally {
        setRefreshing(false);
      }
    }, 3000);
  };

  return (
    <>
      <AppStatusBar />
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => handleRefresh()}
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
            />
          }>
          <View style={styles.headerWrapper}>
            <Header />
          </View>
          <Video
            source={require('../../assets/video/homeVideo.mp4')}
            style={[styles.backgroundVideo, {width: width}]}
            resizeMode={'cover'}
            repeat
            paused={false}
          />
          <View style={styles.videoBackground} />
          <View style={styles.logoWrapper}>
            {/* <Image
              source={images.logo}
              style={styles.logoStyle}
            /> */}
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>THE PLACE FOR GOLFERS</Text>
            <Text style={styles.message}>
              Of All Skills Level To Find Each Other
            </Text>
          </View>
          <View style={{padding: hp('2%')}}>
            <View style={styles.border}>
              <Text style={styles.textStyle}>Area Code</Text>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={selectedOption}
                  dropdownIconColor={colors.white}
                  style={{color: colors.white, borderColor: 'red'}}
                  itemStyle={{color: 'white', fontWeight: 'bold'}}
                  numberOfLines={1}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedOption(itemValue)
                  }>
                  <Picker.Item
                    label="Select"
                    value={null}
                    style={{color: colors.secondary}}
                  />
                  {area_codes?.map((item, ind) => (
                    <Picker.Item
                      key={ind}
                      label={item}
                      value={item}
                      style={{color: colors.secondary}}
                    />
                  ))}
                </Picker>
              </View>
              <Button
                buttonText={'Search'}
                icon={true}
                onPress={() => onSearchAreaCode()}
              />
            </View>
            <Sponsors />
            <Text style={styles.text}>Listing</Text>
            <View style={styles.cardWrapper}>
              {searchPressed ? renderFilterListings() : renderAllListings()}
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Listing')}>
              <ArrowDown name={'arrow-down'} color={colors.white} size={24} />
            </TouchableOpacity>
            <View style={{paddingTop: hp('5%')}}>
              <Image source={images.home2} style={styles.golfImage} />
              {/* <Text style={styles.heading}>Listing</Text> */}
            </View>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    height: hp('88%'),
    width: '100%',
  },
  headerWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    width: '70%',
    fontSize: hp('4%'),
  },
  message: {
    color: colors.white,
    marginTop: hp('2%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
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
    marginTop: hp('7%'),
  },
  wrapper: {
    paddingTop: hp('3%'),
    marginLeft: hp('1%'),
  },
  cardWrapper: {
    paddingTop: hp('5%'),
  },
  button: {
    backgroundColor: colors.gray,
    padding: hp('2%'),
    borderRadius: 5,
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  golfImage: {
    height: hp('35%'),
    width: hp('38%'),
    alignSelf: 'center',
  },
  backgroundVideo: {
    height: hp('100%'),
  },
  videoBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
});
