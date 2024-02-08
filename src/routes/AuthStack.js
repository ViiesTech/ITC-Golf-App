import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import AppStatusBar from '../components/AppStatusBar';
import ForgetPassword from '../screens/auth/ForgetPassword';
import VerifyToken from '../screens/auth/VerifyToken';
import UpdatePassword from '../screens/auth/UpdatePassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <>
            <AppStatusBar />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom'
                }}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
                <Stack.Screen name='VerifyToken' component={VerifyToken} />
                <Stack.Screen name='UpdatePassword' component={UpdatePassword} />
            </Stack.Navigator>
        </>
    )
}

export default AuthStack
