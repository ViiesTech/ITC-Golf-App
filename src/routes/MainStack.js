import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '../screens/main/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Listing from '../screens/main/Listing'
import Giveaways from '../screens/main/Giveaways'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SVGImage from '../components/SVGImage'
import icons from '../assets/icons'
import Profile from '../screens/main/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Payments from '../screens/main/Payments'
import Notifications from '../screens/main/Notifications'
import Wishlist from '../screens/main/Wishlist'
import ContactUs from '../screens/main/ContactUs'
import Language from '../screens/main/Language'
import Rating from '../screens/main/Rating'
import About from '../screens/main/About'
import FreeStuff from '../screens/main/FreeStuff'
import StuffDetails from '../screens/main/StuffDetails'
import PersonalInfo from '../screens/main/PersonalInfo'
import AllGroups from '../screens/main/AllGroups'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const BottomStack = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 95,
          backgroundColor: 'rgb(65,65,65)',
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View style={styles.iconView}>
                <SVGImage
                  image={icons.home_active}
                />
              </View>
              :
              <SVGImage image={icons.home_inactive} />
          )
        }}
      />
      <Tab.Screen
        name='Listing'
        component={Listing}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View style={styles.iconView}>
                <SVGImage
                  image={icons.listing_active}
                />
              </View>
              :
              <SVGImage image={icons.listing_inactive} />
          )
        }}
      />
      <Tab.Screen
        name='Giveaways'
        component={Giveaways}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View style={styles.iconView}>
                <SVGImage
                  image={icons.giveaways_active}
                />
              </View>
              :
              <SVGImage image={icons.giveaways_inactive} />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View style={styles.iconView}>
                <SVGImage
                  image={icons.settings_active}
                />
              </View>
              :
              <SVGImage image={icons.settings_inactive} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const SecondaryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Tab.Screen name='Payments' component={Payments} />
      <Tab.Screen name='Notifications' component={Notifications} />
      <Tab.Screen name='Wishlist' component={Wishlist} />
      <Tab.Screen name='ContactUs' component={ContactUs} />
      <Tab.Screen name='Language' component={Language} />
      <Tab.Screen name='Rating' component={Rating} />
      <Tab.Screen name='About' component={About} /> */}
      {/* <Tab.Screen name='FreeStuff' component={FreeStuff} /> */}
      {/* <Tab.Screen name='StuffDetails' component={StuffDetails} /> */}
      {/* <Tab.Screen name='PersonalInfo' component={PersonalInfo} /> */}
      <Tab.Screen name='AllGroups' component={AllGroups} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Stack.Screen
        name='BottomStack'
        component={BottomStack}
      /> */}
      <Stack.Screen
        name='SecondaryStack'
        component={SecondaryStack}
      />
    </Stack.Navigator>
  )
}

export default MainStack;


const styles = StyleSheet.create({
  iconView: {
    backgroundColor: '#373636',
    height: hp('6.5%'),
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    width: hp('6.5%'),
  }
})