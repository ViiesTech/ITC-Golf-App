import moment from 'moment';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

export const requestPermission = async permissionType => {
  let permissionSet;
  if (Platform.OS === 'ios') {
    switch (permissionType) {
      case 'media':
        permissionSet = Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        });
        break;

      case 'notifications':
        await messaging().requestPermission();
        // const enabled =
        //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        break;

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

export const identifyCardType = number => {
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/;
  const mastercardPattern =
    /^(?:5[1-5][0-9]{14}|2(?:2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720[0-9]{2})[0-9]{12})$/;
  const amexPattern = /^3[47][0-9]{13}$/;

  if (visaPattern.test(number)) {
    return 'Visa';
  } else if (mastercardPattern.test(number)) {
    return 'Mastercard';
  } else if (amexPattern.test(number)) {
    return 'AmericanExpress';
  } else {
    return 'Invalid';
  }
};

export const maxCardLength = type => {
  console.log('typeeee', type);
  switch (type) {
    case 'Visa':
      return 19;
    case 'Mastercard':
      return 16;
    case 'AmericanExpress':
      return 15;
    default:
      return 19;
  }
};

export const validateExpiry = (value, isMonth) => {
  if (isMonth) {
    const intMonth = parseInt(value, 10);
    if (intMonth < 1 || intMonth > 12) {
      return 'Invalid month';
    }
  } else {
    const currentYear = new Date().getFullYear();
    const intYear = parseInt(value, 10);

    // Convert 2-digit year to 4-digit year
    const fullYear = intYear < 100 ? 2000 + intYear : intYear;

    if (fullYear < currentYear) {
      return 'Expired card';
    }
  }
  return '';
};

export const validateCVC = cvc => {
  const pattern = /^[0-9]{3,4}$/;

  if (!pattern.test(cvc)) {
    return 'Invalid cvc';
  }
  return '';
};
