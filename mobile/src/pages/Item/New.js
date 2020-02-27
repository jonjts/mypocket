import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text
} from 'react-native';
import utils from '~/utils'
import Header from '~/components/Header'
import Form from './Form'

import styles from './styles';

export default function New({ navigation, ...props }) {

    const [title, setTitle] = useState('Novo')

    useEffect(() => {
        if (navigation.state.params && navigation.state.params.item) {
            setTitle('Alterar')
        }
    }, [navigation])

    return (
        <>
            <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3', }}>
                <Header
                    showBack={true}
                    rightAcion={() => navigation.goBack()}
                    title={title}
                />
                <Form
                    {...props}
                    navigation={navigation}
                />
            </SafeAreaView>
        </>
    );
}
