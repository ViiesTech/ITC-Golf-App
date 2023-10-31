import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStatusBar from '../components/AppStatusBar'
import MainStack from './MainStack'
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator()

const Routes = () => {

    useEffect(() => {

        SplashScreen.hide()

    }, [])

    return (
        <>
            <AppStatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: 'fade_from_bottom'
                    }}
                >
                    {/* <Stack.Screen name='AuthStack' component={AuthStack} /> */}
                    <Stack.Screen name='MainStack' component={MainStack} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Routes;
