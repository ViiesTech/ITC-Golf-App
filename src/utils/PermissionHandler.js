import { PERMISSIONS, request } from "react-native-permissions";


  export const iosPermissionHandler = async () => {
    if(Platform.OS === 'ios'){
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY
      });
  
      const status = await request(permission);
      return status
  }
  }