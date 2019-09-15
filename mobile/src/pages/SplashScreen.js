import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../assets/images/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Platform,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

export default function SplashScreen({ navigation }) {

    const viewStyles = [
        { backgroundColor: 'orange' }
    ];
    const textStyles = {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    };

    useEffect(() => {
        goToAuth()
    }, [])

    async function goToAuth() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
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
                <View style={[{ display: 'flex', flexDirection: 'row', paddingTop: 20}]}>
                <Text style={[textStyle]}>
                    MY
                </Text>
                <Text style={[textStyle, {fontWeight:'bold'}]}>
                    POCKET
                </Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );

}