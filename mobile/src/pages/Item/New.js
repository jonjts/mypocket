import React from 'react';
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
    return (
        <>
            <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3', }}>
                <Header
                    showBack={true}
                    rightAcion={() => navigation.goBack()}
                />
                <View style={
                    utils.styles.mainContainer
                }>
                    <Text
                        style={[utils.styles.headerSubTitle, { paddingBottom: 23 }]}
                    >
                        {
                            (navigation.state.params && navigation.state.params.item) ?
                                'Alterar' :
                                'Novo'
                        }
                    </Text>
                    <Form
                        {...props}
                        navigation={navigation}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}
