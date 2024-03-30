import { Alert, Button, Image, Keyboard, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './Home';


const Login = (props) => {
    const [getpass, setpass] = useState('')
    const [getemail, setemail] = useState('');
    const [getErrStr, setErrStr] = useState('');
    const [getModalVisible, setModalVisible] = useState(false);
    const [getPassVisible, setPassVisible] = useState(false);


    const LoginComp = () => {
        // Kiểm tra dữ liệu
        if (getemail == '') {
            setErrStr('Email không được bỏ trống!');
            setModalVisible(true);
            return;
        }
        if (getpass == '') {
            setErrStr('Password không được bỏ trống!');
            setModalVisible(true);
            return;
        }
        // lấy dữ liệu về
        let url = `${URL}/users?email=` + getemail;

        fetch(url)
            .then((res) => { return res.json() })
            .then(async (res_login) => {
                if (res_login.length != 1) {
                    setErrStr('Email không chính xác!')
                    setModalVisible(true);
                    return;
                } else {
                    let obj = res_login[0];
                    if (obj.pass != getpass) {
                        setErrStr('Password không chính xác!');
                        setModalVisible(true);
                        return;
                    } else {
                        try {
                            await AsyncStorage.setItem('LoginInfo', JSON.stringify(obj));
                            props.navigation.navigate('NavigationStack')
                        } catch (e) {
                            console.log(e);
                        }
                    }
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
                    <Text style={styles.text12}>Login to Continue</Text>
                </Text>

                {/* Tài khoản mật khẩu */}
                <View style={[styles.input, { marginTop: 40 }]}>
                    <TextInput style={styles.input1}
                        placeholder='Email Address'
                        placeholderTextColor={'#828282'}
                        keyboardType='email-address'
                        value={getemail}
                        onChangeText={setemail}
                    />
                </View>
                <View style={styles.input} >
                    <TextInput style={styles.input1}
                        placeholder='Password'
                        placeholderTextColor={'#828282'}
                        secureTextEntry={getPassVisible ? false : true}
                        onChangeText={setpass} />
                    <TouchableOpacity
                        onPress={() => setPassVisible(!getPassVisible)}>
                        {getPassVisible
                            ?
                            <Image source={require('../image/an.png')} style={styles.eyeImage} />
                            :
                            <Image source={require('../image/hien.png')} style={styles.eyeImage} />}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Đăng nhập */}
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={() => LoginComp()}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonGG]}>
                    <Image source={require('../image/google.png')} style={styles.googleImage} />
                    <Text style={[styles.buttonText, styles.buttonTextGG]} >Sign in with Google</Text>
                </TouchableOpacity>
            </View>

            {/* Đăng Ký && Quên MK */}
            <View>
                <View style={[styles.textBottom, { marginTop: 20 }]}>
                    <Text style={[styles.baseText, styles.text12]}>Don't have account? Click</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={styles.textOrange}> Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textBottom}>
                    <Text style={[styles.baseText, styles.text12]}>Forget Password? Click</Text>
                    <TouchableOpacity>
                        <Text style={styles.textOrange}> Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={getModalVisible}>
                <View style={[{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                    <View style={[{ borderRadius: 40, marginHorizontal: 20, padding: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={styles.text16}>{getErrStr}</Text>
                        <TouchableOpacity style={styles.button}
                            onPress={() => setModalVisible(!getModalVisible)}>
                            <Text style={styles.baseText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

        </SafeAreaView>
    )
}

export default Login


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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        color: '#D17842',
        fontStyle: 'italic',
    },
    textBottom: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    }

})