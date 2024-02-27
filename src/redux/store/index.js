import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'LanguageReducer',
    'AuthReducer',
    'HomeReducer',
    'ProductReducer',
    'GroupReducer',
    'ListingReducer',
  ],
  blacklist: [],
};

const reducer = persistReducer(persistConfig, rootReducer);

const reduxStore = createStore(reducer, applyMiddleware(ReduxThunk));

let persistor = persistStore(reduxStore);

export {reduxStore, persistor};
