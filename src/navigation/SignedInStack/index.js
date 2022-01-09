import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../../screens/Home'
import AddNewPost from '../../screens/NewPost/components/AddNewPost'
import { ROUTES } from '../Route'

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

export default SignedInStack
