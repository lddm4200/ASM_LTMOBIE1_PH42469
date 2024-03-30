import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationStack from './navigation/Navigation'
import Welcome from './layout/Welcome'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './navigation/AuthNavigator'
import Home from './layout/Home'


const App = () => {

  const [getWelcome, setWelcome] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcome(false)
    }, 2000);

    return () => clearTimeout(timeout);
  })

  return (
    getWelcome ? <Welcome />
      : <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({

})