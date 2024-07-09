import notifee, {
  AndroidBadgeIconType,
  AndroidImportance,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NOTIFICATION_CHANNEL_ID} from '../redux/services/api';

// export const onDisplayNotification = async data => {

//   if (Platform.OS === 'ios') {
//     await notifee.requestPermission();
//   }

//   const channelId = await notifee.createChannel({
//     id: NOTIFICATION_CHANNEL_ID,
//     name: 'INTHECUPGOLFChannel2',
//     sound: 'default',
//     badge: true,
//     badgeIconType: AndroidBadgeIconType.SMALL,
//     importance: AndroidImportance.HIGH,
//   });

//   await notifee.displayNotification({
//     title: data.title,
//     body:  data.body,
//     android: {
//       channelId,
//       showTimestamp: true,
//       smallIcon: 'ic_launcher_round',
//       pressAction: {
//         id: 'default',
//       },
//     },
//     ios: {
//       sound: 'default',
//       badgeCount: 1,
//     },
//   });
// };

// export const onNotificationListeners = () => {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log('notification from backend ====>', remoteMessage);
//     onDisplayNotification(remoteMessage);
//   });
//   return unsubscribe;
// };

class Notifications {
  constructor() {
    this.createNotificationChannel();
    this.configureFCM();
  }

  async createNotificationChannel() {
    await notifee.createChannel({
      id: NOTIFICATION_CHANNEL_ID,
      name: 'INTHECUPGOLFChannel',
      sound: 'default',
      badge: true,
      badgeIconType: AndroidBadgeIconType.SMALL,
      importance: AndroidImportance.HIGH,
    });
  }

  async displayNotification(data) {
    await notifee.displayNotification({
      title: data?.notification?.title,
      body: data?.notification?.body,
      android: {
        channelId: NOTIFICATION_CHANNEL_ID,
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
  }

  configureFCM() {
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    //   await this.displayNotification(remoteMessage);
    // });

    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log('notification from backend ====>', remoteMessage);
        await this.displayNotification(remoteMessage);
    });
  }

  unsubscribeFCM() {
    if (this.messageListener) {
      this.messageListener();
    }
  }
}

export default new Notifications();
