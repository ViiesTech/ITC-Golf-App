import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, LogBox, Platform, View} from 'react-native';
import Routes from './routes';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, reduxStore} from './redux/store';
import ToastMessage from './components/ToastMessage';
import images from './assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getNotificationCount} from './redux/actions/homeAction';
import notifications from './notifications';

const SplashScreen = () => (
  <ImageBackground
    source={images.splash}
    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Image
      source={images.logo}
      style={{height: hp('20%'), width: hp('20%')}}
      resizeMode="contain"
    />
  </ImageBackground>
);

const MainApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useSelector(state => state?.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.configureFCM();
    return () => {
      notifications.unsubscribeFCM();
    };
  }, []);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    setInterval(() => {
      if (user) {
        dispatch(getNotificationCount(user.user_id));
      }
    }, 5000);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, [dispatch, user]);

  if (isLoading && Platform.OS === 'ios') {
    return <SplashScreen />;
  }

  return <Routes />;
};

const App = () => (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={{flex: 1}}>
        <MainApp />
        <ToastMessage position={'top'} />
      </View>
    </PersistGate>
  </Provider>
);

export default App;
