import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
var styles = require('./styles');
import logo from '../../assets/images/logo.png'
import calendar from '../../assets/images/calendar.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInputMask } from 'react-native-masked-text'
import TextField from '../../components/TextField';
import PasswordTextField from '../../components/PasswordTextField';
import MaskTextField from '../../components/MaskTextField';

import validation from '../../validation/validation'
import rules from './rules'

import {
    Platform,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
export default function SignUp({ navigation }) {

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

    function handleContinuar() {
        if (lastStep) {
            const result = validation({
                "password": password,
                "dataNascimento": dataNascimento,
            }, {
                password: rules.password,
                dataNascimento: rules.dataNascimento
            })
            setErrors(result ? result : {})
        } else {
            const result = validation({
                "email": email,
                "nome": nome,
            }, {
                email: rules.email,
                nome: rules.nome
            })
            setErrors(result ? result : {})

            if (!result) {
                setLastStep(!lastStep)
            }
        }
    }

    managePasswordVisibility = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#7AE3DD', '#25ABC9']} style={styles.linearGradient}>
                <ScrollView
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
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start',paddingBottom: 10 }}>
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
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10}}>
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
                                            forwardedRef={(input) => { this.secondTextInput = input; }}
                                            placeholder="Informe a sua senha..."
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={hidePassword}
                                            value={password}
                                            onChangeText={setPassword}
                                            style={styles.input} />
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10}}>
                                        <Text style={[styles.label]}>
                                            Data de nascimento
                                    </Text>
                                        <View style={styles.textBoxBtnHolder}>
                                            <MaskTextField
                                                error={errors.dataNascimento}
                                                type={'datetime'}
                                                style={[styles.input,]}
                                                placeholder='Sua data de nascimento...'
                                                returnKeyType={"next"}
                                                autoCorrect={false}
                                                forwardedRef={(input) => { this.emailTextInput = input; }}
                                                options={{
                                                    format: 'DD/MM/YYYY'
                                                }}
                                                value={dataNascimento}
                                                onChangeText={setDataNascimento}
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