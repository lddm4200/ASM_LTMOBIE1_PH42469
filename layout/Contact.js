import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import { URL } from './Home';

const ContactScreen = ({ navigation }) => {

    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [content, setcontent] = useState('');


    const [showErrors, setshowErrors] = useState(false);
    const [errors, seterrors] = useState({});

    const getErrors = (email, name, phone, content) => {
        const errors = {};
        if (!email) {
            errors.email = "Vui lòng nhập Email"
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.email = "Email không hợp lệ";
        }

        if (!name) {
            errors.name = "Vui lòng nhập Name"
        } else if (name.length < 6) {
            errors.name = "Tên phải có tối thiểu 6 ký tư"
        }

        if (!phone) {
            errors.phone = "Vui lòng nhập Password"
        } else if (phone.length > 10) {
            errors.phone = "Số điện thoại chỉ chứa tối đa 10 ký tự"
        }

        if (!content) {
            errors.content = "Vui lòng nhập nội dung"
        }
        return errors;
    }
    const handelSubmit = async () => {
        const errors = getErrors(email, name, phone, content);
        if (Object.keys(errors).length > 0) {
            setshowErrors(true)
            seterrors(errors)
            console.log(errors);
        } else {
            const response = await fetch(`${URL}/contacts`, {
                method: 'POST',
                body: JSON.stringify({
                    id: Date.now() + Math.random(),
                    email: email,
                    name: name,
                    phone: phone,
                    content: content
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const result = await response.json();
            if (result.id) {
                seterrors({});
                setshowErrors(false);
                ToastAndroid.show('Gửi thành công', ToastAndroid.SHORT);
                // navigation.goBack();
            }

        }

    }

    useFocusEffect(
        React.useCallback(() => {    
          return () => {
            setemail('');
            setname('');
            setphone('');
            setcontent('');
            
          }
        }, [])
      );


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={[styles.item_ic,{marginRight: 30}]} onPress={() => navigation.goBack()}>
                    <Image source={require('../image/Vectorback.png')} tintColor={'gray'} />
                </TouchableOpacity>
                <Text style={[styles.textItem, { fontSize: 24 }]}>Contact</Text>
            </View>

            <ScrollView>

                <Image
                    source={require('../image/logo.png')}
                    style={{ width: 200, height: 200, alignSelf: 'center' }}

                />
                <KeyboardAvoidingView style={{gap: 14}}>



                    {/* // Nhập username */}
                    <TextInput
                        style={styles.khung}
                        value={email}
                        onChangeText={(txt) => { setemail(txt) }}
                        placeholder="Email Address"
                        placeholderTextColor="gray"
                    />

                    {errors.email && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.email}
                        </Text>
                    )}
                    {/* // Nhập name */}
                    <TextInput
                        style={styles.khung}
                        value={name}
                        onChangeText={(txt) => { setname(txt) }}
                        placeholder="Name"
                        placeholderTextColor="gray"


                    />
                    {errors.name && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.name}
                        </Text>
                    )}

                    <TextInput
                        style={styles.khung}
                        value={phone}
                        onChangeText={(txt) => { setphone(txt) }}
                        placeholder="Phone"
                        placeholderTextColor="gray"
                        keyboardType="phone-pad"

                    />

                    {errors.phone && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.phone}
                        </Text>
                    )}

                    <TextInput
                        style={styles.khungContent}
                        multiline
                        numberOfLines={4}
                        value={content}
                        onChangeText={(txt) => { setcontent(txt) }}
                        placeholder="Messenger"
                        placeholderTextColor="gray"

                    />
                    {errors.content && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.content}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={() => handelSubmit()}
                        style={styles.khungButton}

                    >
                        <Text style={{ color: "white", textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactScreen

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

    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: "white",
    },
    image1: {
        width: 40,
        height: 40,
        marginRight: 110,
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

    khung: {
        borderColor: "#D17842",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        color: "white",
        fontSize: 20
    },

    khungContent: {
        borderColor: "#D17842",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        color: "white",
        fontSize: 20,
        minHeight: 80,
    },
    khungButton: {
        backgroundColor: "#D2691E",
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        margin: 15,
        width: '30%',
        flex: 1,
        alignSelf: 'center'

    },

    call: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },

    call1: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    }



})