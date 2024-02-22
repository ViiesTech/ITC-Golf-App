import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import Alarm from 'react-native-vector-icons/MaterialCommunityIcons';
import More from 'react-native-vector-icons/MaterialIcons'

const NotificationsCard = ({ image, text, date, desc }) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={image}
          style={styles.image}
          borderRadius={5}
        />
        <View style={styles.Textwrapper}>
          <Text style={styles.text}>{text}</Text>
          <Text style={[styles.text,{fontSize: hp('1.5%'), color: colors.lightgray, marginBottom: 2}]}>{desc}</Text>
          <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
            <Alarm
              name={'alarm'}
              color={colors.lightgray}
              size={17}
              style={{ alignSelf: 'center' }}
            />
            <Text style={styles.date}>{date}</Text>
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
    marginTop: hp('1.5%')
  },
  text: {
    color: colors.white,
    marginBottom: hp('1%'),
    fontWeight: 'bold',
    fontSize: hp('1.8%')
  },
  date: {
    color: colors.lightgray,
    fontSize: hp('1.5%'),
    marginLeft: hp('1.2%')
  }
})