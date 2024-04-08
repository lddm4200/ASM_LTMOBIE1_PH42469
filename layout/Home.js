import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export const URL = 'http://192.168.67.67:3000';

const Home = (props) => {

    const [data, setdata] = useState([]);
    const [dataCF, setdataCF] = useState([]);
    const [dataCFBean, setdataCFBean] = useState([]);
    const [dataCountry, setdataCountry] = useState(['All']);
    const [index, setindex] = useState(0);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        let url = `${URL}/products`
        fetch(url)
            .then((res) => { return res.json() })
            .then((data => {
                setdata(data);
                const dataCF = data.filter((coffee) => coffee.type == 'water');
                setdataCF(dataCF);
                const dataCFBean = data.filter((coffee) => coffee.type == 'bean');
                setdataCFBean(dataCFBean);

                const filterUnique = (ArrCountry) => {
                    const uniqueSet = new Set(ArrCountry);
                    const filteredArr = Array.from(uniqueSet);
                    return filteredArr;
                }
                const ArrCountry = filterUnique(data.map((item) => item.country));
                ArrCountry.unshift('All')
                setdataCountry(ArrCountry);
                console.log(ArrCountry);

                setloading(false);
            }))
            .catch(err => console.log(err))
    }, []);



    const [selectedItem, setSelectedItem] = useState('All');

    const handlePress = (item) => {
        setSelectedItem(item);
    };

    const handleCoffee = (country) => {
        if (country == 'All') {
            const dataCF = data.filter((coffee) => coffee.type == 'water');
            setdataCF(dataCF);
            const dataCFBean = data.filter((coffee) => coffee.type == 'bean');
            setdataCFBean(dataCFBean);
        } else {
            const dataCF = data.filter((coffee) => coffee.type == 'water' && coffee.country == country);
            setdataCF(dataCF);
            const dataCFBean = data.filter((coffee) => coffee.type == 'bean'  && coffee.country == country);
            setdataCFBean(dataCFBean);
        }
    }


    if (loading) {
        return (
            // Hiển thị một phần nào đó để người dùng biết dữ liệu đang được tải
            <View style={styles.container}>
                <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: 'bold', marginBottom: 40 }}>
                    Find the best {'\n'}coffee for you
                </Text>

                <View style={{ borderRadius: 15, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', backgroundColor: '#141921', marginBottom: 40 }}>
                    <View style={{ marginHorizontal: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../image/Vectorsearch.png')} tintColor={'gray'} />
                    </View>

                    <TextInput placeholder='Find Your Coffee...' placeholderTextColor='#52555A' color='#ffffff' />
                </View>

                {/* Flatlist do du lieu Xuất xứ của Coffee theo chiều ngang*/}
                <FlatList
                    horizontal={true} style={{ marginBottom: 30 }}
                    scrollEnabled={true}
                    data={dataCountry}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { handlePress(item), handleCoffee(item) }}>
                            <Text style={[styles.textName, { textAlign: 'center', color: item === selectedItem ? '#D17842' : '#52555A' }]}>
                                {item}
                                {'\n'}
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item === selectedItem ? '#D17842' : 'black' }}></View>

                            </Text>
                        </TouchableOpacity>
                    }>
                </FlatList>

                <Text style={styles.textBase}>Loading...</Text>

            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* ScrollView Home */}
            <ScrollView>
                <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: 'bold', marginBottom: 40 }}>
                    Find the best {'\n'}coffee for you
                </Text>

                <View style={{ borderRadius: 15, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', backgroundColor: '#141921', marginBottom: 40 }}>
                    <View style={{ marginHorizontal: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../image/Vectorsearch.png')} tintColor={'gray'} />
                    </View>

                    <TextInput placeholder='Find Your Coffee...' placeholderTextColor='#52555A' color='#ffffff' />
                </View>

                {/* Flatlist do du lieu Xuất xứ của Coffee theo chiều ngang*/}
                <FlatList
                    horizontal={true} style={{ marginBottom: 30 }}
                    scrollEnabled={true}
                    data={dataCountry}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { handlePress(item), handleCoffee(item)}}>
                            <Text style={[styles.textName, { textAlign: 'center', color: item === selectedItem ? '#D17842' : '#52555A' }]}>
                                {item}
                                {'\n'}
                                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item === selectedItem ? '#D17842' : 'black' }}></View>

                            </Text>
                        </TouchableOpacity>
                    }>
                </FlatList>

                {/*Do du lieu len itemSanPham Caffee */}
                <FlatList
                    extraData={index}
                    horizontal={true}
                    scrollEnabled={true}
                    data={dataCF}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View style={styles.item}>
                            {/* Ảnh itemSanPham */}
                            <View style={styles.item_anh}>
                                <Image style={styles.item_anh_img} source={{
                                    uri: item.img
                                }} />
                                <View style={styles.item_anh_img_view}>
                                    <Image style={{ width: 10, height: 10, marginLeft: 10 }} source={require('../image/Vectorstart.png')} tintColor={'#D17842'} />
                                    <Text style={[styles.textName, { color: '#FFFFFF', fontSize: 10, marginRight: 5 }]}>{item.star}</Text>
                                </View>
                            </View>
                            {/* Nội dung */}
                            <View>
                                <Text style={[styles.textBase]}>
                                    {'\n'}
                                    {item.name} {'\n'}
                                    <Text style={{ fontSize: 10 }}>{item.title}</Text>
                                </Text>

                                <View style={styles.item_noidung}>
                                    <Text style={[styles.textBase, { fontSize: 20, fontWeight: 'bold' }]}>
                                        <Text style={{ color: '#D17842' }}>$</Text> {item.price}
                                    </Text>

                                    <TouchableOpacity onPress={() => props.navigation.navigate("ChitietSP", { item: item })}>
                                        <View style={styles.item_noidung_img}>
                                            <Image style={{ width: 14, height: 14 }} source={require('../image/Vectoradd.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }>

                </FlatList>

                <View style={{ marginVertical: 20 }}>
                    <Text style={[styles.textBase, { fontSize: 18 }]}>Coffee beans</Text>
                </View>

                {/* Flatlist do du lieu itemSanPham cà phê hạt  */}
                <FlatList
                    extraData={index}
                    horizontal={true}
                    scrollEnabled={true}
                    data={dataCFBean}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View style={styles.item}>
                            {/* Ảnh itemSanPham */}
                            <View style={styles.item_anh}>
                                <Image style={styles.item_anh_img} source={{ uri: item.img }} />
                            </View>

                            {/* Nội dung */}
                            <View>
                                <Text style={[styles.textBase]}>
                                    {'\n'}
                                    {item.name} {'\n'}
                                    <Text style={{ fontSize: 10 }}>{item.title}</Text>
                                </Text>

                                <View style={styles.item_noidung}>
                                    <Text style={[styles.textBase, { fontSize: 20, fontWeight: 'bold' }]}>
                                        <Text style={{ color: '#D17842' }}>$</Text> {item.price}
                                    </Text>

                                    <TouchableOpacity onPress={() => props.navigation.navigate("ChitietSP", { item: item })}>
                                        <View style={styles.item_noidung_img}>
                                            <Image style={{ width: 14, height: 14 }} source={require('../image/Vectoradd.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    }>

                </FlatList>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        height: '100%',
        padding: 20,
    },
    textName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 20,
        color: '#52555A'
    },
    textBase: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    item: {
        borderRadius: 28,
        backgroundColor: '#141921',
        padding: 14,
        width: 150,
        height: 250,
        marginRight: 15
    },
    item_anh: {
        flexDirection: 'row', width: '100%', height: '60%'
    },
    item_anh_img: {
        width: '100%', height: '100%', borderRadius: 20
    },
    item_anh_img_view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        borderBottomLeftRadius: 80,
        borderTopRightRadius: 70,
        height: 22,
        width: 50,
        position: 'absolute',
        right: 0,
        paddingVertical: 3
    },
    item_noidung: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    item_noidung_img: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#D17842',
        borderRadius: 6
    }
})