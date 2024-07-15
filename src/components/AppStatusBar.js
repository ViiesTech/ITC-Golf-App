import { StatusBar } from 'react-native'
import React from 'react'

const AppStatusBar = () => {
  return (
        <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent={true}
        />
  )
}

export default AppStatusBar
