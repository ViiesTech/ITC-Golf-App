// import notifee, { AndroidImportance } from '@notifee/react-native';
// import {Platform} from 'react-native';

// export const configureNotification = async () => {
//   if (Platform.OS === 'ios') {
//     await notifee.requestPermission();
//   }

//   const channelId = await notifee.createChannel({
//     id: 'ITCGOLF12345678920',
//     name: 'INTHECUPGOLFChannel6',
//     sound: 'default',
//     importance: AndroidImportance.HIGH
//   });

//   await notifee.displayNotification({
//     title: 'Notification Title',
//     body: 'Main body content of the notification',
//     android: {
//       channelId,
//       smallIcon: 'ic_launcher',
//       largeIcon: 'ic_launcher',
//       circularLargeIcon: 'ic_launcher',
//       pressAction: {
//         id: 'default',
//       },
//     },
//   });
// };
