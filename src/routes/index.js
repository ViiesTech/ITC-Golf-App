import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import SplashScreen from 'react-native-splash-screen'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const Routes = () => {

    const { token } = useSelector(state => state.AuthReducer)
    console.log(token)

    useEffect(() => {

        SplashScreen.hide()

    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom'
                }}
            >
                {token ?
                    <Stack.Screen name='MainStack' component={MainStack} />
                    :
                    <Stack.Screen name='AuthStack' component={AuthStack} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
