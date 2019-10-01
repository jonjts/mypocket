import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
var styles = require('./styles');
import logo from '../../assets/images/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../components/TextField';
import PasswordTextField from '../../components/PasswordTextField';
import AlertModal from '../../components/modal/AlertModal';
import Progress from '../../components/modal/Progress';
import util from "../../utils";

import validation from '../../validation'
import rules from './rules'

import {
    Platform,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import api from '~/services/api';

export default function Signin({ navigation }) {

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showProgress, setShowProgress] = useState(false)

    const facebookIcon = <Icon name="facebook" size={13} color="#fff" />;
    const twitterIcon = <Icon name="twitter" size={13} color="#fff" />;
    const googleIcon = <Icon name="google" size={13} color="#fff" />;

    function handleSingnup() {
        navigation.navigate('Signup')
    }

    async function handleEntrar() {
        const user = {
            "email": email,
            "password": password
        }
        const result = validation(user,
            {
                "email": rules.email,
                "password": rules.password
            })
        setErrors(result ? result : {})
        if (!result) {
            await login(user);
        }
    }

    function loged(){
        console.log('nova tela')
        navigation.navigate('Wellcome', { screen: 'Signin'})
    }

    async function login(user) {
        setShowProgress(true)
        try {
            const response = await api.post('/sessions', user)
            const data = response.data
            const token = data.auth.token
            await util.saveUser(data)
            console.log('terminou o save')
            loged()
        } catch (error) {
            console.log(error)
            if (!error.response) {
                setAlertText('Não foi possível acessar o servidor')
            } else {
                setAlertText('Usuário ou senha inválido(s)')
            }
            setShowAlert(true)
        } finally {
            setShowProgress(false)
        }

    }

    managePasswordVisibility = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#7AE3DD', '#25ABC9']} style={styles.linearGradient}>
                <Progress isVisible={showProgress} />
                <AlertModal isVisible={showAlert} text={alertText} onComfirm={() => setShowAlert(false)} />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1, justifyContent: 'space-between', paddinnBottom: 30, }}
                >
                    <KeyboardAvoidingView
                        style={styles.gridContainer}
                        behavior='padding'
                        enabled={Platform.OS === 'ios'}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -45, paddingBottom: 6 }}>
                                <Image
                                    style={{ width: 85, height: 85 }}
                                    source={logo} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.title}>
                                    Login
                            </Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 4}}>
                                <TextField
                                    label="Email"
                                    placeholder="Seu email..."
                                    value={email}
                                    error={errors.email}
                                    onChangeText={setEmail}
                                    returnKeyType={"next"}
                                    forwardedRef={(input) => { this.emailTxtInput = input; }}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    autoCompleteType='email'
                                />
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 15, }}>
                                <PasswordTextField
                                    error={errors.password}
                                    label="Senha"
                                    placeholder="Sua senha..."
                                    value={password}
                                    onChangeText={setPassword}
                                    forwardedRef={(input) => { this.secondTextInput = input; }}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={hidePassword}
                                    style={styles.input} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 16, paddingTop: 15 }}>
                                <TouchableOpacity>
                                    <Text
                                        style={[styles.labelForgetPassword, { textDecorationLine: 'underline' },]}
                                    >Esqueci Minha Senha</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15 }}>
                                <TouchableOpacity
                                    style={styles.buttonEntar}
                                    onPress={handleEntrar}
                                    activeOpacity={0.5}
                                >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                        colors={['#7AE3DD', '#25ABC9']}
                                        style={[styles.linearGradient, { borderRadius: 100, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }]}>
                                        <Text
                                            style={styles.labelEntrar}
                                        >ENTRAR</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line} />
                            <View style={{ flexDirection: 'column', justifyContent: 'center', paddingBottom: 21, paddingTop: 15 }}>
                                <Text
                                    style={[styles.labelForgetPassword, { alignSelf: 'center' }]}
                                >Ou Faça Login Com:</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 13 }}>
                                    <TouchableOpacity style={[styles.buttonSocial, { backgroundColor: "#3B5998" }]}>
                                        {facebookIcon}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.buttonSocial, { backgroundColor: "#04B8EC" }]}>
                                        {twitterIcon}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.buttonSocial, { backgroundColor: "#EB5757" }]}>
                                        {googleIcon}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 22, paddingBottom: 54 }}>
                            <TouchableOpacity
                                onPress={handleSingnup}>
                                <Text
                                    style={[styles.labelForgetPassword, { textDecorationLine: 'underline', color: '#fff' },]}
                                >Ainda não tem conta? Crie sua conta aqui!</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}