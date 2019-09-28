import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../assets/images/logo.png'
import utils from '../../utils'

import { useDispatch } from 'react-redux'

import { CategoriasTypes } from '~/store/ducks/categorias'

import {
    StatusBar,
    SafeAreaView,
    Image,
    Text,
    View
} from 'react-native';
import util from '../../utils';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        goToAuth()
    }, [])

    const dispacth = useDispatch()

    async function goToAuth() {
        await this.performTimeConsumingTask();

        await dispacth({ type: CategoriasTypes.UPDATE_CATEGORIAS })

        const credentials = await util.credentials()

        if (credentials) {
            navigation.navigate('Main')
        } else {
            navigation.navigate('Auth')
        }
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1000
            )
        )
    }
    const textStyle = {
        fontWeight: "300",
        fontSize: 24,
        color: '#fff',
    }

    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#7AE3DD', '#25ABC9']}
                style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', }]}>
                <Image
                    style={{ width: 153, height: 153 }}
                    source={logo} />
                <View style={[{ display: 'flex', flexDirection: 'row', paddingTop: 20 }]}>
                    <Text style={[textStyle]}>
                        MY
                </Text>
                    <Text style={[textStyle, { fontWeight: 'bold' }]}>
                        POCKET
                </Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );

}