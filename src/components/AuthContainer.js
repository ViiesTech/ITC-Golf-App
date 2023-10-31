import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import images from '../assets/images'

const AuthContainer = ({ children }) => {
    return (
        <ImageBackground
            source={images.auth_background}
            style={styles.imageStyle}
        >
            {children}
        </ImageBackground>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        backgroundColor: 'black'
    }
})