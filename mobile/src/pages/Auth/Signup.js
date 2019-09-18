import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
var styles = require('./styles');
import logo from '../../assets/images/logo.png'
import calendar from '../../assets/images/calendar.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../components/TextField';
import PasswordTextField from '../../components/PasswordTextField';
import MaskTextField from '../../components/MaskTextField';
import Progress from '../../components/modal/Progress';
import AlertModal from '../../components/modal/AlertModal';
import moment from "moment";

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
    View
} from 'react-native';
export default function SignUp({ navigation }) {

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [showProgress, setShowProgress] = useState(false)
    const [errors, setErrors] = useState({})
    const [hidePassword, setHidePassword] = useState(true)
    const [lastStep, setLastStep] = useState(false)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')

    const facebookIcon = <Icon name="facebook" size={13} color="#fff" />;
    const twitterIcon = <Icon name="twitter" size={13} color="#fff" />;
    const googleIcon = <Icon name="google" size={13} color="#fff" />;

    function handleSignin() {
        navigation.navigate('Signin')
    }


    async function handleContinuar() {
        if (lastStep) {
            const result = validation({
                "password": password,
                "dataNascimento": dataNascimento,
            }, {
                password: rules.password,
                dataNascimento: rules.dataNascimento
            })
            setErrors(result ? result : {})
            if (!result) {
                const newDataNascimento = moment(dataNascimento, 'DD/MM/YYYY')
                // Se tudo estiver certo, cadastra...
                const user = {
                    "nome": nome,
                    "email": email,
                    "password": password,
                    "dataNascimento": newDataNascimento.format('YYYY-MM-DD')
                }
                await createUser(user)
            }
        } else {
            const result = validation({
                "email": email,
                "nome": nome,
            }, {
                email: rules.email,
                nome: rules.nome
            })
            setErrors(result ? result : {})
            const emailOK = await isEmailOk(email)
            if (!result && emailOK) {
                setLastStep(!lastStep)
            }
        }
    }

    async function isEmailOk(email) {
        setShowProgress(true)
        try {
            await api.get(`/check-user-email/${email}`)
            return true
        } catch (error) {
            if (!error.response) {
                setAlertText('Não foi possível acessar o servidor')
                setShowAlert(true)
            } else {
                setErrorMensage([{
                    field: 'email',
                    message: error.response.data
                }])
            }
        } finally {
            setShowProgress(false)
        }
        return false
    }

    async function createUser(user) {
        setShowProgress(true)
        try {
            const response = await api.post("/users", user)
            const data = response.data
            const token = data.auth.token
            await AsyncStorage.setItem('@token', token)
            setErrorMensage([{
                field: 'nenhum',
                message: token
            }])
        } catch (error) {
            if (!error.status) {
                setAlertText('Não foi possível acessar o servidor')
                setShowAlert(true)
            } else {
                setErrorMensage(error.response.data)
            }
        }
        setShowProgress(false)
    }

    function setErrorMensage(data) {
        try {
            const field = data[0].field
            const message = data[0].message
            setErrors({
                [field]: message
            })
            setShowAlert(true)
            setAlertText(message)
        } catch (error) {
            console.log('nao é uma mensagem de error valida')
        }
    }

    managePasswordVisibility = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Progress isVisible={showProgress} />
            <AlertModal isVisible={showAlert} text={alertText} onComfirm={() => setShowAlert(false)} />
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#7AE3DD', '#25ABC9']} style={styles.linearGradient}>
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
                                    Nova Conta
                                    </Text>
                            </View>
                            {!lastStep &&
                                <>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                                        <TextField
                                            label="Nome"
                                            forwardedRef={(input) => { this.nomeTextInput = input; }}
                                            placeholder='Podemos te chamar de...'
                                            value={nome}
                                            onChangeText={setNome}
                                            style={[styles.input,]}
                                            error={errors.nome}
                                            autoCorrect={false}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => { this.emailTextInput.focus(); }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                                        <TextField
                                            value={email}
                                            onChangeText={setEmail}
                                            label="Email"
                                            error={errors.email}
                                            forwardedRef={(input) => { this.emailTextInput = input; }}
                                            style={[styles.input,]}
                                            placeholder='Seu melhor email...'
                                            returnKeyType={"next"}
                                            autoCorrect={false}
                                            autoCompleteType='email'
                                        />
                                    </View>
                                </>
                            }
                            {lastStep &&
                                <>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                                        <PasswordTextField
                                            label="Senha"
                                            error={errors.password}
                                            placeholder="Informe a sua senha..."
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={hidePassword}
                                            value={password}
                                            onChangeText={setPassword}
                                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            style={styles.input} />
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                                        <Text style={[styles.label]}>
                                            Data de nascimento
                                    </Text>
                                        <View style={styles.textBoxBtnHolder}>
                                            <MaskTextField
                                                onChangeText={(formatted, extracted) => {
                                                    setDataNascimento(formatted)
                                                }}
                                                error={errors.dataNascimento}
                                                type={'datetime'}
                                                style={[styles.input,]}
                                                placeholder='Sua data de nascimento...'
                                                returnKeyType={"next"}
                                                autoCorrect={false}
                                                options={{
                                                    format: 'DD/MM/YYYY'
                                                }}
                                                value={dataNascimento}
                                                paddingLeft={16}
                                            />
                                            <View style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                                                <Image
                                                    style={{ width: 16, height: 16, alignItems: 'center', alignSelf: 'center' }}
                                                    source={calendar} />
                                            </View>
                                        </View>
                                    </View>
                                </>
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 35, paddingBottom: 20 }}>
                                <TouchableOpacity
                                    style={styles.buttonEntar}
                                    activeOpacity={0.5}
                                    onPress={handleContinuar}
                                >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                        colors={['#7AE3DD', '#25ABC9']}
                                        style={[styles.linearGradient, { borderRadius: 100, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }]}>
                                        <Text
                                            style={styles.labelEntrar}
                                        >{lastStep ? 'CADASTRAR' : 'CONTINUAR'}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line} />
                            <View style={{ flexDirection: 'column', justifyContent: 'center', paddingBottom: 21, paddingTop: 15 }}>
                                <Text
                                    style={[styles.labelForgetPassword, { alignSelf: 'center' }]}
                                >Ou cadastre-se com:</Text>
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
                                onPress={handleSignin}>
                                <Text
                                    style={[styles.labelForgetPassword, { textDecorationLine: 'underline', color: '#fff' },]}
                                >Já tem conta? Faça seu login aqui!</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView >
    )
}