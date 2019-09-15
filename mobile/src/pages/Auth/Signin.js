import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
var styles = require('./styles');
import logo from '../../assets/images/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../components/TextField';
import PasswordTextField from '../../components/PasswordTextField';
import AlertModal from '../../components/modal/AlertModal';
import Progress from '../../components/modal/Progress';

import validation from '../../validation/validation'
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

export default function Signin({ navigation }) {

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

    function handleEntrar() {
        const result = validation({
            "email": email,
            "password": password
        }, rules)
        setErrors(result)
    }

    managePasswordVisibility = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#7AE3DD', '#25ABC9']} style={styles.linearGradient}>
                <Progress isVisible={showProgress} />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1, justifyContent: 'space-between', paddinnBottom: 40, }}
                >
                    <KeyboardAvoidingView
                        style={styles.gridContainer}
                        behavior='padding'
                        enabled={Platform.OS === 'ios'}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -50, paddingBottom: 10 }}>
                                <Image
                                    style={{ width: 85, height: 85 }}
                                    source={logo} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.title}>
                                    Login
                            </Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', }}>
                                <TextField
                                    label="Email"
                                    placeholder="Email..."
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
                                    placeholder="Senha..."
                                    value={password}
                                    onChangeText={setPassword}
                                    forwardedRef={(input) => { this.secondTextInput = input; }}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={hidePassword}
                                    style={styles.input} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 23, paddingTop: 19 }}>
                                <TouchableOpacity>
                                    <Text
                                        style={[styles.labelForgetPassword, { textDecorationLine: 'underline' },]}
                                    >Esqueci Minha Senha</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
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