import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListingDetailCard from '../../components/ListingDetailCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  FilterAdsByAreaCode,
  GetAds,
  GroupsByAreaCodes,
  getGroups,
} from '../../redux/actions/homeAction';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import SearchFilter from '../../components/SearchFilter';
import Sponsors from '../../components/Sponsors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {ShowToast} from '../../Custom';

const Groups = () => {
  const navigation = useNavigation();
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchPressed, setSearchPressed] = useState(false);
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ads, setAds] = useState([]);

  const {group_loader, groups_filter, filter_loading} = useSelector(
    state => state.HomeReducer,
  );
  // console.log('from group screen =============>', groups_filter);

  const routeName = navigation.getState().routes[3].name;

  const dispatch = useDispatch();

  useEffect(() => {
    // if (groups.length < 1) {
    dispatch(getGroups(setGroups));
    dispatch(GetAds(setAds));
    // }
  }, []);

  if (group_loader) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.secondary,
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  const renderFilterLoader = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            fontWeight: 'bold',
            marginBottom: hp('5%'),
            fontSize: hp('2%'),
          }}>
          {groups_filter?.message}
        </Text>
      </View>
    );
  };

  const renderFilterGroups = () => {
    return (
      <>
        {filter_loading ? (
          renderFilterLoader()
        ) : groups_filter.message ? (
          renderMessage()
        ) : (
          <FlatList
            data={groups_filter}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: hp('2.5%')}}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item, index}) => {
              // console.log('filterrrrr', groups_filter);
              return (
                <ListingDetailCard
                  hideTag
                  route={routeName}
                  count={index + 1}
                  image={
                    item.featured_image_url == false
                      ? images.dummy
                      : {uri: item.featured_image_url}
                  }
                  title={item.listing_title}
                  desc={
                    item.group_desired_teebox == ''
                      ? 'Select'
                      : item.group_desired_teebox
                  }
                  // date={timeFormatting(item.suggested_day)}
                  name={item.author_name}
                  area={item.area_code}
                  onPress={() =>
                    navigation.navigate('SecondaryStack', {
                      screen: 'GroupDetail',
                      params: {id: item.group_id}
                    })
                  }
                />
              );
            }}
          />
        )}
      </>
    );
  };

  const renderAllGroups = () => {
    return (
      <FlatList
        data={groups}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: hp('2.5%')}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <ListingDetailCard
            hideTag
            route={routeName}
            count={index + 1}
            image={
              item.feature_image
                ? {uri: item.feature_image, priority: FastImage.priority.high}
                : images.dummy
            }
            title={item.listing_title}
            desc={
              item.group_desired_teebox == ''
                ? 'Select'
                : item.group_desired_teebox
            }
            name={item.author_name}
            area={item.area_code}
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'GroupDetail',
                params: {id: item.group_id},
              })
            }
          />
        )}
      />
    );
  };

  const onAreaCodeSearch = () => {
    if (selectedCode != null) {
      // alert('wah');
      dispatch(GroupsByAreaCodes(selectedCode));
      dispatch(FilterAdsByAreaCode(selectedCode, setAds));
      setSearchPressed(true);
    } else {
      setSearchPressed(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        dispatch(GetAds(setAds));
        await dispatch(getGroups(setGroups));
      } catch (error) {
        console.log('refreshing error ===>', error);
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
            onRefresh={() => handleRefresh()}
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
          />
        }>
        <SearchFilter
          selectedValue={selectedCode}
          onValueChange={itemValue => setSelectedCode(itemValue)}
          onSearchPress={() => onAreaCodeSearch()}
        />
        <View style={{paddingTop: hp(3)}}>
          {filter_loading
            ? renderFilterLoader()
            : ads?.data?.map((item, ind) => {
                return (
                  <Sponsors
                    image={{uri: item.image}}
                    title={item.title}
                    key={ind}
                  />
                );
              })}
        </View>
        <SecondaryHeader text={'Groups'} />
        {searchPressed ? renderFilterGroups() : renderAllGroups()}
      </ScrollView>
    </Container>
  );
};

export default Groups;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('2%'),
  },
});
