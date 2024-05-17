import moment from 'moment';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export const iosPermissionHandler = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  });
  const status = await request(permission);
  return status;
};

export const androidPermissionHandler = async () => {
  const permission = Platform.select({
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  });
  const status = await request(permission);
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

// export const FilterExpiredListings = (listing, type) => {
//   const currentDate = new Date();
//   const filteredListings = listing.filter(data => {
//    const listingDate = new Date(type === 'group' ? data.suggested_day : data.course_date)
//       listingDate.setHours(
//         currentDate.getHours(),
//         currentDate.getMinutes(),
//         currentDate.getSeconds(),
//         currentDate.getMilliseconds(),
//       );
//     return listingDate > currentDate;
//   });
//   return filteredListings
// };
