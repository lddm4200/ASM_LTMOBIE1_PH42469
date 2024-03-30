import { Alert, Image, Modal, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Setting = ( props ) => {
  const [modalVisible, setmodalVisible] = useState(false);

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.item_ic, {marginRight: 30}]} onPress={()=>props.navigation.goBack()}>
          <Image source={require('../image/Vectorback.png')} tintColor={'gray'} />
        </TouchableOpacity>

        <Text style={[styles.textItem, { fontSize: 24 }]}>Setting</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={()=>{props.navigation.navigate('Order')}}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/Vectorhistory.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>History</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={()=>props.navigation.navigate('UserManager')}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/Vectorpersonal.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>Personal Details</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={()=> props.navigation.navigate('Contact')}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image style={styles.icon} source={require('../image/phone.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>Contact</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Payment')}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/Vectorpayment.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>Payment Method</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={()=>{
          ToastAndroid.show('Chức năng đang hoàn thiện',0)
        }}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/Vectorabout.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>About</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={()=>{
          ToastAndroid.show('Chức năng đang hoàn thiện',0)
        }}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/Vectorhepl.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>Help</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>


      <View>
        <TouchableOpacity style={styles.item} onPress={()=>{props.navigation.navigate('Login'),ToastAndroid.show('Đã đăng xuất',0)}}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={[styles.item_ic]}>
              <Image source={require('../image/logout.png')} tintColor={'orange'} />
            </View>
            <Text style={styles.textItem}>Log out</Text>
          </View>
          <Image source={require('../image/right-arrow.png')} tintColor={'gray'} style={styles.next} />
        </TouchableOpacity>
      </View>

      
      

    </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C0F14',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  header: {
    backgroundColor: '#0C0F14',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40
  },
  textItem: {
    fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#555555',
    padding: 10,
    marginTop: 12,
    borderRadius: 16
  },
  item_ic: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141921',
    width: 34, height: 34,
    borderRadius: 14,
    justifyContent: 'center',
    marginRight: 16,
  },
  next: {
    width: 28, height: 28,
    tintColor: 'black'
  },
  icon: {
    tintColor: 'orange',
    width: 24,
    height: 24
  }
})