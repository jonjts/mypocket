import getRealm from '../services/realm';
import AsyncStorage from '@react-native-community/async-storage'
import { Dimensions, StyleSheet } from 'react-native';

const maxHeaderHeight = Dimensions.get('window').height * 0.30;
const defaultPaddingHeader = - maxHeaderHeight * 0.65

const util = {
    saveUser: async (data) => {
        const realm = await getRealm();

        console.log(data.user)

        realm.write(() => {
            const user = realm.objects('User').filtered(` _id = '${data.user._id}'`);
            console.log(user)
            if (user.length == 0) {
                realm.create('User', data.user);
            }
        });

        await AsyncStorage.setItem('@token', data.auth.token)
        await AsyncStorage.setItem('@user-id', data.user._id)

        return data;
    },
    saveCategorias: async (data) => {
        const realm = await getRealm();
        
        console.log(data)

        realm.write(() => {
            const categorias = data.filter((item) => {
                const categoria = realm.objects('Categoria').filtered(` _id = '${item._id}'`);
                return categoria.length == 0

            })
            realm.create('Categoria', categorias)
        });
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
    },
    logout: async () => {
        await AsyncStorage.clear()
        const credentials = await util.credentials()
        const realm = await getRealm();
        realm.write(() => {
            const user = realm.objects('User').filtered(` _id = '${credentials.user_id}'`);
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