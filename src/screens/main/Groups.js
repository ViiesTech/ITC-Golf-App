import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListingDetailCard from '../../components/ListingDetailCard';
import {useDispatch, useSelector} from 'react-redux';
import {GroupsByAreaCodes, getGroups} from '../../redux/actions/homeAction';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import SearchFilter from '../../components/SearchFilter';
import Sponsors from '../../components/Sponsors';
import images from '../../assets/images';

const Groups = () => {
  const navigation = useNavigation();
  const [selectedCode, setSelectedCode] = useState(null);

  const {
    group_loader,
    groups,
    groups_filter,
    filter_loading,
    groups_filter_message,
    area_codes,
  } = useSelector(state => state.HomeReducer);
  // console.log('from group screen =============>', selectedCode);

  const routeName = navigation.getState().routes[3].name;

  const dispatch = useDispatch();

  useEffect(() => {
    if (groups.length < 1) {
      dispatch(getGroups());
    }
  }, []);

  // useEffect(() => {
  //   if (selectedCode != null) {
  //     // alert('wah');
  //     dispatch(GroupsByAreaCodes(selectedCode));
  //   }
  // }, [selectedCode]);

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
          {groups_filter_message}
        </Text>
      </View>
    );
  };

  const renderFilterGroups = () => {
    return (
      <>
        {filter_loading ? (
          renderFilterLoader()
        ) : groups_filter.length == 32 || groups_filter.length < 1 ? (
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
                  image={{uri: item.featured_image_url}}
                  title={item.listing_title}
                  desc={
                    item.group_desired_teebox == ''
                      ? 'All Other'
                      : item.group_desired_teebox
                  }
                  date={
                    item.suggested_day == '02/18/24'
                      ? item.suggested_day
                      : '02/18/24'
                  }
                  area={item.area_code}
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
            image={images.listing3}
            title={item.listing_title}
            desc={
              item.group_desired_teebox == ''
                ? 'All Other'
                : item.group_desired_teebox
            }
            date={
              item.suggested_day == '02/18/24' ? item.suggested_day : '02/18/24'
            }
            area={item.area_code}
          />
        )}
      />
    );
  };

  const onAreaCodeSearch = () => {
    if (selectedCode != null) {
      // alert('wah');
      dispatch(GroupsByAreaCodes(selectedCode));
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.screen}>
        <SearchFilter
          selectedValue={selectedCode}
          onValueChange={itemValue => setSelectedCode(itemValue)}
          onSearchPress={() => onAreaCodeSearch()}
        />
        <SecondaryHeader text={'Groups'} style={{paddingTop: hp('5%')}} />
        {selectedCode ? renderFilterGroups() : renderAllGroups()}
        <Sponsors />
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
