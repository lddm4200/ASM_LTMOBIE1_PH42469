import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { URL } from './Home';

const Payment = ({ route, navigation }) => {

    const [payments, setPayments] = useState([
        { title: 'Wallet', image: require('../image/wallet.png'), highlight: false, subTitle: '$ 100' },
        { title: 'Google Pay', image: require('../image/ggpay.png'), highlight: false },
        { title: 'Apple Pay', image: require('../image/applepay.png'), highlight: false },
        { title: 'Amazon Pay', image: require('../image/amazonpay.png'), highlight: false }])

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.item_ic, { marginRight: 30 }]} onPress={() => navigation.goBack()}>
                        <Image source={require('../image/Vectorback.png')} tintColor={'gray'} />
                    </TouchableOpacity>

                    <Text style={[styles.textItem, { fontSize: 24 }]}>Payment Method</Text>
                </View>

                <View style={{ borderRadius: 10, borderColor: 'orange', borderWidth: 1, margin: 10, paddingVertical: 10 }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: 'bold', marginBottom: 10 }}>Credit Card</Text>
                    <View style={{ borderRadius: 20, backgroundColor: '#262B33', borderWidth: 1, marginHorizontal: 10, height: 200 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image
                                source={require('../image/card1.png')}
                                style={{ margin: 15 }}
                            />
                            <Image
                                source={require('../image/Groupvisa.png')}
                                style={{ margin: 10, height: 15, width: 50 }}
                            />

                        </View>

                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 30, marginLeft: 5 }}> 1 6 0 2   2 0 0 1    0 3 4 5    6 3 0 1 </Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ color: 'gray', marginTop: 30 }}> Card Holder Name </Text>
                            <Text style={{ color: 'gray', marginTop: 30 }}> Expiry Date</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }}> Rine </Text>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }}> 02/30 </Text>

                        </View>
                    </View>

                </View>

                {payments.map((item, index) => {
                    return <TouchableOpacity onPress={() => {
                        for (let i = 0; i < payments.length; i++) {
                            payments[i].highlight = false;

                        }
                        payments[index].highlight = true;
                        setPayments([...payments])
                    }} key={item.title} style={[styles.khung, { backgroundColor: item.highlight ? '#D17842' : 'gray' }]}>
                        <View style={styles.press}>
                            <Image
                                source={item.image}
                            />
                            <Text style={styles.textPayment}>{item.title}</Text>
                            {item.subTitle ? <Text style={{ marginLeft: 150, color: 'white', fontSize: 15 }}>{item.subTitle}</Text> : null}

                        </View>

                    </TouchableOpacity>
                })}



            </View>

            <View style={{ flexDirection: 'row', position: 'absolute', top: 650, backgroundColor: 'black', width: '100%', height: 70 }}>
                <View>
                    <Text style={{ color: 'white', marginLeft: 10, marginTop: 10, fontSize: 15 }}>Total Price</Text>
                    <Text style={{ color: 'white', marginLeft: 10, fontSize: 25, fontWeight: 'bold' }}>$ </Text>
                </View>
                <TouchableOpacity onPress={async () => {
                    ToastAndroid.show('Chức năng chưa hoàn thiện',0)
                }}
                    style={{ backgroundColor: "#D17842", width: '55%', justifyContent: 'center', alignItems: 'center', marginLeft: 80, margin: 10, borderRadius: 15 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 19, fontWeight: 'bold' }}>Pay from Credit Card</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        width: '100%',
        height: '100%',
        padding: 20,
      },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        color: "white",
    },
    khung: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 15,
        marginHorizontal: 10,
        backgroundColor: 'black',
        marginTop: 10,
    },
    press: {
        flexDirection: 'row',
        padding: 10,
        top: 0,
        left: 10,
        alignItems: 'center',
    },
    textPayment: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        left: 10,
    }, header: {
        backgroundColor: '#0C0F14',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40
    },
    textItem: {
        fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center'
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
})