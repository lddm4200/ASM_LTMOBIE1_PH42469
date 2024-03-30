import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = (  props  ) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.item,{left: 20,bottom: 0}]} onPress={()=> props.navigation.navigate('Setting')}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#141921', width: 34, height: 34, borderRadius: 14 }}>
                        <Image source={require('../image/Vectormenu.png')} tintColor={'gray'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item,{right: 20, bottom: 0}]} onPress={()=> props.navigation.navigate('UserManager')}>
                    <Image style={styles.imgHeader} source={require('../image/ic_person.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        width: '100%',
        height: '8%',
        paddingTop: 48,
        paddingBottom: 16
    },
    header: {
        backgroundColor: '#0C0F14',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    item:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    imgHeader: {
        width: 34,
        height: 34,
        borderRadius: 12,
    }
})