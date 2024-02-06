import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import productReducer from './productReducer';

export const rootReducer = combineReducers({
    LanguageReducer: languageReducer,
    AuthReducer: authReducer,
    HomeReducer: homeReducer,
    ProductReducer: productReducer
})