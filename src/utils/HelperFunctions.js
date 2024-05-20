import moment from 'moment';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export const requestPermission = async permissionType => {
  let permissionSet;
  if (Platform.OS === 'ios') {
    switch (permissionType) {
      case 'media':
        permissionSet = Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        });
        break;

      //  case 'notifications':
      //  permissionSet = Platform.select({
      //   ios: PERMISSIONS.IOS.N
      //  })
      //  break;

      default:
        console.log('unknown permission type');
    }
  } else if (Platform.OS === 'android') {
    switch (permissionType) {
      case 'media':
        permissionSet = Platform.select({
          android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        });
        break;

      case 'notifications':
        permissionSet = Platform.select({
          android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        });
        break;

      default:
        console.log('unknown permission type');
    }
  }
  const status = await request(permissionSet);
  return status;
};

export const timeFormatting = time => {
  if (!time) {
    return 'Select time';
  }
  const formatedTime = moment(time, 'HH:mm').format('h:mm A');
  return formatedTime;
};

export const concatNotification_text = (user_name, noti_text) => {
  if (
    noti_text === 'add new group' ||
    noti_text === 'add new listing' ||
    noti_text === 'added new group'
  ) {
    return user_name + ' ' + noti_text;
  } else {
    return noti_text;
  }
};
