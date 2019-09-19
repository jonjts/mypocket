import getRealm from '../services/realm';
import AsyncStorage from '@react-native-community/async-storage'

const util = {
    saveUser: async (data) => {
        const realm = await getRealm();

        console.log(data.user)

        realm.write(() => {
            //Limpa o banco
            let users = realm.objects('User')
            realm.delete(users)

            realm.create('User', data.user);
        });

        await AsyncStorage.setItem('@token', data.auth.token)
        await AsyncStorage.setItem('@user-id', data.user._id)

        return data;
    },
    credentials: async () => {
        const token = await AsyncStorage.getItem("@token")
        const userId = await AsyncStorage.getItem("@user-id")

        if(!token && !userId) {
            // Caso nao exits as crendenciais...
            return null
        }

        return {
            token: token,
            user_id: userId
        }
    },
    logout: async () =>{
        await AsyncStorage.clear()
    }

}

export default util;