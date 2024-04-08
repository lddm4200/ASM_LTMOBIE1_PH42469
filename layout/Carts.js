import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { URL } from './Home';

const Carts = ({ navigation, route }) => {

    const [cart, setCart] = useState([]);
    const refCart = useRef(null);
    const [loading, setloading] = useState(true);

    
    const deleteCart = async (id) => {
        let url = `${URL}/carts/`+id
        await fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                ToastAndroid.show('Đã hủy sản phẩm khỏi giỏ hàng',0)
            })
    }

    const getData = async () => {
        const response = await fetch(`${URL}/carts`);
        const cartData = await response.json();
        const resopnseProduct = await fetch(`${URL}/products`);
        const listProduct = await resopnseProduct.json();
        const listCard = [];
        for (let i = 0; i < cartData.length; i++) {
            const product = listProduct.find(item => item.id == cartData[i].productId)
            if (product) {
                listCard.push({ ...product, ...cartData[i] })
            }
        }
        setloading(false)
        setCart(listCard);
        
    }

    useEffect(() => {
        refCart.current = cart
    }, [cart])

    useFocusEffect(
        React.useCallback(() => {
            getData();
            return async () => {
                for (let i = 0; i < refCart.current.length; i++) {
                    const element = refCart.current[i];
                    try {
                        const resopnse = await fetch(`${URL}/carts/${element.id}`, {
                            method: 'PATCH', body: JSON.stringify({
                                quantity: element.quantity
                            })
                        })
                    } catch (error) {
                        console.log('error ===', error)
                    }
                }
            }
        }, [])
    );

    const tongTien = cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    if (loading) {
        return (
            // Hiển thị một phần nào đó để người dùng biết dữ liệu đang được tải
            <View style={styles.container}>

                <Text style={styles.textBase}>Loading...</Text>

            </View>
        );
    }

    const CartCard = ({ item, index }) => {
        const [selectedSize, setSelectedSize] = useState(null);

        const handleSizeSelection = (size) => {
            setSelectedSize(size);
        };
        let showItem = true
        return !showItem ? null : (
            <View>
                <View style={styles.cartCard}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: item.img }} style={{ height: 130, width: 130, borderRadius: 10, }} />
                    </View>

                    <View style={{ flex: 1, gap: 7 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginLeft: 20 }}>{item.name}</Text>
                            <Text style={{ fontSize: 13, color: 'gray', marginLeft: 20 }}>
                                {item.country}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                paddingVertical: 7,
                                paddingHorizontal: 16,
                                borderRadius: 10,
                                marginTop: 10,
                                fontSize: 15,
                                fontWeight: 'bold',
                                backgroundColor: 'black',
                            }}
                            >
                                100</Text>
                            <Text style={{ color: 'white', marginTop: 15, marginHorizontal: 20, fontWeight: 'bold', fontSize: 20 }}> $ {item.price}</Text>
                        </View>

                        <View style={styles.click1}>
                            <TouchableOpacity onPress={() => {
                                setCart([...cart])
                                deleteCart(cart[index].id)
                            }}>
                                <Text style={styles.name}>-</Text>
                            </TouchableOpacity>

                            <TextInput style={styles.name1} keyboardType='numeric' onChangeText={() => {

                            }} />


                            <TouchableOpacity onPress={() => {

                            }}>
                                <Text style={styles.name}>+</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </View>

        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>

            <FlatList
                data={cart}
                renderItem={({ item, index }) => <CartCard key={item.id} item={item} index={index} />}

            />

            <View style={{ flexDirection: 'row', backgroundColor: 'black', width: '100%', height: 'auto', justifyContent: 'space-between', }}>
                <View>
                    <Text style={{ color: 'white', marginLeft: 20, marginTop: 10, fontSize: 15 }}>Total Price</Text>
                    <Text style={{ color: 'white', marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>{tongTien}$</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Payment",{tongTien: tongTien,cart:cart})}
                    style={{ backgroundColor: "orange", width: '50%', justifyContent: 'center', alignItems: 'center', marginLeft: 80, margin: 10, borderRadius: 15 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Pay</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Carts

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#0C0F14',
        height: '100%',
        padding: 20,
    },
    textBase: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: "white",
    },
    image1: {
        width: 40,
        height: 40,
        marginRight: 120,
        marginLeft: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    image2: {
        width: 40,
        height: 40,
        marginLeft: 130,
        borderRadius: 10,
        marginTop: 10,
    },
    name: {
        color: "white",
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: "orange",
        borderRadius: 5,

    },
    name1: {
        color: "white",
        marginHorizontal: 10,
        textAlign: 'center',
        borderWidth: 1,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'black',
        borderColor: "orange",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 0,


    },

    click1: {
        flexDirection: 'row',

    },

    cartCard: {
        height: 'auto',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        padding: 15,
        backgroundColor: '#262B33',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

})