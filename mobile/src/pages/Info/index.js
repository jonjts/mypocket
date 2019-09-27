import React from 'react'

import Card from '~/components/Card'
import Header from '~/components/Header'
import utils from '~/utils'

import logo from '../../assets/images/logo.png'

import {
    ScrollView,
    SafeAreaView,
    Image,
    View,
    Text,
} from 'react-native';

export default function Info({ navigation }) {

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }}>
            <Header
                showMenu={false}
                showBack={true}
                rightAcion={() => navigation.goBack()}
            />

            <View style={
                utils.styles.mainContainer
            }>
                <Text
                    style={
                        [utils.styles.headerSubTitle,]
                    }
                >
                    Informações
                </Text>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <Card
                        style={{
                            flex: 1,
                            marginTop: 50,
                            alignSelf: "center",
                            marginBottom: 20,
                        }}>
                        <View
                            style={[
                                utils.styles.avatar,
                                { alignSelf: 'center', marginTop: -50 }
                            ]}>
                            <Image
                                style={{ width: 85, height: 85 }}
                                source={logo} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 6 }}>
                            <Text style={utils.styles.simpleLabel}>
                                Aplicativo Desenvolvido Por
                            </Text>
                        </View>

                    </Card>
                </ScrollView>
            </View>
        </View>
    )

}