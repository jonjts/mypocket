import React, { use } from 'react';

import utils from '~/utils'
import SelectMonth from '~/components/date/SelectMonth'
import Header from '~/components/Header'
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native';


// import { Container } from './styles';

export default ({
    month,
    onMonthChanged,
    children,
    monitorToHide,
    ...props }) => {

    return (
        <SafeAreaView style={[{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }]}>

            <View style={StyleSheet.absoluteFill, { flex: 1 }}>
                <Header
                />
                <View style={
                    utils.styles.mainContainer
                }>
                    <SelectMonth
                        monitorToHide={monitorToHide}
                        onMonthChanged={onMonthChanged}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flex: 1
                        }}
                    >
                        {children}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
