import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import NotificationsCard from '../../components/NotificationsCard';
import images from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {getNotifications} from '../../redux/actions/homeAction';
import moment from 'moment';
import {AcceptListing, RejectListing} from '../../redux/actions/listingAction';
import {AcceptGroup, RejectGroup} from '../../redux/actions/groupAction';
import {ShowToast} from '../../Custom';
import {useNavigation} from '@react-navigation/native';
import constant from '../../redux/constant';

const Notifications = () => {
  const [acceptPressed, setAcceptPressed] = useState(false);
  const [rejectPressed, setRejectPressed] = useState(false);

  const {notification_loader, notifications} = useSelector(
    state => state.HomeReducer,
  );

  const {user} = useSelector(state => state.AuthReducer);
  const {accept_loader, reject_loader} = useSelector(
    state => state.GroupReducer,
  );

  const dispatch = useDispatch();

  console.log('notifications data =====>', user.user_id);

  useEffect(() => {
    // setNotifications(TodayNotifications)
    if (notifications.length < 1 || acceptPressed || rejectPressed) {
      dispatch(getNotifications(user.user_id));
    } else {
      dispatch(getNotifications(user.user_id));
    }
  }, [acceptPressed, rejectPressed]);

  const renderLoader = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: colors.secondary,
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const onAcceptRequest = async item => {
    // if (item.listing_id) {
    const listing = await dispatch(
      AcceptListing(
        user.user_id,
        item.listing_post_author_id,
        user.user_email,
        'accepted your request',
        item.listing_id,
      ),
    );
    if (listing.message && item.status === 'pending') {
      dispatch({
        type: constant.ACCEPT_REQUEST_DONE,
        payload: {listingId: item.listing_id, status: listing.status},
      });
      setAcceptPressed(true);
      return ShowToast(listing.message);
    } else {
      setAcceptPressed(false);
      return ShowToast(listing.message);
    }
    // } else {
    // const group = await dispatch(
    //   AcceptGroup(
    //     user.user_id,
    //     item.listing_post_author_id,
    //     user.user_email,
    //     'accepted your request',
    //     item.group_id,
    //   ),
    // );
    // if (group.message && item.status === 'pending') {
    //   navigation.navigate('Home');
    //   dispatch({
    //     type: constant.ACCEPT_GROUP_DONE,
    //   });
    //   return ShowToast(group.message);
    // } else {
    //   return ShowToast(group.message);
    // }
    // }
  };

  const onRejectRequest = async item => {
    // if (item.listing_id) {
    const listing = await dispatch(
      RejectListing(
        user.user_id,
        item.listing_post_author_id,
        user.user_email,
        'rejected your request',
        item.listing_id,
      ),
    );
    if (listing.message && item.status === 'pending') {
      dispatch({
        type: constant.REJECT_REQUEST_DONE,
        payload: {listingId: item.listing_id, status: 'rejected'},
      });
      setRejectPressed(true);
      return ShowToast(listing.message);
    } else {
      setRejectPressed(false);
      return ShowToast(listing.message);
    }
    // } else {
    // const group = await dispatch(
    //   RejectGroup(
    //     user.user_id,
    //     item.listing_post_author_id,
    //     user.user_email,
    //     'rejected your request',
    //     item.listing_id,
    //   ),
    // );
    // if (group.message && item.status === 'pending') {
    //   navigation.navigate('Home');
    //   dispatch({
    //     type: constant.REJECT_GROUP_DONE,
    //     payload: {listingId: item.notification_id, status: 'rejected'},
    //   });
    //   return ShowToast(group.message);
    // } else {
    //   return ShowToast(group.message);
    // }
    // }
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Notifications'} icon={true} />
      {notification_loader ? (
        renderLoader()
      ) : notifications.length < 1 ? (
        <>
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={images.notification} style={styles.image} />
            <Text style={styles.text}>No Notifications</Text>
          </View>
        </>
      ) : (
        <ScrollView
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* <Text style={styles.heading}>Today</Text> */}
            {/* <Text style={styles.read}>Mark As All Read</Text> */}
          </View>
          <View style={styles.notificationWrapper}>
            {notifications?.map(item => {
              console.log('woww', item?.status);
              return (
                <NotificationsCard
                  image={images.notification3}
                  onAcceptPress={() => onAcceptRequest(item)}
                  accept_loader={accept_loader}
                  reject_loader={reject_loader}
                  hidebuttons={item.status === 'pending' ? false : true}
                  onRejectPress={() => onRejectRequest(item)}
                  text={item.notification_text}
                  desc={
                    item.notification_desc === ''
                      ? 'Notifications description'
                      : item.notification_desc
                  }
                  date={moment(item.create_date).format('DD MMMM YYYY')}
                />
              );
            })}
          </View>
          {/* <Text style={styles.heading}>Yesterday</Text> */}
          {/* <View style={styles.notificationWrapper}>
              {YesterdayNotifications?.map(item => (
                <NotificationsCard image={item.image} />
              ))}
            </View> */}
          <SVGImage image={icons.pageEnd} style={{alignSelf: 'center'}} />
        </ScrollView>
      )}
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('0.1%'),
    paddingBottom: hp('15%'),
    padding: hp('2.5%'),
  },
  heading: {
    color: colors.white,
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  read: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: hp('1.7%'),
  },
  notificationWrapper: {
    paddingTop: hp('3%'),
  },
  image: {
    height: hp('34%'),
    width: hp('34%'),
  },
  text: {
    color: colors.white,
    fontSize: hp('3%'),
  },
});
