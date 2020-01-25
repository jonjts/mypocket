import React, { useState, useEffect } from 'react';

var styles = require('./styles');
import getRealm from '../../services/realm';
import utils from '../../utils'
import LinearGradient from 'react-native-linear-gradient';

import {
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default function Wellcome({ navigation }) {

  const screen = navigation.getParam('screen')

  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('Bem Vindo')
  const [extraMensagem, setExtraMensagem] = useState('')
  const [imagem, setImagem] = useState(require('~/assets/images/logo.png'))

  useEffect( () => {
     fillUserData()
  }, [])

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }

  async function goToMain() {
    await this.performTimeConsumingTask();

    navigation.navigate('Main')

  }

  async function fillUserData() {
    const realm = await getRealm();
    const credentials = await utils.credentials()

    const user = realm.objects('User').filtered(` id = '${credentials.user_id}'`)[0];
    console.log(user)
    setNome(user.nome)

    if (screen) {
      switch (screen) {
        case 'Signin':
          //matem os valores
          setMensagem('Bem Vindo de Volta')
          break;
        case 'Signup':
          setExtraMensagem('Cadastro Realizado com Sucesso!')
          break;
      }
    }
    await goToMain()
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#7AE3DD', '#25ABC9']} style={styles.linearGradient}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -50, paddingBottom: 10 }}>
            <Image
              style={{ width: 85, height: 85 }}
              source={imagem} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.title}>
              {mensagem}
            </Text>
            <Text style={styles.nome}>
              {nome}
            </Text>
            {
              extraMensagem ?
                <>
                  <View style={styles.line} />
                  <Text style={styles.extraMensagem}>
                    {extraMensagem}
                  </Text>
                </>
                : null
            }
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}