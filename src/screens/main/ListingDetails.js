import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import images from '../../assets/images';
import PersonalInfoTab from '../../components/PersonalInfoTab';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../Custom';
import {
  getListingDetailById,
  getListingStatus,
  JoinListing,
} from '../../redux/actions/listingAction';
import constant from '../../redux/constant';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {timeFormatting} from '../../utils/HelperFunctions';

const ListingDetails = ({route}) => {
  const [listingStatus, setListingStatus] = useState(null);
  const [listingDetail, setListingDetail] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector(state => state.AuthReducer);
  const {listing_detail_loader} = useSelector(state => state.ListingReducer);
  console.log('android user', user.user_id);
  const {join_loading} = useSelector(state => state.ListingReducer);

  const {id,type} = route?.params;
  // console.log('id',id) 

  useEffect(() => {
    dispatch(getListingStatus(user.user_id, id, setListingStatus));
    dispatch(getListingDetailById(id, setListingDetail));
  }, []);

  console.log('listing detail =======>', listingDetail);
  console.log('listing status =======>', listingStatus);

  const onHyperLink = async link => {
    if (link == '') {
      return ShowToast('link not found');
    } else {
      // const supported = await Linking.canOpenURL(link);
      // if (supported) {
        // alert('haha');
        await Linking.openURL(link);
      // } else {
        // return ShowToast('Invalid url');
      // }
    }
  };

  const onJoin = async () => {
    const res = await dispatch(
      JoinListing(
        user.user_id,
        listingDetail.author_id,
        listingDetail.listing_id,
        listingDetail.author_email,
        `${user?.username} wants to join your listing`,
      ),
    );

    if (res.success) {
      setListingStatus(res.status);
      dispatch({
        type: constant.JOIN_LISTING_DONE,
      });
      return ShowToast(res.message);
    } else {
      return ShowToast(res.message);
    }
  };

  return (
    <Container>
      {listing_detail_loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <>
          <Header />
          <SecondaryHeader
            text={listingDetail.listing_title}
            link={true}
            onLinkPress={() => onHyperLink(listingDetail.hyper_link)}
          />
          <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.tabView}>
              <PersonalInfoTab
                text={'Personal Information'}
                onPress={() => setChangeTab(item.id)}
              />
            </View>
            <>
              <View style={{paddingTop: hp('10%')}}>
                <View style={styles.headingView}>
                  <View style={{flexDirection: 'row'}}>
                    <FastImage
                      source={
                        listingDetail.feature_image
                          ? {
                              uri: listingDetail.feature_image,
                              priority: FastImage.priority.high,
                            }
                          : images.dummy
                      }
                      resizeMode={FastImage.resizeMode.cover}
                      style={styles.image}
                    />
                    <Text
                      style={styles.name}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {listingDetail.listing_title}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.formWrapper}>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>MATCH DESCRIPTION:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.match_description || ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>AREA CODE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>{listingDetail.area_code_match || ''}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>PRIVATE GROUP:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.private_group === 'true' ? 'Yes' : 'No' || ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>EXPERIENCE LEVEL:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.experience_level ? listingDetail.experience_level : ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>SUGGESTED DAY:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.course_date ? listingDetail.course_date : ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>SUGGESTED TIME:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {timeFormatting(listingDetail.course_time)}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>HOW MANY PLAYERS:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.how_many_players ? listingDetail.how_many_players : ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>THE ITC HANDSHAKE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.the_itc_handshake ? listingDetail.the_itc_handshake : ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>SMOKING FRIENDLY:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.smoking_friendly === 'true' ? 'Yes' : 'No' || ''}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.heading}>DRINKING FRIENDLY:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {listingDetail.drinking_friendly === 'true' ? 'Yes' : 'No' || ''}
                  </Text>
                </View>
              </View>
              {listingStatus?.data?.accept_or_not === '1' ||
              type === 'my listings' ||
              listingDetail.author_id == user.user_id ||
              listingDetail.private_group === 'off' ? (
                <Button
                  buttonText={'Go to chat'}
                  buttonStyle={styles.button}
                  textStyle={{color: colors.secondary}}
                  onPress={() => {
                    navigation.navigate('SecondaryStack', {
                      screen: 'GroupChat',
                      params: {
                        title: listingDetail.listing_title,
                        type: 'listing',
                        listing_id: listing_id,
                      },
                    });
                  }}
                />
              ) : (
                <Button
                  buttonText={
                    listingStatus === 'pending' ||
                    listingStatus?.data?.accept_or_not === '0'
                      ? 'Pending'
                      : 'Join Listing'
                  }
                  buttonStyle={styles.button}
                  disable={
                    listingStatus === 'pending' ||
                    listingStatus?.data?.accept_or_not === '0'
                      ? true
                      : false
                  }
                  textStyle={{color: colors.secondary}}
                  indicator={join_loading}
                  onPress={() => onJoin()}
                />
              )}
            </>
            <>
              <SVGImage image={icons.pageEnd} style={{alignSelf: 'center'}} />
            </>
          </ScrollView>
        </>
      )}
    </Container>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
  },
  headingView: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    padding: hp('2%'),
  },
  image: {
    height: hp('15%'),
    width: hp('15%'),
    position: 'absolute',
    borderRadius: 100,
    left: hp('2%'),
    top: hp('-6.5%'),
  },
  name: {
    color: colors.white,
    marginLeft: hp(20),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
    paddingLeft: hp('1%'),
  },
  heading: {
    color: colors.white,
    fontSize: hp('1.9%'),
    width: '40%',
    marginBottom: hp('7%'),
    fontWeight: 'bold',
  },
  formWrapper: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('9%'),
  },
  line: {
    width: 1.1,
    backgroundColor: colors.gray,
  },
  text: {
    color: colors.lightgray,
    marginBottom: hp('7%'),
    width: '40%',
    fontSize: hp('1.9%'),
  },
  review: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.4%'),
  },
  inactive: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  active: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    borderWidth: 0,
  },
  button: {
    width: hp('21%'),
    borderRadius: 50,
  },
  reviewStyle: {
    backgroundColor: colors.gray,
    marginTop: hp('4%'),
    borderWidth: 0.6,
    borderColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
  },
  reviewHeading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  buttonStyle: {
    borderRadius: 100,
    marginBottom: hp('1%'),
    width: hp('24%'),
  },
  detailContainer: {
    flexDirection: 'row',
    width: hp('43%'),
    flex: 0.9,
    justifyContent: 'space-between',
  },
});
