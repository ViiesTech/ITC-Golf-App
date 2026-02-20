import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from './Button';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {ShowToast} from '../Custom';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const SearchFilter = ({
  searchStyle,
  style,
  onValueChange,
  selectedValue,
  onSearchPress,
}) => {
  const [loading, setLoading] = useState(false);
  const {area_codes} = useSelector(state => state.HomeReducer);

  const requestLocationPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) return false;

    // 1. Check Permission Status
    const status = await check(permission);
    console.log('Location Permission Status:', status);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    // 2. If Denied Then first Ask Permission
    if (status === RESULTS.DENIED) {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }

    if (status === RESULTS.BLOCKED) {
      ShowToast(
        'Location permission is blocked. Please enable it in settings.',
      );
      return false;
    }

    return false;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const handleMyLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return ShowToast('Location permission denied');
    }

    setLoading(true);

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Current Location:', latitude, longitude);

        if (area_codes && area_codes.length > 0) {
          let closestAreaCode = null;
          let minDistance = Infinity;

          area_codes.forEach(item => {
            if (item.latitude && item.longitude) {
              const dist = getDistance(
                latitude,
                longitude,
                parseFloat(item.latitude),
                parseFloat(item.longitude),
              );
              if (dist < minDistance) {
                minDistance = dist;
                closestAreaCode = item.area_code;
              }
            }
          });

          if (closestAreaCode) {
            onValueChange(closestAreaCode);
            ShowToast(`Location matched to area code: ${closestAreaCode}`);
          } else {
            ShowToast('Could not find a matching area code for your location');
          }
        }
        setLoading(false);
      },
      error => {
        console.log('Location Error:', error);
        ShowToast('Failed to get your current location');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={[styles.card, style]}>
      <View style={{paddingTop: hp('1%')}}>
        <Text style={styles.text}>AREA CODE</Text>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={selectedValue}
            style={styles.textStyle}
            dropdownIconColor={colors.secondary}
            onValueChange={onValueChange}>
            <Picker.Item
              label="Select"
              value={null}
              style={styles.labelStyle}
            />
            {area_codes?.map(item => (
              <Picker.Item
                label={item.area_code}
                value={item.area_code}
                style={styles.labelStyle}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Button
        buttonText={'Search'}
        onPress={onSearchPress}
        textStyle={{color: colors.secondary, fontSize: hp('2%')}}
        buttonStyle={[
          {
            borderRadius: 100,
            marginTop: hp('3%'),
            width: hp('22%'),
            alignSelf: 'center',
          },
          searchStyle,
        ]}
      />
      <Button
        buttonText={loading ? 'Fetching...' : 'My Location'}
        onPress={handleMyLocation}
        indicator={loading}
        disable={loading}
        textStyle={{color: colors.secondary, fontSize: hp('2%')}}
        buttonStyle={[
          {
            borderRadius: 100,
            marginTop: hp('2%'),
            width: hp('22%'),
            alignSelf: 'center',
          },
          searchStyle,
        ]}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    marginTop: hp('2%'),
    padding: hp('1.7%'),
  },
  pickerStyle: {
    width: '99%',
    alignSelf: 'center',
    marginTop: hp('1%'),
    borderRadius: 5,
    borderWidth: 0.4,
  },
  text: {
    color: colors.secondary,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  textStyle: {
    color: colors.secondary,
    fontSize: hp('2%'),
  },
  labelStyle: {
    color: colors.secondary,
  },
});
