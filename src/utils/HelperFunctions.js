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
