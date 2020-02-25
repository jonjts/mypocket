import getRealm from '../services/realm';
import AsyncStorage from '@react-native-community/async-storage'
import { Dimensions, StyleSheet } from 'react-native';

const maxHeaderHeight = Dimensions.get('window').height * 0.30;
const defaultPaddingHeader = - maxHeaderHeight * 0.65

const util = {
    isEmpty: (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    saveUser: async (data) => {
        const realm = await getRealm();

        realm.write(() => {
            const user = realm.objects('User').filtered(` id = '${data.user.id}'`);
            if (user.length == 0) {
                realm.create('User', data.user, true);
            }
        });

        await AsyncStorage.setItem('@token', data.auth.token)
        await AsyncStorage.setItem('@user-id', data.user.id)

        return data;
    },
    saveCategorias: async (data) => {
        const realm = await getRealm();

        for (item of data) {

            realm.write(() => {
                let categoria = realm.objects('Categoria').filtered(` id = '${item.id}'`);
                if (categoria.length == 0) {
                    realm.create('Categoria', item, true)
                } else {
                    categoria[0].nome = item.nome
                    categoria[0].alias = item.alias
                    categoria[0].ativo = item.ativo
                }
            });
        }
    },
    saveTipos: async (data) => {
        const realm = await getRealm();

        for (item of data) {

            realm.write(() => {
                let tipo = realm.objects('Tipo').filtered(` id = '${item.id}'`);
                if (tipo.length == 0) {
                    realm.create('Tipo', item)
                } else {
                    tipo[0].nome = item.nome
                    tipo[0].alias = item.alias
                    tipo[0].active = item.active
                }
            });
        }
    },
    credentials: async () => {
        const token = await AsyncStorage.getItem("@token")
        const userId = await AsyncStorage.getItem("@user-id")

        if (!token && !userId) {
            // Caso nao exits as crendenciais...
            return null
        }

        return {
            token: token,
            user_id: userId
        }
    }, formatNumber: (text) => {
        if (!text) {
            return null
        }
        text = text.replace('R$', '')
        text = text.replace('.', '')
        text = text.replace(',', '.')
        return parseFloat(text)
    }, getModel: async (modelName, id) => {
        const realm = await getRealm();
        let model = null
        realm.write(() => {
            model = realm.objects(modelName).filtered(` id = '${id}'`);
        });
        return model.length > 0 ? model[0] : null
    }, getUserModel: async () => {
        const credentials = await util.credentials();
        return await util.getModel('User', credentials.user_id)
    },
    logout: async () => {
        await AsyncStorage.clear()
        const credentials = await util.credentials()
        const realm = await getRealm();
        realm.write(() => {
            const user = realm.objects('User').filtered(` id = '${credentials.user_id}'`);
            realm.delete(user)
        });
    },
    headerHeight: () => {
        return maxHeaderHeight
    },
    defaultPaddingHeader: () => {
        return defaultPaddingHeader
    },
    styles: StyleSheet.create({
        mainContainer: {
            marginTop: defaultPaddingHeader,
            flex: 1, display: 'flex',
            //justifyContent: 'center',
            paddingRight: 21,
            paddingLeft: 21,
            //paddingBottom: 20,
        },
        headerSubTitle: {
            fontSize: 16,
            alignSelf: 'center',
            color: '#fff',
            paddingBottom: 10
        },
        avatar: {
            backgroundColor: '#3AB9CE',
            borderColor: '#fff',
            borderWidth: 1,
            borderEndColor: '#3AB9CE',
            borderRadius: 100,
            height: 80,
            width: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        simpleLabel: {
            color: '#BDBDBD',
            fontSize: 14
        },
        mainLabelColor: {
            color: '#004C58'
        }
    })

}

export default util;