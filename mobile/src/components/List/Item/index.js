import React, { useState } from 'react';

import theme from '~/theme/light'
import Element from './Element'

import {
    View,
    FlatList,
    ActivityIndicator,
    Text,
    RefreshControl
} from 'react-native';

export default ({
    itens = [],
    loading = false,
    load = () => { },
    onMoreItens = () => { },
    onDelete = () => { },
    onEdit = () => { }
}) => {

    const progress = () => (
        <View
            style={{
                heigh: 400,
            }}
        >
            <ActivityIndicator
                size="small"
                color={theme.color.primary} />
        </View>
    )

    const emptyList = () => (
        <View
            key={(new Date()).toLocaleString()}
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
            }}
        >
            <Text
                style={{
                    color: theme.color.secondary,
                }}
            >
                {loading ? 'Procurando...' : 'Nenhum item encontrado'}
            </Text>

        </View>
    )

    const stickyHeaderIndices = (array) => {
        const headers = []
        array.map(element => {
            if (element.header) headers.push(array.indexOf(element))
        });
        headers.push(0)
        return headers
    }

    return (
        <FlatList
            invertStickyHeaders
            data={itens}
            renderItem={({ item }) => <Element key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} />}
            keyExtractor={item => item.id}
            ListFooterComponent={(loading && progress)}
            ListEmptyComponent={emptyList}
            onEndReached={() => {
                onMoreItens()
            }}
            onEndReachedThreshold={0.1}
            refreshControl={
                <RefreshControl
                    colors={[theme.color.primary, theme.color.success]}
                    refreshing={loading}
                    onRefresh={load} />
            }
            //stickyHeaderIndices={stickyHeaderIndices(itens)}
            refreshing={loading}
            onRefresh={load}

        />
    );
}
