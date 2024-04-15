import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, LogBox, Platform} from 'react-native';
import Routes from './routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, reduxStore} from './redux/store';
import ToastMessage from './components/ToastMessage';
import images from './assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 2500);
  
  const testFunc = () => {
    return (
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
  };

  return (
    <>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          {isLoading && Platform.OS === 'ios' ? <>{testFunc()}</> : <Routes />}
        </PersistGate>
      </Provider>
      <ToastMessage position={'top'} />
    </>
  );
};

export default App;
