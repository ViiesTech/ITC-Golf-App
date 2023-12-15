import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import Alarm from 'react-native-vector-icons/MaterialCommunityIcons';
import More from 'react-native-vector-icons/MaterialIcons'

const NotificationsCard = ({ image }) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={image}
          style={styles.image}
          borderRadius={5}
        />
        <View style={styles.Textwrapper}>
          <Text style={styles.text}>Happy To Share This Notification Element</Text>
          <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
            <Alarm
              name={'alarm'}
              color={colors.lightgray}
              size={17}
              style={{ alignSelf: 'center' }}
            />
            <Text style={styles.date}>24 april 2021</Text>
          </View>
        </View>
      </View>
      <More
        name={'more-vert'}
        color={colors.lightgray}
        size={22}
      />
    </View>
  )
}

export default NotificationsCard

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('5%')
  },
  image: {
    height: hp('11%'),
    width: hp('11.5%')
  },
  Textwrapper: {
    marginLeft: hp('1.5%'),
    marginTop: hp('3%')
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('1.5%')
  },
  date: {
    color: colors.lightgray,
    marginLeft: hp('1.2%')
  }
})