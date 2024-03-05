import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SecondaryHeader from '../../components/SecondaryHeader';
import ListingDetailCard from '../../components/ListingDetailCard';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import Sponsors from '../../components/Sponsors';
import SearchFilter from '../../components/SearchFilter';
import {ListingsByAreaCodes} from '../../redux/actions/homeAction';
import colors from '../../assets/colors';

const Listing = () => {
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchPressed, setSearchPressed] = useState(false);

  const navigation = useNavigation();
  console.log('lets see', navigation.getState().routes[1].name);
  const routeName = navigation.getState().routes[1].name;

  const {listing, loader, listings_filter, listings_filter_loader} = useSelector(
    state => state.HomeReducer,
  );


  const dispatch = useDispatch();

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
        data={listing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{padding: hp('2.5%')}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <ListingDetailCard
            // image={item.image}
            route={routeName}
            total={index + 1}
            title={
              Object.keys(item.listing_title).length > 13
                ? 'New Listing'
                : item.listing_title
            }
            desc={
              Object.keys(item.match_description).length == 4
                ? item.match_description
                : 'test'
            }
            date={item.course_date}
            time={item.course_time == '' ? '23:28' : item.course_time}
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
            // image={item.image}
            route={routeName}
            total={index + 1}
            title={
              Object.keys(item.listing_title).length > 13
                ? 'New Listing'
                : item.listing_title
            }
            desc={
              Object.keys(item.match_description).length == 4
                ? item.match_description
                : 'test'
            }
            date={item.course_date}
            time={item.course_time == '' ? '23:28' : item.course_time}
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

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.screen}>
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
