import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'

const Container = ({children}) => {
  return (
    <View style={styles.background}>
        {children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.secondary
    }
})