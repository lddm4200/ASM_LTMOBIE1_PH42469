import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserManager = ( props ) => {
  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.item_ic,{marginRight: 30}]} onPress={() => props.navigation.goBack()}>
                    <Image source={require('../image/Vectorback.png')} tintColor={'gray'} />
                </TouchableOpacity>
                <Text style={[styles.textItem, { fontSize: 24 }]}>Profile</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={{ width: 200, height: 200, padding: 20 }}>
                    <Image style={styles.img} source={{uri:'https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/279079857_508103187678767_2151458973526708309_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE6BaxSv7wt5G8ncsCCuDc1XMVIIZi5r8dcxUghmLmvx7Yo9DehO7kPv7bjRkgVGTvGkIVgdO70ObS0mkXe11Rt&_nc_ohc=09PCxVI2MaMAX9qWW_1&_nc_ht=scontent.fhan5-6.fna&oh=00_AfC-RKdf34G1D8AxH0eiqu1J8bMWXV2UMm_AZ02f2nS-TA&oe=65FBB45C'}} />
                </View>

                <View>
                    <View>
                        <TouchableOpacity style={styles.item}>
                            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                                <View style={[styles.item_ic]}>
                                    <Image style={styles.icon} source={require('../image/phone.png')} />
                                </View>
                                <Text style={styles.textItem}>+8415790206</Text>
                            </View>
                            <View></View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.item}>
                            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                                <View style={[styles.item_ic]}>
                                    <Image style={styles.icon} source={require('../image/letter.png')} />
                                </View>
                                <Text style={styles.textItem}>longddm2k4@gmail.com</Text>
                            </View>
                            <View></View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.item}>
                            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                                <View style={[styles.item_ic]}>
                                    <Image style={styles.icon} source={require('../image/fb.png')} />
                                </View>
                                <Text style={styles.textItem}>Minh Long</Text>
                            </View>
                            <View></View>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <TouchableOpacity style={styles.item}>
                            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                                <View style={[styles.item_ic]}>
                                    <Image source={require('../image/Vectoraddress.png')} />
                                </View>
                                <Text style={styles.textItem}>Nam Định</Text>
                            </View>
                            <View></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
  )
}

export default UserManager

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C0F14',
    width: '100%',
    height: '100%',
    padding: 20
},
header: {
    backgroundColor: '#0C0F14',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
},
textItem: {
    fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center'
},
item_ic: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141921',
    width: 34, height: 34,
    borderRadius: 14,
    justifyContent: 'center',
},
img: {
    width: '100%',
    height: '100%',
    borderRadius: 100
},
item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#555555',
    padding: 10,
    marginTop: 12,
    borderRadius: 16
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