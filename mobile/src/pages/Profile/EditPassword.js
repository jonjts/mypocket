import React, { useState, useEffect } from 'react';

import validation from '../../validation/validation'
import rules from '../Auth/rules'
import moment from "moment";
import PasswordTextField from '~/components/PasswordTextField'
import GradientButton from '~/components/buttons/GradientButton'
import Progress from '~/components/modal/Progress'
import AlertModal from '~/components/modal/AlertModal'
import api from '~/services/api'

import Card from '~/components/Card'
import Header from '~/components/Header'
import utils from '~/utils'
import Icon from 'react-native-vector-icons/Feather';
import getRealm from '~/services/realm'
import AsyncStorage from '@react-native-community/async-storage'

var styles = require('./styles');

import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity
} from 'react-native';

const Edit = ({ navigation }) => {

    const [email, setEmail] = useState(navigation.getParam("email"))
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [hidePassword, setHidePassword] = useState(true)
    const [hideOldPassword, setOldHidePassword] = useState(true)
    const [showProgress, setShowProgress] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')


    function setErrorMensage(data) {
        if (!data) {
            return
        }
        try {
            setErrors(data ? data : {})
        } catch (error) {
            console.log('nao é uma mensagem de error valida')
        }
    }

    async function valid(user) {
        const result = validation(user, {
            oldPassword: rules.password,
            password: rules.password
        })
        setErrorMensage(result)
        return !result
    }

    async function handleAlterar() {
        const user = {
            oldPassword: oldPassword,
            password: password
        }
        const isValid = await valid(user)
        if (isValid) {
            await updatePassword(user)
        }
    }

    async function updatePassword(user) {
        setShowProgress(true)
        try {
            await api.put('/password', user)
            navigation.goBack()
        } catch (error) {
            console.log(error)
            setShowAlert(true)
            if (error.status) {
                setAlertText("Não foi possível finalizar operação. Tente novamente mais tarde.")
            } else {
                setAlertText("Não foi possível finalizar operação: Verifique sua senha atual")
            }
        }
        setShowProgress(false)
    }

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }}>
            <Progress isVisible={showProgress} />
            <AlertModal isVisible={showAlert} text={alertText} onComfirm={() => setShowAlert(false)} />
            <Header
                showBack={true}
                rightAcion={() => navigation.goBack()}
            />
            <View style={
                utils.styles.mainContainer
            }>
                <Text
                    style={
                        utils.styles.headerSubTitle
                    }
                >
                    Editar Perfil
                </Text>
                <Card style={{ flex: 1, marginTop: 50, alignSelf: "center", paddingLeft: 0, paddingRight: 0, }}>
                    <View
                        style={[utils.styles.avatar,
                        { alignSelf: 'center', marginTop: -50 }]}
                    >
                        <Icon
                            name="user"
                            size={24}
                            color="#fff"
                        />
                    </View>
                    <Text style={styles.email}>
                        {email}
                    </Text>
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                    //contentContainerStyle={{ flex: 1, justifyContent: 'space-between', }}
                    >
                        <KeyboardAvoidingView
                            style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                            behavior='padding'
                            enabled={Platform.OS === 'ios'}>

                            <View
                                style={{
                                    flex: 1,
                                    direction: 'column',
                                    justifyContent: 'center',
                                    marginBottom: 36
                                }}
                            >
                                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                                    <PasswordTextField
                                        error={errors.oldPassword}
                                        label="Senha atual"
                                        placeholder="Sua senha atual..."
                                        value={oldPassword}
                                        onChangeText={setOldPassword}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={hideOldPassword}
                                        style={styles.input} />
                                </View>
                                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 15 }}>
                                    <PasswordTextField
                                        error={errors.password}
                                        label="Nova senha"
                                        placeholder="Sua nova senha..."
                                        value={password}
                                        onChangeText={setPassword}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={hidePassword}
                                        style={styles.input} />
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-around',
                                    }}>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', height: 30,}}
                                        onPress={() => navigation.goBack()}>
                                        <Text
                                            style={{ color: '#105762' }}
                                        >
                                            VOLTAR
                                    </Text>
                                    </TouchableOpacity>
                                    <GradientButton
                                        text="ALTERAR"
                                        style={{ elevation: 4, alignSelf: 'center' }}
                                        onPress={handleAlterar} />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Card>
            </View>
        </View>
    )
}

export default Edit