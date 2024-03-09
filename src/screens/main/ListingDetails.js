import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
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
import {ReviewImages, Tabs, postReviewText} from '../../DummyData';
import ReviewCard from '../../components/ReviewCard';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getReviews} from '../../redux/actions/homeAction';
import PostReview from '../../components/PostReview';
import {ShowToast} from '../../Custom';
import {JoinListing} from '../../redux/actions/listingAction';
import constant from '../../redux/constant';
import {useNavigation} from '@react-navigation/native';

const ListingDetails = ({route}) => {
  const [changeTab, setChangeTab] = useState(1);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // console.log('kiaaa',navigation.getState().index)

  const {reviews, reviews_loading, listing} = useSelector(
    state => state.HomeReducer,
  );
  const {user} = useSelector(state => state.AuthReducer);
  const {join_loading} = useSelector(state => state.ListingReducer);

  useEffect(() => {
    if (changeTab == 3 && reviews.length < 1) {
      dispatch(getReviews());
    }
  }, [changeTab]);

  const {item, type} = route?.params;

  const itemStatus = useSelector(
    state => state?.ListingReducer[item.listing_id] || 'Unknown',
  );
  console.log('acha',itemStatus);

  console.log(
    'reviews response from screen ===============>',
    Object.keys(item.match_description).length,
  );

  console.log(
    'paramsssss ================>',
    Object.keys(item.match_description).length,
  );

  console.log('navigation', type);

  const onHyperLink = async link => {
    if (link == '') {
      return ShowToast('Hyperlink not found');
    } else {
      await Linking.openURL(link);
    }
  };

  const onJoin = async () => {
    const res = await dispatch(
      JoinListing(
        user.user_id,
        item.author_id,
        item.listing_id,
        item.author_email,
        'wants to join you',
      ),
    );

    if (res.success) {
      dispatch({
        type: constant.JOIN_LISTING_DONE,
        payload: {listingId: item.listing_id, status: res.status},
      });
      return ShowToast(res.message);
    } else {
      return ShowToast(res.message);
    }
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader
        headerStyle={{
          width: Object.keys(item.listing_title).length > 13 && hp('25%'),
        }}
        text={item.listing_title}
        link={true}
        onLinkPress={() => onHyperLink(item.hyper_link)}
        linkButton={{
          width:
            Object.keys(item.listing_title).length > 13 ? hp('10%') : hp('14%'),
        }}
      />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.tabView}>
          {Tabs.map(item => (
            <PersonalInfoTab
              text={item.text}
              // style={
              //   changeTab == item.id
              //     ? [
              //         styles.active,
              //         {
              //           width: item.id == 2 ? '40%' : '44%',
              //         },
              //       ]
              //     : [styles.inactive, {width: item.id == 1 ? '44%' : '40%'}]
              // }
              onPress={() => setChangeTab(item.id)}
              // textStyle={changeTab == item.id && {marginTop: hp('0.3%')}}
            />
          ))}
        </View>
        {changeTab == 1 ? (
          <>
            <View style={{paddingTop: hp('10%')}}>
              <View style={styles.imageContainer}>
                <View style={styles.headingView}>
                  <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.listing_title}
                  </Text>
                </View>
                <Image source={item.feature_image ? {uri:item.feature_image} : images.listing2} style={styles.image} borderRadius={100}/>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>MATCH DESCRIPTION:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>{item.match_description || ''}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>AREA CODE:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>{item.area_code_match || ''}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>PRIVATE GROUP:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.private_group
                    ? 'on'
                    : (item.private_group && 'off') || ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>EXPERIENCE LEVEL:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.experience_level ? item.experience_level : ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>SUGGESTED DAY:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.course_date ? item.course_date : ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>SUGGESTED TIME:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.course_time ? item.course_time : ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>HOW MANY PLAYERS:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.how_many_players ? item.how_many_players : ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>THE ITC HANDSHAKE:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.the_itc_handshake ? item.the_itc_handshake : ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>SMOKING FRIENDLY:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.smoking_friendly
                    ? 'on'
                    : (item.smoking_friendly && 'off') || ''}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.heading}>DRINKING FRIENDLY:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  {item.drinking_friendly
                    ? 'on'
                    : (item.drinking_friendly && 'off') || ''}
                </Text>
              </View>
            </View>
            {itemStatus === 'accepted' || type === 'my listings' || item.author_id == user.user_id  || item.private_group === 'off' ? (
              <Button
                buttonText={'Go to chat'}
                buttonStyle={styles.button}
                textStyle={{color: colors.secondary}}
                onPress={() =>
                  navigation.navigate('SecondaryStack', {
                    screen: 'GroupChat',
                    params: {title: item.listing_title},
                  })
                }
              />
            ) : (
              <Button
                buttonText={
                  itemStatus === 'Unknown' ? 'Join Listing' : itemStatus
                }
                buttonStyle={styles.button}
                disable={itemStatus === 'pending' ? true : false}
                textStyle={{color: colors.secondary}}
                indicator={join_loading}
                onPress={() => onJoin()}
              />
            )}
          </>
        ) : (
          // : changeTab == 2 ? (
          //   <View style={styles.reviewStyle}>
          //     <Text style={styles.reviewHeading}>POST A REVIEW</Text>
          //     <View style={{paddingTop: hp('3%')}}>
          //       {postReviewText.map(item => (
          //         <PostReview text={item.text} />
          //       ))}
          //     </View>
          //     <View style={{paddingTop: hp('1%')}}>
          //       <Button
          //         buttonText={'Post a review'}
          //         onPress={() => alert('working in progress')}
          //         buttonStyle={styles.buttonStyle}
          //       />
          //     </View>
          //   </View>
          // )
          <>
            <ScrollView
              contentContainerStyle={{
                paddingTop: hp('5%'),
                paddingBottom: hp('10%'),
              }}>
              <Text style={styles.review}>Reviews</Text>
              {changeTab == 3 && reviews_loading ? (
                <View style={{alignItems: 'center', marginVertical: hp('6%')}}>
                  <ActivityIndicator size={'large'} color={colors.primary} />
                </View>
              ) : (
                <View style={{paddingTop: hp('3%')}}>
                  <FlatList
                    data={reviews}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={({item, index}) => (
                      <ReviewCard
                        image={images.review1}
                        name={item.reviews_title}
                        ratings={item}
                      />
                    )}
                  />
                </View>
              )}
              <SVGImage image={icons.pageEnd} style={{alignSelf: 'center'}} />
            </ScrollView>
          </>
        )}
      </ScrollView>
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
    alignItems: 'center',
    flex: 1,
    // marginLeft: hp('10%'),
  },
  image: {
    // height: hp('15%'),
    // position: 'absolute',
    // marginLeft: hp('3%'),
    // top: hp('-4%'),
    height: hp('15%'),
    width: hp('15%'),
    position: 'absolute',
    left: hp('2%'),
    top: hp('-4%'),
  },
  name: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginRight: hp('1%'),
    width: hp('22%'),
    // flex: 1,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
    // justifyContent: 'space-between',
    paddingLeft: hp('1%'),
    // flexDirection: 'row',
  },
  heading: {
    color: colors.white,
    fontSize: hp('1.9%'),
    width: '40%',
    marginBottom: hp('7%'),
    fontWeight: 'bold',
  },
  formWrapper: {
    // paddingTop: hp('11%'),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('9%'),
  },
  line: {
    width: 1.1,
    backgroundColor: colors.gray,
    // marginLeft: hp('5%'),
    // height: hp('90%'),
  },
  text: {
    color: colors.lightgray,
    marginBottom: hp('7%'),
    width: '40%',
    // backgroundColor: 'green',
    fontSize: hp('1.9%'),
    // marginLeft: hp('3.5%'),
    // marginTop: hp('0.2%'),
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
    // width: hp('30%'),
    alignSelf: 'center',
    borderWidth: 0,
  },
  button: {
    // marginTop: hp('4%'),
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
    // backgroundColor: 'red',
    width: hp('43%'),
    flex: 0.9,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
});
