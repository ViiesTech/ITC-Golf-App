import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import colors from '../../assets/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PersonalInfoTab from '../../components/PersonalInfoTab';
import {Tabs} from '../../utils/DummyData';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews} from '../../redux/actions/homeAction';
import {ShowToast} from '../../Custom';
import {getGroupStatus, JoinGroup} from '../../redux/actions/groupAction';
import constant from '../../redux/constant';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { timeFormatting } from '../../utils/HelperFunctions';

const GroupDetail = ({route}) => {
  const [changeTab, setChangeTab] = useState(1);
  const [groupStatus, setGroupStatus] = useState(null);
  const {reviews, reviews_loading} = useSelector(state => state.HomeReducer);
  const {user} = useSelector(state => state.AuthReducer);
  const {join_group_loading} = useSelector(state => state.ListingReducer);
  const {status_loader} = useSelector(state => state.GroupReducer);
  const dispatch = useDispatch();

  const {item, type} = route?.params;
  console.log('detail ======>', item.group_id);

  useEffect(() => {
    dispatch(getGroupStatus(user.user_id, item.group_id, setGroupStatus));
  }, []);

  // const itemStatus = useSelector(
  //   state => state.ListingReducer[item.group_id] || 'Unknown',
  // );

  const navigation = useNavigation();

  console.log('status');

  useEffect(() => {
    if (changeTab == 3 && reviews.length < 1) {
      dispatch(getReviews());
    }
  }, [changeTab]);

  const onHyperLink = async link => {
    if (link == '') {
      return ShowToast('link not found');
    } else {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        return ShowToast('Invalid url');
      }
    }
  };

  const onJoinGroup = async () => {
    const res = await dispatch(
      JoinGroup(
        user.user_id,
        item.group_id,
        item.author_id,
        item.private_group,
        item.author_email,
        `${user.username} wants to join your group`,
      ),
    );
    if (res.success) {
      setGroupStatus(res.status);
      dispatch({
        type: constant.JOIN_GROUP_DONE,
      });
      return ShowToast(res.message);
    } else {
      return ShowToast(res.message);
    }
  };

  return (
    <Container>
      {status_loader ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <>
          <Header />
          <SecondaryHeader
            headerStyle={{
              width:
                Object.keys(item.listing_title)?.length > 19 ? wp('45%') : null,
            }}
            text={item.listing_title}
            link={true}
            linkButton={{
              width:
                Object.keys(item.listing_title)?.length > 13 ? wp('24%') : null,
              // : hp('14%'),
            }}
            onLinkPress={() => onHyperLink(item.hyper_link)}
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
            {/* {changeTab == 1 ? ( */}
            <>
              <View style={styles.detailView}>
                <View style={styles.imageContainer}>
                  <View style={styles.headingView}>
                    <Text
                      style={styles.name}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.listing_title}
                    </Text>
                  </View>
                  <FastImage
                    source={
                      item.feature_image
                        ? {
                            uri: item.feature_image,
                            priority: FastImage.priority.high,
                          }
                        : images.dummy
                    }
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.formWrapper}>
                {/* <View style={styles.leftSection}> */}
                {/* </View> */}

                {/* <View> */}
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>DESCRIPTION:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.listing_content ? item.listing_content : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>GROUPER'S NAME:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.author_name ? item.author_name : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>AREA CODE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.area_code ? item.area_code : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>ITC GROUP HANDSHAKE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.itc_group_handshake ? item.itc_group_handshake : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>DESIRED TEE BOX:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.group_desired_teebox ? item.group_desired_teebox : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>
                    WHAT KIND OF MATCH IS THIS:
                  </Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.what_kind_of_match_is_this
                      ? item.what_kind_of_match_is_this
                      : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>SUGGESTED DAY:</Text>
                  <View style={styles.line} />

                  <Text style={styles.text}>
                    {/* {timeFormatting(item.suggested_day)} */}
                    {item.suggested_day}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>IS THIS A PRIVATE GROUP:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {item.private_group === 'true' ? 'Yes' : 'No' || ''}
                  </Text>
                </View>
                {/* </View> */}
              </View>
              {groupStatus?.data?.accept_or_not === '1' ||
              type === 'my groups' ||
              item.author_id == user.user_id ||
              item.private_group === 'off' ? (
                <Button
                  buttonText={'Go to chat'}
                  buttonStyle={styles.button}
                  textStyle={{color: colors.secondary}}
                  onPress={() => {
                    navigation.navigate('SecondaryStack', {
                      screen: 'GroupChat',
                      params: {
                        title: item.listing_title,
                        type: 'group',
                        listing_id: item.group_id,
                      },
                    });
                  }}
                />
              ) : (
                <Button
                  buttonText={
                    groupStatus === 'pending' ||
                    groupStatus?.data?.accept_or_not === '0'
                      ? 'Pending'
                      : 'Join Group'
                  }
                  buttonStyle={styles.button}
                  disable={
                    groupStatus === 'pending' ||
                    groupStatus?.data?.accept_or_not === '0'
                      ? true
                      : false
                  }
                  textStyle={{color: colors.secondary}}
                  indicator={join_group_loading}
                  onPress={() => onJoinGroup()}
                  // onPress={() =>  ShowToast('Coming soon')}
                />
              )}
            </>
            {/* ) : (
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
          // <>
          //   <View style={{paddingTop: hp('3%')}}>
          //     {changeTab == 3 && reviews_loading ? (
          //       <View style={{alignItems: 'center', marginVertical: hp('6%')}}>
          //         <ActivityIndicator size={'large'} color={colors.primary} />
          //       </View>
          //     ) : (
          //       <FlatList
          //         data={reviews}
          //         numColumns={2}
          //         columnWrapperStyle={{justifyContent: 'space-between'}}
          //         renderItem={({item, index}) => (
          //           <ReviewCard
          //             image={images.review1}
          //             name={item.reviews_title}
          //             ratings={item}
          //           />
          //         )}
          //       />
          //     )}
          //   </View>
          // </>
        )} */}
          </ScrollView>
        </>
      )}
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
    // flexDirection: 'row',
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
    borderRadius: 10,
    padding: hp('2%'),
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: hp('15%'),
    width: hp('15%'),
    position: 'absolute',
    borderRadius: 100,
    left: hp('2%'),
    top: hp('-4%'),
  },
  name: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginRight: hp('1%'),
    width: hp('20%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  formWrapper: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('9%'),
  },
  heading: {
    color: colors.white,
    fontSize: hp('1.9%'),
    width: '40%',
    marginBottom: hp('7%'),
    fontWeight: 'bold',
  },
  button: {
    // marginTop: hp('4%'),
    width: hp('20%'),
    // marginLeft: hp('1%'),
    borderRadius: 50,
  },
  line: {
    width: 1.1,
    backgroundColor: colors.gray,
    // marginLeft: hp('5%'),
    // height: hp('82%'),
  },
  text: {
    color: colors.lightgray,
    marginBottom: hp('7%'),
    width: '40%',
    fontSize: hp('1.9%'),
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
  leftSection: {
    // flex: 1
    // alignItems: 'flex-end',
  },
  rightSection: {
    flex: 1,
    // width: hp('20%'),
    // alignItems: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  dataRow: {
    flexDirection: 'row',
    width: hp('43%'),
    flex: 0.9,
    justifyContent: 'space-between',
  },
});
