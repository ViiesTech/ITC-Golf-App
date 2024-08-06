import { StyleSheet, View } from 'react-native'
import React from 'react'
import ArrowDown from 'react-native-vector-icons/SimpleLineIcons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'

const ScrollGuide = () => {
  return (
    <View style={styles.addView}>
         <ArrowDown 
            size={30}
            name={'arrow-down'}
            color={colors.white}
          />
    </View>
  )
}

export default ScrollGuide

const styles = StyleSheet.create({
    addView: {
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: hp(3),
      }
})