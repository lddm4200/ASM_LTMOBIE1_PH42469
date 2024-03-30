import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../layout/Register';
import Login from '../layout/Login';
import NavigationStack from './Navigation';

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='NavigationStack' component={NavigationStack} />
    </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})