import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PersonalInfoTab from '../../components/PersonalInfoTab';
import {Tabs, postReviewText} from '../../DummyData';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';
import Button from '../../components/Button';
import PostReview from '../../components/PostReview';
import ReviewCard from '../../components/ReviewCard';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews} from '../../redux/actions/homeAction';

const GroupDetail = ({route}) => {
  const [changeTab, setChangeTab] = useState(1);

  const {reviews, reviews_loading} = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();

  const {item} = route.params;
  console.log('detail ======>', item);

  useEffect(() => {
    if (changeTab == 3 && reviews.length < 1) {
      dispatch(getReviews());
    }
  }, [changeTab]);

  return (
    <Container>
      <Header />
      <SecondaryHeader text={item.listing_title} link={true} />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.tabView}>
          {Tabs.map(item => (
            <PersonalInfoTab
              text={item.id == 2 ? 'Player Reviews' : item.text}
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
            <View style={styles.detailView}>
              <View style={styles.headingView}>
                <Image source={images.personal1} style={styles.image} />
                <Text style={styles.name}>{item.listing_title}</Text>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <View>
                <Text style={styles.heading}>DESCRIPTION:</Text>
                <Text style={styles.heading}>GROUPER'S NAME:</Text>
                <Text style={styles.heading}>AREA CODE:</Text>
                <Text style={styles.heading}>ITC GROUP HANDSHAKE:</Text>
                <Text style={styles.heading}>DESIRED TEE BOX:</Text>
                <Text style={styles.heading}>WHAT KIND OF MATCH IS THIS:</Text>
                <Text style={styles.heading}>SUGGESTED DAY:</Text>
                <Text style={styles.heading}>IS THIS A PRIVATE GROUP:</Text>
                <Button
                  buttonText={'Join Group'}
                  buttonStyle={styles.button}
                  textStyle={{color: colors.secondary}}
                  onPress={() => alert('working in progress')}
                />
              </View>
              <View style={styles.line} />
              <View>
                <Text style={styles.text}>{}</Text>
                <Text style={styles.text}>{}</Text>
                <Text style={styles.text}>{item.area_code}</Text>
                <Text style={styles.text}>{item.itc_group_handshake}</Text>
                <Text style={styles.text}>{item.group_desired_teebox}</Text>
                <Text style={[styles.text, {width: '50%'}]}>
                  {item.what_kind_of_match_is_this}
                </Text>
                <Text style={styles.text}>{item.suggested_day}</Text>
                <Text style={styles.text}>
                  {item.private_group == 'on' ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
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
            <View style={{paddingTop: hp('3%')}}>
              {changeTab == 3 && reviews_loading ? (
                <View style={{alignItems: 'center', marginVertical: hp('6%')}}>
                  <ActivityIndicator size={'large'} color={colors.primary} />
                </View>
              ) : (
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
              )}
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
    paddingLeft: hp('1%'),
    flexDirection: 'row',
  },
  active: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  detailView: {
    paddingTop: hp('7%'),
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
  formWrapper: {
    paddingTop: hp('11%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: colors.white,
    fontSize: hp('1.8%'),
    marginBottom: hp('6%'),
    fontWeight: 'bold',
  },
  button: {
    marginTop: hp('1%'),
    borderRadius: 50,
  },
  line: {
    width: 1.1,
    backgroundColor: colors.gray,
    marginLeft: hp('5%'),
    height: hp('64%'),
  },
  text: {
    color: colors.lightgray,
    fontSize: hp('1.6%'),
    marginBottom: hp('6%'),
    marginLeft: hp('3.5%'),
    marginTop: hp('0.1%'),
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
