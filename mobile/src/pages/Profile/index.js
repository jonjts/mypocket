import React, { useState, useEffect } from 'react';

import moment from "moment";

import Card from '~/components/Card'
import Header from '~/components/Header'
import utils from '~/utils'
import Icon from 'react-native-vector-icons/Feather';
import getRealm from '~/services/realm'
import QuestionModal from '~/components/modal/QuestionModal'

var styles = require('./styles');

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UsersActions from "../../store/ducks/users";

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const Profile = ({ navigation, updateUserSuccess }) => {

    const [user, setUser] = useState({})
    const [showLogout, setShowLogout] = useState(false)


    useEffect(() => {
        fillUserData()
    }, [])

    function handleLogout() {
        utils.logout()
        navigation.navigate('Auth')

    }

    function handleEditBasic() {
        navigation.navigate('EditProfile')
    }

    function handleEditPassword() {
        navigation.navigate('EditPassword', { email: user.email })
    }

    async function fillUserData() {
        const realm = await getRealm();
        const credentials = await utils.credentials()

        const user = realm.objects('User').filtered(` _id = '${credentials.user_id}'`)[0];
        setUser(user)

    }

    function formatDate(dataNascimento) {
        const newDataNascimento = moment(dataNascimento, 'DD/MM/YYYY')
        return newDataNascimento.format('DD/MM/YYYY')
    }


    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }}>
            <Header />
            <QuestionModal
                isVisible={showLogout}
                confirmAction={handleLogout}
                cofirmText="SIM"
                backText="NÃO"
                backAction={() => setShowLogout(false)}
            >

                <Text style={[styles.email, {fontSize: 16}]}>
                    Deseja sair?
                </Text>

            </QuestionModal>
            <View style={
                utils.styles.mainContainer
            }>
                <Text
                    style={
                        [utils.styles.headerSubTitle,]
                    }
                >
                    Perfil
                </Text>
                <Card style={{ flex: 1, marginTop: 50, alignSelf: "center" }}>
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
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.email}>
                            {user.email}
                        </Text>
                        <TouchableOpacity
                            onPress={handleEditBasic}
                        >
                            <View style={styles.containerValue}>
                                <Icon
                                    name="edit-2"
                                    color="#BDBDBD"
                                    size={14}
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.label}>
                                        Nome
                                </Text>
                                    <Text style={styles.value}>
                                        {user.nome}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleEditBasic}
                        >
                            <View style={styles.containerValue}>
                                <Icon
                                    name="calendar"
                                    color="#BDBDBD"
                                    size={14}
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.label}>
                                        Nascimento
                                </Text>
                                    <Text style={styles.value}>
                                        {formatDate(user.dataNascimento)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ paddingTop: 6, paddingBottom: 19 }}>
                            <View style={[styles.line,]} />
                        </View>

                        <TouchableOpacity
                            style={{ paddingBottom: 10 }}
                            onPress={handleEditPassword}
                        >
                            <View style={styles.containerValue}>
                                <Icon
                                    name="key"
                                    color="#BDBDBD"
                                    size={14}
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.value}>
                                        Alterar Senha
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowLogout(!showLogout)}
                        >
                            <View style={styles.containerValue}>
                                <Icon
                                    name="power"
                                    color="#BDBDBD"
                                    size={14}
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.value}>
                                        Sair
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </Card>
            </View>
        </View>
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
)(Profile);