import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../layout/Home';
import Favorite from '../layout/Favorite';
import Header from './Header';

import Contact from '../layout/Contact';
import Setting from '../layout/Setting'
import UserManager from '../layout/UserManager'
import ChitietSP from '../layout/ChitietSP'
import Carts from '../layout/Carts'
import Order from '../layout/Order'
import Payment from '../layout/Payment'





const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeScreens(){
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#D17842',
      tabBarInactiveBackgroundColor: 'black',
      tabBarActiveBackgroundColor: 'black',
    }}>
      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color, size }) => <Image source={require('../image/Vectorhome.png')} tintColor={color} />
        }}
        name=" "
        component={Home}
         />

      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color, size }) => <Image source={require('../image/Vectorbag1.png')} tintColor={color} />
        }}
        name="  "
        component={Carts}
         />

      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color, size }) => <Image source={require('../image/Vectorhear.png')} tintColor={color} />
        }}
        name="    "
        component={Favorite}
         />

      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color, size }) => <Image source={require('../image/Vectornotice.png')} tintColor={color} />
        }}
        name="     "
        component={Order} 
        />
    </Tab.Navigator>
  )
}

const NavigationStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name='HomeScreens' component={HomeScreens}/> 
        <Stack.Screen name='Setting' component={Setting}/>
        <Stack.Screen name='Contact' component={Contact}/>
        <Stack.Screen name='UserManager' component={UserManager}/>
        <Stack.Screen name='ChitietSP' component={ChitietSP}/>
        <Stack.Screen name='Payment' component={Payment}/>
        <Stack.Screen name='Order' component={Order}/>
      </Stack.Navigator>
  )
}

export default NavigationStack

const styles = StyleSheet.create({})