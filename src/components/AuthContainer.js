import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import images from '../assets/images';

const AuthContainer = ({children, paddingBottom}) => {
  return (
    <ImageBackground source={images.auth_background} style={styles.imageStyle}>
      <KeyboardAvoidingView
        style={{flex: 1,}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
        <ScrollView
          contentContainerStyle={[
            styles.contentStyle,
            {paddingBottom: paddingBottom},
          ]}
          keyboardShouldPersistTaps={'handled'}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
