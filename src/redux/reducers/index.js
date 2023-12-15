import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authReducer from './authReducer';

export const rootReducer = combineReducers({
    LanguageReducer: languageReducer,
    AuthReducer: authReducer
})