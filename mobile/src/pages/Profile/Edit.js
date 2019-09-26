import React, { useState, useEffect } from 'react';

import validation from '../../validation/validation'
import rules from '../Auth/rules'
import moment from "moment";
import TextField from '../../components/TextField';
import MaskTextField from '../../components/MaskTextField';
import GradientButton from '~/components/buttons/GradientButton'
import Progress from '~/components/modal/Progress'
import AlertModal from '~/components/modal/AlertModal'

import Card from '~/components/Card'
import Header from '~/components/Header'
import utils from '~/utils'
import Icon from 'react-native-vector-icons/Feather';
import getRealm from '~/services/realm'
import AsyncStorage from '@react-native-community/async-storage'

var styles = require('./styles');

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UsersActions from "../../store/ducks/users";

import {
    SafeAreaView,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity
} from 'react-native';

const Edit = ({ navigation, updateUser }) => {

    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});
    const [showProgress, setShowProgress] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')


    useEffect(() => {
        fillUserData()
    }, [])

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

    async function fillUserData() {
        const realm = await getRealm();
        const credentials = await utils.credentials()

        const user = realm.objects('User').filtered(` _id = '${credentials.user_id}'`)[0];
        setNome(user.nome)
        setDataNascimento(formatDate(user.dataNascimento))
        setEmail(user.email)
    }

    async function valid(user) {
        const result = validation(user, {
            nome: rules.nome,
            dataNascimento: rules.dataNascimento
        })
        setErrorMensage(result)
        return !result
    }

    async function handleAlterar() {
        const user = {
            nome: nome,
            dataNascimento: dataNascimento
        }
        const isValid = await valid(user)
        if (isValid) {
            const newDataNascimento = moment(dataNascimento, 'DD/MM/YYYY')
            // Se tudo estiver certo, cadastra...
            user["dataNascimento"] = newDataNascimento.format('YYYY-MM-DD')
            const credentials = await utils.credentials()
            user["_id"] = credentials.user_id
            await updateLocalUser(user)
        }
    }

    async function updateLocalUser(user) {
        try {
            const userId = await AsyncStorage.getItem("@user-id")
            const realm = await getRealm();

            realm.write(() => {
                const u = realm.objects('User').filtered(` _id = '${userId}'`)[0]
                u.nome = user.nome
                u.dataNascimento = user.dataNascimento
            });
            updateUser(user)
            navigation.goBack()
        } catch (error) {
            console.log(error)
            setShowAlert(true)
            if (error.status) {
                setAlertText("Não foi possível finalizar operação: Verifique sua conexão.")
            } else {
                setAlertText("Não foi possível finalizar operação. Tente novamente mais tarde.")
            }
        }
    }

    function formatDate(dataNascimento) {
        const newDataNascimento = moment(dataNascimento, 'DD/MM/YYYY')
        return newDataNascimento.format('DD/MM/YYYY')
    }


    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3', }}>
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
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <Card
                        style={{
                            flex: 1, marginTop: 50, alignSelf: "center",
                            paddingLeft: 0, paddingRight: 0, paddingBottom: 30, marginBottom: 10
                        }}>
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

                        <KeyboardAvoidingView
                            style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                            behavior='padding'
                            enabled={Platform.OS === 'ios'}>

                            <View style={{ paddingBottom: 10 }}>
                                <TextField
                                    autoCapitalize="words"
                                    label="Nome"
                                    placeholder='Podemos te chamar de...'
                                    value={nome}
                                    error={errors.nome}
                                    onChangeText={setNome}
                                    returnKeyType={"next"}
                                    autoCompleteType='email'
                                />
                            </View>

                            <View style={{ flexDirection: 'column', paddingBottom: 10 }}>
                                <View style={styles.textBoxBtnHolder}>
                                    <MaskTextField
                                        label="Data de nascimento"
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
                                    <View style={styles.visibilityBtn} >
                                        <Icon
                                            size={16}
                                            color="#D0C9D6"
                                            name="calendar" />
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    direction: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-around',
                                    }}>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', height: 30, paddingRight: 40 }}
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
                    </Card>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(UsersActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);