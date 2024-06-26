import notifee, { AndroidBadgeIconType, AndroidImportance } from '@notifee/react-native';
import {Platform} from 'react-native';

export const configureNotification = async () => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'ITCGOLF123456789',
    name: 'INTHECUPGOLFChannel',
    sound: 'default',
    importance: AndroidImportance.HIGH
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};
