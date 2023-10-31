import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import images from '../../assets/images'
import colors from '../../assets/colors'
import ProfileOptions from '../../components/ProfileOptions'
import { Options, settings } from '../../DummyData'
import ProfileSettings from '../../components/ProfileSettings'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {

  const navigation = useNavigation()

  const onSettingsPress = (index) => {
    if (index == 0) {
      navigation.navigate('SecondaryStack', { screen: 'Payments' })
    } else if (index == 1) {
      navigation.navigate('SecondaryStack', { screen: 'Notifications' })
    } else if (index == 2) {
      navigation.navigate('SecondaryStack', { screen: 'Wishlist' })
    } else if (index == 3) {
      navigation.navigate('SecondaryStack', { screen: 'ContactUs' })
    } else if (index == 4) {
      navigation.navigate('SecondaryStack', { screen: 'Language' })
    } else if (index == 5) {
      navigation.navigate('SecondaryStack', { screen: 'Rating' })
    } else if (index == 7) {
      navigation.navigate('SecondaryStack', { screen: 'About' })
    } else {
      alert('working in progress')
    }
  }

  return (
    <Container>
      <Header />
      <SecondaryHeader
        text={'Profile'}
      />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={images.profile}
            style={styles.profileImage}
            borderRadius={10}
          />
          <View style={styles.wrapper}>
            <Text style={styles.name}>Wilbert Bright</Text>
            <Text style={styles.email}>@Wilbertb</Text>
          </View>
        </View>
        <View style={{ paddingTop: hp('5%') }}>
          <View style={styles.optionsCard}>
            {Options.map((item, i) => (
              <ProfileOptions
                key={i}
                text={item.text}
                image={item.icon}
                icon={i !== 0 && 'arrow-right'}
              />
            ))}
          </View>
        </View>
        <View style={{ paddingTop: hp('3%') }}>
          <Text style={styles.heading}>General Settings</Text>
          <View style={{ paddingTop: hp('5%') }}>
            {settings.map((item, i) => (
              <ProfileSettings
                key={i}
                text={item.text}
                icon={item.icon}
                onPress={() => onSettingsPress(i)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  )
}

export default Profile;

const styles = StyleSheet.create({
  screen: {
    padding: hp('3%'),
    paddingTop: hp('4%'),
  },
  profileImage: {
    height: hp('18%'),
    width: '42%'
  },
  wrapper: {
    marginLeft: hp('3%'),
    marginTop: hp('3%')
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.5%')
  },
  email: {
    color: colors.lightgray,
    marginTop: hp('1%'),
    fontSize: hp('2%')
  },
  optionsCard: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: hp('2.7%')
  },
  heading: {
    color: colors.white,
    fontSize: hp('2.5%'),
    fontWeight: 'bold'
  }
})