import notifee, {AndroidBadgeIconType, AndroidImportance,} from '@notifee/react-native';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';

const onDisplayNotification = async data => {
  const {user} = useSelector(state => state.AuthReducer);

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'ITCGOLF12345678',
    name: 'INTHECUPGOLFChannel',
    sound: 'default',
    badge: true,
    badgeIconType: AndroidBadgeIconType.SMALL,
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.title,
    body: user?.username + data?.body,
    android: {
      channelId,
      showTimestamp: true,
      smallIcon: 'ic_launcher_round',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
      badgeCount: 1, 
    },
  });
};

export const onNotificationListeners = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('notification from backend ====>', remoteMessage);
    onDisplayNotification(remoteMessage);
  });
  return unsubscribe;
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Notification from backend (background/quit) ===>',
    remoteMessage,
  );
  onDisplayNotification(remoteMessage);
});
