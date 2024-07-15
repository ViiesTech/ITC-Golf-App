/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifications from './src/notifications';
import messaging from '@react-native-firebase/messaging';


// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false




AppRegistry.registerComponent(appName, () => App);
