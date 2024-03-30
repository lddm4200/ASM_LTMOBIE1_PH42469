import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './Home';
import { useFocusEffect } from '@react-navigation/native';


const Favorite = (props) => {

    const [ColorHeart, setColorHeart] = useState(true);
    const [data, setdata] = useState([]);
    const [index, setindex] = useState(0);
    const [loading, setloading] = useState(true);


    const getData = async() => {
            let url = `${URL}/products?favorite=1`
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    setdata(data);
                    setindex(data.lenght)
                    setloading(false)
                })
                .catch(err => console.log(err))
    }

    useFocusEffect(
        React.useCallback(() => {
            getData()
        },[])
    )

    if (loading) {
        return (
            // Hiển thị một phần nào đó để người dùng biết dữ liệu đang được tải
            <View style={styles.container}>

                <Text style={styles.textBase}>Loading...</Text>

            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                extraData={index}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() =>{setloading(true), props.navigation.navigate("ChitietSP", { item: item })}}>
                        <View style={[styles.item]}>
                            {/* Ảnh */}
                            <View style={{ width: '100%', height: '76%' }}>

                                {/* anh san SanPham */}
                                <Image style={[styles.item_img]} source={{ uri: item.img }} />

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
                                </View>

                                {/* Nut yeu thich */}
                                <View style={[styles.item_heart]}>
                                    <View></View>
                                    <View style={[styles.item_img_info_row_ic, { width: 34, height: 34 }]}>
                                        <TouchableOpacity onPress={() => setColorHeart(!ColorHeart)}>
                                            <Image source={require('../image/Vectorhear.png')} tintColor={'red'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {/* Nội dung */}
                            <View style={{ width: '100%', height: '24%', padding: 20 }}>
                                <Text style={[styles.textBase]} numberOfLines={5}>
                                    <Text style={[{ color: '#AEAEAE', fontWeight: 'bold', fontSize: 16 }]}>Description</Text>{'\n'}
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>}
            ></FlatList>
        </SafeAreaView>
    )
}

export default Favorite

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
    item: {
        backgroundColor: '#141921',
        width: '100%',
        height: 540,
        borderRadius: 25
    },
    item_img: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    item_img_info: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        justifyContent: 'space-between'

    },
    item_img_info_row: {
        width: '50%', height: '60%', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center'
    },
    item_img_info_row_ic: {
        flexDirection: 'column', backgroundColor: '#0C0F14', padding: 5,
        borderRadius: 8, justifyContent: 'space-around',
        alignItems: 'center', width: 50, height: 50
    },
    item_heart: {
        position: 'absolute', width: '100%', top: 20, right: 20,
        height: '20%', justifyContent: 'space-between', flexDirection: 'row',
    }

})