import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {
  getNotifications,
  ReadNotifications,
} from '../../redux/actions/homeAction';
import moment from 'moment';
import {AcceptListing, RejectListing} from '../../redux/actions/listingAction';
import {ShowToast} from '../../Custom';
import constant from '../../redux/constant';
import {AcceptGroup, RejectGroup} from '../../redux/actions/groupAction';
import {concatNotification_text} from '../../utils/HelperFunctions';
import ScrollGuide from '../../components/ScrollGuide';

const Notifications = () => {
  const [isIndex, setIsIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;

  const {notification_loader} = useSelector(state => state.HomeReducer);

  const {user} = useSelector(state => state.AuthReducer);
  const {accept_loader, reject_loader} = useSelector(
    state => state.ListingReducer,
  );

  const dispatch = useDispatch();

  // console.log('notifications data =====>', notifications);

  useEffect(() => {
    // setNotifications(TodayNotifications)
    dispatch(getNotifications(user.user_id, setNotifications));
    dispatch(ReadNotifications(user.user_id));
  }, []);

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

  const onAcceptRequest = async (item, index) => {
    // return console.log('selected item',item.listing_sender_id);
    setIsIndex(index);
    if (item.listing_type === 'listing') {
      const listing = await dispatch(
        AcceptListing(
          item.listing_sender_id,
          user.user_id,
          `${user.username} accepted your request`,
          item.listing_id,
        ),
      );
      if (listing.message && item.listing_status === 'pending') {
        notifications[index] = {...item, listing_status: 'accepted'};
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
          payload: notifications,
        });
        return ShowToast(listing.message);
      } else {
        return ShowToast(listing.message);
      }
    } else {
      const group = await dispatch(
        AcceptGroup(
          item.listing_sender_id,
          user.user_id,
          `${user.username} accepted your request`,
          item.listing_id,
        ),
      );
      if (group.success && item.listing_status === 'pending') {
        notifications[index] = {...item, listing_status: 'accepted'};
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
          payload: notifications,
        });
        return ShowToast(group.message);
      } else {
        return ShowToast(group.message);
      }
    }
  };

  const onRejectRequest = async (item, index) => {
    // if (item.listing_id) {
    setIsIndex(index);
    if (item.listing_type === 'listing') {
      const listing = await dispatch(
        RejectListing(
          item.listing_sender_id,
          user.user_id,
          `${user.username} rejected your request`,
          item.listing_id,
        ),
      );
      if (listing.message && item.listing_status === 'pending') {
        notifications[index] = {...item, listing_status: 'rejected'};
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
          payload: notifications,
        });
        return ShowToast(listing.message);
      } else {
        return ShowToast(listing.message);
      }
    } else {
      const group = await dispatch(
        RejectGroup(
          item.listing_sender_id,
          user.user_id,
          `${user.username} rejected your request`,
          item.listing_id,
        ),
      );
      if (group.message && item.listing_status === 'pending') {
        notifications[index] = {...item, listing_status: 'rejected'};
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
          payload: notifications,
        });
        // dispatch({
        //   type: constant.JOIN_GROUP_DONE,
        //   payload: {listingId: item.listing_id, status: res.status},
        // });
        return ShowToast(group.message);
      } else {
        return ShowToast(group.message);
      }
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        dispatch(getNotifications(user.user_id, setNotifications));
        dispatch(ReadNotifications(user.user_id));
      } catch (error) {
        console.log('error refreshing data =======>', error);
      } finally {
        setRefreshing(false);
      }
    }, 3000);
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        setShowArrow(currentOffsetY < 100);
      },
    },
  );

  return (
    <Container>
      <Header showBell={false} />
      <SecondaryHeader text={'Notifications'} />
      {notification_loader ? (
        renderLoader()
      ) : notifications?.length < 1 ? (
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
        <>
          <ScrollView
            contentContainerStyle={styles.screen}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            refreshControl={
              <RefreshControl
                onRefresh={() => handleRefresh()}
                refreshing={refreshing}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            showsVerticalScrollIndicator={false}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <Text style={styles.heading}>Today</Text> */}
              {/* <Text style={styles.read}>Mark As All Read</Text> */}
            </View>
            <View style={styles.notificationWrapper}>
              {notifications?.map((item, index) => {
                // console.log('woww', item.listing_id);
                return (
                  <NotificationsCard
                    image={
                      item.listing_image === 'image not found'
                        ? images.dummy
                        : {uri: item.listing_image}
                    }
                    onAcceptPress={() => onAcceptRequest(item, index)}
                    accept_loader={index == isIndex && accept_loader}
                    reject_loader={index == isIndex && reject_loader}
                    status={item.listing_status}
                    hidebuttons={
                      item.listing_status === 'pending' ? false : true
                    }
                    onRejectPress={() => onRejectRequest(item, index)}
                    text={concatNotification_text(
                      item.listing_requester_name,
                      item.notification_text,
                    )}
                    desc={item.listing_name}
                    date={moment(item.create_date).format('DD MMMM YYYY')}
                    nav={item.listing_id}
                    type={item.listing_type}
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
          {showArrow && <ScrollGuide />}
        </>
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
