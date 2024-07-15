import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import productReducer from './productReducer';
import groupReducer from './groupReducer';
import listingReducer from './listingReducer';

export const rootReducer = combineReducers({
    LanguageReducer: languageReducer,
    AuthReducer: authReducer,
    HomeReducer: homeReducer,
    ProductReducer: productReducer,
    GroupReducer: groupReducer,
    ListingReducer: listingReducer
})