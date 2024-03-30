import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Order = () => {

  const [loading, setloading] = useState(true);

  if (loading) {
    return (
        // Hiển thị một phần nào đó để người dùng biết dữ liệu đang được tải
        <View style={styles.container}>

            <Text style={styles.textBase}>Loading...</Text>

        </View>
    );
} 

  return (
    <View>
      <Text>Order</Text>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C0F14',
    height: '100%',
    padding: 20,
},
textBase: {
    color: '#FFFFFF',
    fontSize: 14,
},
})