import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './Home';

const Order = () => {
const [data, setdata] = useState([])
  const [loading, setloading] = useState(true);

 const getData=async()=>{
 await fetch(URL+"/orders")
  .then(res=>res.json())
  .then(data=>{
    setdata(data)
  }).catch(err=>console.log(err))
 }

 useEffect(()=>{
  getData()
 },[])

 const renderItem=({item})=>{
  return(
    <View style={{backgroundColor:'#141921',margin:10,borderRadius:20}}>
      <Text style={{textAlign:'center',fontSize:18,color:'green',margin:5}}>Đã thanh toán</Text>
    <View style={{flexDirection:'row',padding:20}}>
      <Image style={{width:100,height:120,borderRadius:20,marginRight:20}} source={{uri:item.img}}/>
      <View>
      <Text style={{fontSize:19,color:'white',margin:5}}>name: {item.name}</Text>
      <Text style={{fontSize:19,color:'white',margin:5}}>price: {item.price} $</Text>
      <Text style={{fontSize:19,color:'white',margin:5}}>star: {item.star}{'  '}
      <Image  style={{marginLeft:10,backgroundColor:'#FF9900'}} source={require('../image/Vectorstart.png')}/>
      </Text></View>
    </View></View>
  )
 }
  return (
    <View style={{backgroundColor:'#0C0F14',height:'100%'}}>
      <FlatList
      data={data}
      renderItem={renderItem}
      />
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