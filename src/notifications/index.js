import notifee, { AndroidImportance } from '@notifee/react-native';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging'

const onDisplayNotification = async (data) => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'ITCGOLF123456789',
    name: 'INTHECUPGOLFChannel',
    sound: 'default',
    importance: AndroidImportance.HIGH
  });

  await notifee.displayNotification({
    title: data?.title,
    body: data?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: 'ic_launcher',
      circularLargeIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};

export const onNotificationListeners = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('notification from backend ====>',remoteMessage)
        onDisplayNotification(remoteMessage.data)
    })
    return unsubscribe
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Notification from backend (background/quit) ===>', remoteMessage);
    onDisplayNotification(remoteMessage.data);
  });

