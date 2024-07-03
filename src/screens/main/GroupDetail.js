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
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews} from '../../redux/actions/homeAction';
import {ShowToast} from '../../Custom';
import {getGroupDetailById, getGroupStatus, JoinGroup} from '../../redux/actions/groupAction';
import constant from '../../redux/constant';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const GroupDetail = ({route}) => {
  // const [changeTab, setChangeTab] = useState(1);
  const [groupStatus, setGroupStatus] = useState(null);
  const [groupDetail, setGroupDetail] = useState({})
  const {user} = useSelector(state => state.AuthReducer);
  const {join_group_loading} = useSelector(state => state.ListingReducer);
  const {group_detail_loader} = useSelector(state => state.GroupReducer);
  const dispatch = useDispatch();

  const {id, type} = route?.params;

  useEffect(() => {
    dispatch(getGroupStatus(user.user_id, id, setGroupStatus));
    dispatch(getGroupDetailById(id,setGroupDetail))
  }, []);

  const navigation = useNavigation();

  // console.log('status');

  // useEffect(() => {
  //   if (changeTab == 3 && reviews.length < 1) {
  //     dispatch(getReviews());
  //   }
  // }, [changeTab]);

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
      {group_detail_loader ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <>
          <Header />
          <SecondaryHeader
            text={groupDetail.listing_title}
            link={true}
            onLinkPress={() => onHyperLink(item.hyper_link)}
          />
          <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.tabView}>
              <PersonalInfoTab text={'Personal Information'} />
            </View>
            <>
              <View style={styles.detailView}>
                <View style={styles.imageContainer}>
                  <View style={styles.headingView}>
                    <Text
                      style={styles.name}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {groupDetail.listing_title}
                    </Text>
                  </View>
                  <FastImage
                    source={
                      groupDetail.feature_image
                        ? {
                            uri: groupDetail.feature_image,
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
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>DESCRIPTION:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.listing_content ? groupDetail.listing_content : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>GROUPER'S NAME:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.author_name ? groupDetail.author_name : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>AREA CODE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.area_code ? groupDetail.area_code : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>ITC GROUP HANDSHAKE:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.itc_group_handshake ? groupDetail.itc_group_handshake : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>DESIRED TEE BOX:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.group_desired_teebox ? groupDetail.group_desired_teebox : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>
                    WHAT KIND OF MATCH IS THIS:
                  </Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.what_kind_of_match_is_this
                      ? groupDetail.what_kind_of_match_is_this
                      : ''}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>SUGGESTED DAY:</Text>
                  <View style={styles.line} />

                  <Text style={styles.text}>
                    {/* {timeFormatting(item.suggested_day)} */}
                    {groupDetail.suggested_day}
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.heading}>IS THIS A PRIVATE GROUP:</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>
                    {groupDetail.private_group === 'true' ? 'Yes' : 'No' || ''}
                  </Text>
                </View>
              </View>
              {groupStatus?.data?.accept_or_not === '1' ||
              type === 'my groups' ||
              groupDetail.author_id == user.user_id ||
              groupDetail.private_group === 'off' ? (
                <Button
                  buttonText={'Go to chat'}
                  buttonStyle={styles.button}
                  textStyle={{color: colors.secondary}}
                  onPress={() => {
                    navigation.navigate('SecondaryStack', {
                      screen: 'GroupChat',
                      params: {
                        title: groupDetail.listing_title,
                        type: 'group',
                        listing_id:id,
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
                />
              )}
            </>
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
