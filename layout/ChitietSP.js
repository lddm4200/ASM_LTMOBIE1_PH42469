import { Alert, FlatList, Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './Home'
import { indexFavorite } from './Favorite';

const ChitietSP = ({ navigation, route }) => {
    const item = route.params?.item;

    const [isFavorite, setisFavorite] = useState(item.favorite)
    const [getChooso1, setChooso1] = useState(false)
    const [getChooso2, setChooso2] = useState(false)
    const [getChooso3, setChooso3] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDGVisible, setModalDGVisible] = useState(false);
    const [quantity, setquantity] = useState('100')

    const [selectedItem, setSelectedItem] = useState(0);
    const handlePress = (index) => {
        setSelectedItem(index);
    };

    const handleFavorite = async () => {
        const updatedFavorite = !isFavorite; // Đảo ngược trạng thái yêu thích

        const itemUpdate = {
            id: item.id,
            name: item.name,
            title: item.title,
            price: item.price,
            star: item.star,
            img: item.img,
            country: item.country,
            type: item.type,
            favorite: updatedFavorite, // Cập nhật trạng thái yêu thích mới
            description: item.description,
        };

        let url = `${URL}/products/${route.params?.item.id}`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemUpdate)
            });

            if (response.ok) {
                setisFavorite(updatedFavorite); // Cập nhật trạng thái yêu thích trong component
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantity = (value) =>{
        setquantity(value)
    }

    const addCart = async () => {
        const NewCart = {
            productId: item.id,
            quantity: quantity
        }

        let url = `${URL}/carts`

        try{
            const response = await fetch(url,{
                method: "POST",
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(NewCart)
            })
            if(response.ok){
                ToastAndroid.show("Thêm thành công",0);
            }else{
                ToastAndroid.show("Thêm thất bại",0);
            }
        }catch(err){
            console.log(err);
        }
    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />

            <ImageBackground style={{ flex: 1 }}
                source={{
                    uri: item.img
                }}>
                <View style={styles.header}>
                    <View style={styles.tabar}>
                        <TouchableOpacity style={styles.button_ic}
                            onPress={() => navigation.goBack()}>
                            <Image source={require('../image/Vectorback.png')} /></TouchableOpacity>
                        <TouchableOpacity style={styles.button_ic}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={require('../image/Vectorabout.png')} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.body}>

                    <TouchableOpacity style={[styles.button_ic_hear]} onPress={() => { handleFavorite() }}>
                        <Image source={require('../image/Vectorhear.png')} tintColor={isFavorite ? 'red' : 'gray'} />
                    </TouchableOpacity>

                    <View style={styles.body_content}>
                        {/* phan thong tin  */}
                        <View style={[styles.item_img_info]}>
                            <View style={styles.item_img_info_row}>
                                <View style={{ width: '100%' }}>
                                    <Text style={[styles.textBase, { fontSize: 20, fontWeight: 'bold' }]}>{item.name}</Text>
                                    <Text style={[styles.textBase, { fontSize: 10, color: '#AEAEAE' }]}>{item.title}</Text>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={styles.item_img_info_row_ic}>
                                        <Image source={require('../image/coffee2.png')} tintColor={'#D17842'} />
                                        <Text style={[styles.textBase, { fontSize: 10, color: '#AEAEAE', textAlign: 'center' }]}>Coffee</Text>
                                    </View>
                                    <View style={styles.item_img_info_row_ic}>
                                        <Image source={require('../image/Vectorwater.png')} tintColor={'#D17842'} />
                                        <Text style={[styles.textBase, { fontSize: 10, color: '#AEAEAE', textAlign: 'center' }]}>Milk</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.item_img_info_row}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <Image source={require('../image/Vectorstart.png')} tintColor={'#D17842'} />
                                    <Text style={[styles.textBase, { fontSize: 20, fontWeight: 'bold', marginHorizontal: 7 }]}>{item.star}</Text>
                                    <Text style={[styles.textBase, { fontSize: 10, color: '#AEAEAE' }]}>(6,879)</Text>
                                </View>
                                <View style={[styles.item_img_info_row_ic, { width: '80%', height: '80%', marginLeft: 15 }]}>
                                    <Text style={[styles.textBase, { fontSize: 10, color: '#AEAEAE' }]}>{item.country}</Text>
                                </View>
                            </View>

                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
                                <TouchableOpacity style={[styles.item_img_info_row_ic, { width: '30%', height: '70%', backgroundColor: getChooso1 ? '#D17842' : '#0C0F14' }]}
                                    onPress={() => { setChooso1(!getChooso1), setChooso2(false), setChooso3(false), handleQuantity('100') }}>
                                    <Text style={[styles.textBase, { fontSize: 13 }]}>100 g</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.item_img_info_row_ic, { width: '30%', height: '70%', backgroundColor: getChooso2 ? '#D17842' : '#0C0F14' }]}
                                    onPress={() => { setChooso2(!getChooso2), setChooso1(false), setChooso3(false),handleQuantity('200') }}>
                                    <Text style={[styles.textBase, { fontSize: 13 }]}>200 g</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.item_img_info_row_ic, { width: '30%', height: '70%', backgroundColor: getChooso3 ? '#D17842' : '#0C0F14' }]}
                                    onPress={() => { setChooso3(!getChooso3), setChooso2(false), setChooso1(false),handleQuantity('300') }}>
                                    <Text style={[styles.textBase, { fontSize: 13 }]}>300 g</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={{ height: '50%' }}>
                            <Text style={[styles.textBase_1, { color: 'white' }]}>Thông tin sản phẩm</Text>

                            <Text style={styles.body_content_txt}>
                                {item.description}</Text>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>${item.price}</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>/100g</Text>
                </View>
                <TouchableOpacity style={styles.footer_button} onPress={()=> addCart()}>
                    <Text style={[styles.textBase_1, { color: '#D17842' }]}>Thêm vào giỏ</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableOpacity style={[styles.button, { flex: 0, padding: 20, margin: 10 }]}
                        onPress={() => { setModalVisible(!modalVisible), navigation.navigate('Contact') }}>
                        <Text style={{ color: 'white' }}>Liên hệ người bán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { flex: 0, padding: 20, margin: 10 }]}
                        onPress={() => { setModalVisible(!modalVisible), setModalDGVisible(!modalDGVisible) }}>
                        <Text style={{ color: 'white' }}>Đánh giá sản phẩm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { flex: 0, padding: 20, margin: 10 }]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ color: 'white' }}>Trở về</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDGVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <Text style={styles.textBase}>Đánh giá của bạn về sự hài lòng cho sản phẩm này</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <FlatList
                            horizontal={true} style={{ padding: 20, marginHorizontal: '20%' }}
                            scrollEnabled={true}
                            data={[1, 2, 3, 4, 5]}
                            renderItem={({ index }) =>
                                <TouchableOpacity style={{ margin: 10 }}
                                    onPress={() => handlePress(index)}>
                                    <Image source={require('../image/Vectorstart.png')} tintColor={index <= selectedItem ? '#D17842' : 'white'} />
                                </TouchableOpacity>
                            }>
                        </FlatList>
                    </View>
                    <TouchableOpacity style={[styles.button, { flex: 0, padding: 20, margin: 10 }]}
                        onPress={() => { setModalDGVisible(!modalDGVisible), Alert.alert('Đánh giá của bạn đã được ghi nhận') }}>
                        <Text style={{ color: 'white' }}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default ChitietSP

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    header: {
        flex: 6,
        justifyContent: 'space-between'
    },
    body: {
        flex: 5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },
    body_content: {
        gap: 15,
        paddingTop: 20,
    },
    body_content_txt: {
        fontSize: 14,
        color: 'white',
    },
    footer: {
        height: 60,
        backgroundColor: '#D17842',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    footer_button: {
        padding: 8,
        backgroundColor: 'white',
        width: '40%',
        alignItems: 'center',
        borderRadius: 10

    },
    tabar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: 20,
    },
    button: {
        width: '80%', backgroundColor: '#9999CC', borderRadius: 10, alignItems: 'center', justifyContent: 'center'
    },
    button_ic: {
        width: 34,
        height: 34,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    button_ic_hear: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        position: 'absolute',
        right: 20,
        top: -25,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18
    },
    textBase: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Browood'
    },
    textBase_1: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    header_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    header_title_ic: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10
    },
    item_img_info: {
        width: '100%',
        height: 140,
        gap: 4
    },
    item_img_info_row: {
        width: '50%', height: '33%', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center'
    },
    item_img_info_row_ic: {
        flexDirection: 'column', backgroundColor: '#0C0F14', padding: 5,
        borderRadius: 8, justifyContent: 'space-around',
        alignItems: 'center', width: 50, height: 50,
        borderWidth: 1, borderColor: 'gray'
    },
})