import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import React from 'react'

const Welcome = () => {
  return (
    <View style = {styles.background}>
      <Image style={styles.img} source={require('../image/logo.png')}/>

      <ActivityIndicator color={'white'}/>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#0C0F14',
        alignItems: 'center',
        height: '100%'
    },
    img: {
        width: 160,
        height: 160,
        marginTop: 300,
    }
})