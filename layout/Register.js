import { Alert, Button, Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { URL } from './Home'

const Register = ({ navigation }) => {
    const [getEmail, setEmail] = useState('')
    const [getPass, setPass] = useState('')
    const [getRePass, setRePass] = useState('')
    const [getFullname, setFullname] = useState('')

    const [VisiblePass, setVisiblePass] = useState(false);
    const [VisibleRePass, setVisibleRePass] = useState(false)
  

    const handleAddUser = () => {
        if (getFullname == '') {
            Alert.alert('Name không được bỏ trống!');
            return;
        }
        if (getEmail == '') {
            Alert.alert('Email không được bỏ trống!');
            return;
        }
        if (getPass == '') {
            Alert.alert('Pass không được bỏ trống!');
            return;
        }
        if (getPass != getRePass) {
            Alert.alert('Password không trùng khớp');
            return;
        }

        // Tạo một đối tượng chứa dữ liệu của user mới
        const newUser = {
            email: getEmail,
            pass: getPass,
            fullname: getFullname,
        }
        // gọi API để thêm user mới vào JSON SERVER
        let url = `${URL}/users`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => {
                if (res.ok) {
                    ToastAndroid.show('Đăng ký thành công',0);
                    navigation.navigate('Login', {
                        emailRegis: getEmail
                    })
                } else {
                    Alert.alert('Error', 'Đăng ký không thành công');
                }
            })

    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.background}>
                <Image style={styles.img} source={require('../image/logo.png')} />
                <Text style={styles.baseText}>
                    <Text style={styles.text16}>Welcome to Lungo !!</Text>
                    {'\n\n'}
                    <Text style={styles.text12}>Register to Continue</Text>
                </Text>

                {/* Nhập thông tin */}
                <TextInput style={styles.input}
                    placeholder='Name'
                    placeholderTextColor={'#828282'}
                    onChangeText={setFullname} />
                <TextInput style={styles.input}
                    placeholder='Email'
                    placeholderTextColor={'#828282'} keyboardType='email-address'
                    onChangeText={setEmail}
                    value={getEmail} />
                <View style={styles.input} >
                    <TextInput style={styles.input1}
                        placeholder='Password'
                        placeholderTextColor={'#828282'}
                        secureTextEntry={VisiblePass ? false : true}
                        onChangeText={setPass} />
                    <TouchableOpacity onPress={() => {
                        setVisiblePass(!VisiblePass);
                    }}>
                        {VisiblePass
                            ?
                            <Image source={require('../image/an.png')} style={styles.eyeImage} />
                            :
                            <Image source={require('../image/hien.png')} style={styles.eyeImage} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.input} >
                    <TextInput style={styles.input1}
                        placeholder='Re-type password'
                        placeholderTextColor={'#828282'}
                        secureTextEntry={VisibleRePass ? false : true}
                        onChangeText={setRePass} />
                    <TouchableOpacity onPress={() => setVisibleRePass(!VisibleRePass)}>
                        {VisibleRePass
                            ?
                            <Image source={require('../image/an.png')} style={styles.eyeImage} />
                            :
                            <Image source={require('../image/hien.png')} style={styles.eyeImage} />}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Đăng Ký */}
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={() => { handleAddUser(); }}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

            {/* Quay về đăng nhập */}
            <View style={[styles.textBottom, { marginTop: 20 }]}>
                <Text style={[styles.baseText, styles.text12]}>Don't have account? Click</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textOrange}> Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        height: '100%',
    },
    background: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
    img: {
        width: 120,
        height: 120,
        marginTop: 60,
    },
    baseText: {
        color: '#FFFFFF',
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text12: {
        fontSize: 14,
        color: '#828282',
    },
    text16: {
        fontSize: 16,
    },
    input1: {
        paddingStart: -2,
        width: '90%',
        color: 'white',
    },
    input: {
        alignItems: 'center',
        borderColor: '#252A32',
        borderWidth: 1,
        width: '100%',
        borderRadius: 8,
        color: 'white',
        marginTop: 20,
        paddingStart: 20,
        height: 50,
        flexDirection: 'row',
    },
    button: {
        width: '94%',
        height: 50,
        backgroundColor: '#D17842',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginTop: 40
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonGG: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,
        justifyContent: 'space-around'
    },
    buttonTextGG: {
        color: '#000000',
        paddingRight: 70
    },
    googleImage: {
        width: 20,
        height: 20,
    },
    eyeImage: {
        width: 20,
        height: 20,
        tintColor: 'gray'
    },
    textOrange: {
        color: '#D17842',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    textBottom: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    }
})