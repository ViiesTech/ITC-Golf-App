import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
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

const ListingDetails = ({route}) => {
  const [changeTab, setChangeTab] = useState(1);

  const dispatch = useDispatch();

  const {reviews, reviews_loading} = useSelector(state => state.HomeReducer);
  console.log('reviews response from screen ===============>', reviews);

  useEffect(() => {
    if (changeTab == 3 && reviews.length < 1) {
      dispatch(getReviews());
    }
  }, [changeTab]);

  const {item} = route.params;
  console.log(
    'paramsssss ================>',
    Object.keys(item.match_description).length,
  );

  return (
    <Container>
      <Header />
      <SecondaryHeader
        text={
          Object.keys(item.listing_title).length == 13
            ? item.listing_title
            : 'New Listing'
        }
        link={true}
      />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.tabView}>
          {Tabs.map(item => (
            <PersonalInfoTab
              text={item.text}
              style={
                changeTab == item.id
                  ? [
                      styles.active,
                      {
                        width: item.id == 2 ? '40%' : '44%',
                      },
                    ]
                  : [styles.inactive, {width: item.id == 1 ? '44%' : '40%'}]
              }
              onPress={() => setChangeTab(item.id)}
              textStyle={changeTab == item.id && {marginTop: hp('0.3%')}}
            />
          ))}
        </View>
        {changeTab == 1 ? (
          <>
            <View style={{paddingTop: hp('10%')}}>
              <View style={styles.headingView}>
                <Image source={images.personal1} style={styles.image} />
                <Text style={styles.name}>
                  {Object.keys(item.listing_title).length == 13
                    ? item.listing_title
                    : 'New Listing'}
                </Text>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <View>
                <Text style={styles.heading}>MATCH DESCRIPTION:</Text>
                <Text style={styles.heading}>SMOKING FRIENDLY:</Text>
                <Text style={styles.heading}>DRINKING FRIENDLY:</Text>
                <Text style={styles.heading}>AREA CODE:</Text>
                <Text style={styles.heading}>PRIVATE GROUP:</Text>
                <Text style={styles.heading}>EXPERIENCE LEVEL:</Text>
                <View style={{paddingTop: hp('3%')}}>
                  <Text style={styles.heading}>SUGGESTED DAY:</Text>
                  <Text style={styles.heading}>SUGGESTED TIME:</Text>
                  <Text style={styles.heading}>HOW MANY PLAYERS:</Text>
                  <Text style={styles.heading}>THE ITC HANDSHAKE:</Text>
                  <Button
                    buttonText={'Join Listing'}
                    buttonStyle={styles.button}
                    textStyle={{color: colors.secondary}}
                    onPress={() => alert('working in progress')}
                  />
                </View>
              </View>
              <View>
                <View style={styles.line} />
                <View
                  style={[
                    styles.line,
                    {marginTop: hp('5.5%'), height: hp('32%')},
                  ]}
                />
              </View>
              <View>
                <Text style={styles.text}>
                  {Object.keys(item.match_description).length == 4
                    ? item.match_description
                    : 'test'}
                </Text>
                <Text style={styles.text}>
                  {item.smoking_friendly == '' ? 'on' : item.smoking_friendly}
                </Text>
                <Text style={styles.text}>
                  {item.drinking_friendly == '' ? 'on' : item.drinking_friendly}
                </Text>
                <Text style={styles.text}>
                  {item.area_code_match == '' ? '214' : item.area_code_match}
                </Text>
                <Text style={styles.text}>
                  {item.private_group == '' ? 'on' : item.private_group}
                </Text>
                <Text style={[styles.text, {width: '50%'}]}>
                  {item.experience_level == ''
                    ? '5 to 10 par progress level'
                    : item.experience_level}
                </Text>
                <Text style={[styles.text, {marginTop: hp('2.5%')}]}>
                  {item.course_date}
                </Text>
                <Text style={styles.text}>{item.course_time}</Text>
                <Text style={styles.text}>
                  {item.how_many_players == 'Select a Value'
                    ? '3'
                    : item.how_many_players}
                </Text>
                <Text style={[styles.text, {width: '50%'}]}>
                  {item.the_itc_handshake == ''
                    ? 'CASUAL HANDSHAKE'
                    : item.the_itc_handshake}
                </Text>
              </View>
            </View>
          </>
        ) 
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
        : (
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
    padding: hp('2%'),
    borderRadius: 10,
  },
  image: {
    height: hp('15%'),
    position: 'absolute',
    marginLeft: hp('3%'),
    top: hp('-4%'),
    width: hp('15%'),
  },
  name: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginRight: hp('8%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
    // justifyContent: 'space-between',
    paddingLeft: hp('1%'),
    flexDirection: 'row',
  },
  heading: {
    color: colors.white,
    fontSize: hp('1.8%'),
    marginBottom: hp('6%'),
    fontWeight: 'bold',
  },
  formWrapper: {
    paddingTop: hp('11%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 1.1,
    backgroundColor: colors.gray,
    marginLeft: hp('5%'),
    height: hp('48%'),
  },
  text: {
    color: colors.lightgray,
    fontSize: hp('1.6%'),
    marginBottom: hp('6%'),
    marginLeft: hp('3.5%'),
    marginTop: hp('0.1%'),
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
    borderWidth: 0,
  },
  button: {
    marginTop: hp('4%'),
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
});
