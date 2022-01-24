import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../../../screens/Home'
import LoginScreen from '../../../screens/Auth/Login'
import AddNewPost from '../../../screens/NewPost/components/AddNewPost'
import { ROUTES } from '../../Route'
import SignUpScreen from '../../../screens/Auth/SignUp'

const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

const SignedInStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.HomeScreen} screenOptions={screenOptions}>
                <Stack.Screen name={ROUTES.HomeScreen} component={HomeScreen}></Stack.Screen>
                <Stack.Screen name={ROUTES.AddNewPost} component={AddNewPost}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const SignedOutStack = () =>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.Login} screenOptions={screenOptions}>
                <Stack.Screen name={ROUTES.Login} component={LoginScreen}></Stack.Screen>
                <Stack.Screen name={ROUTES.SignUp} component={SignUpScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export {SignedInStack,SignedOutStack}
