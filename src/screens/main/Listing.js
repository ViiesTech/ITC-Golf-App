import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SecondaryHeader from '../../components/SecondaryHeader';
import ListingDetailCard from '../../components/ListingDetailCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Sponsors from '../../components/Sponsors';
import SearchFilter from '../../components/SearchFilter';
import {getListings, ListingsByAreaCodes} from '../../redux/actions/homeAction';
import colors from '../../assets/colors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {timeFormatting} from '../../utils/HelperFunctions';
import {ShowToast} from '../../Custom';

const Listing = () => {
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchPressed, setSearchPressed] = useState(false);
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  // console.log('lets see', navigation.getState().routes[1].name);
  const routeName = navigation.getState().routes[1].name;

  const {loader, listings_filter, listings_filter_loader} = useSelector(
    state => state.HomeReducer,
  );

  const dispatch = useDispatch();

  // console.log('filtered resultsss ======>', typeof moment(new Date()).format('MM/DD/YY'))

  useEffect(() => {
    dispatch(getListings(setListings));
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

  const onSearchButton = () => {
    if (selectedCode) {
      dispatch(ListingsByAreaCodes(selectedCode));
      setSearchPressed(true);
    } else {
      setSearchPressed(false);
    }
  };

  const renderAllListings = () => {
    return (
      <FlatList
        data={listings}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{padding: hp('2.5%')}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <ListingDetailCard
            listingImage={
              item.feature_image
                ? {uri: item.feature_image, priority: FastImage.priority.high}
                : images.dummy
            }
            route={routeName}
            total={index + 1}
            title={item.listing_title}
            desc={item.match_description}
            // date={item.course_date}
            name={item.author_name}
            time={timeFormatting(item.course_time)}
            exp={
              item.experience_level == ''
                ? '5 to 10 par progress level'
                : item.experience_level
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'ListingDetails',
                params: {item},
              })
            }
          />
        )}
      />
    );
  };

  const renderLoader = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('3%')}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: hp('3%')}}>
        <Text
          style={{color: colors.white, fontSize: hp('2%'), fontWeight: 'bold'}}>
          {listings_filter?.message}
        </Text>
      </View>
    );
  };

  const renderFilterListings = () => {
    return listings_filter_loader ? (
      renderLoader()
    ) : listings_filter?.message ? (
      renderMessage()
    ) : (
      <FlatList
        data={listings_filter}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{padding: hp('2.5%')}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <ListingDetailCard
            listingImage={
              item.feature_image
                ? {uri: item.feature_image, priority: FastImage.priority.high}
                : images.dummy
            }
            route={routeName}
            total={index + 1}
            title={item.listing_title}
            desc={item.match_description}
            // date={item.course_date}
            name={item.author_name}
            time={timeFormatting(item.course_time)}
            exp={
              item.experience_level == ''
                ? '5 to 10 par progress level'
                : item.experience_level
            }
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'ListingDetails',
                params: {item},
              })
            }
          />
        )}
      />
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        await dispatch(getListings(setListings));
      } catch (error) {
        console.log('refreshing data error =====>', error);
        return ShowToast('Some problem occured');
      } finally {
        setRefreshing(false);
      }
    }, 3000);
  };

  return (
    <Container>
      <Header />
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }>
        <SearchFilter
          selectedValue={selectedCode}
          onValueChange={value => setSelectedCode(value)}
          onSearchPress={() => onSearchButton()}
        />
        <SecondaryHeader text={'Listing'} style={{paddingTop: hp('5%')}} />
        {searchPressed ? renderFilterListings() : renderAllListings()}
        <Sponsors />
      </ScrollView>
    </Container>
  );
};

export default Listing;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('2%'),
  },
});
