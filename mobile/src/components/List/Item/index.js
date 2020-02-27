import React, { useState } from 'react';

import theme from '~/theme/light'
import Element from './Element'
let uuid = require('react-native-uuid');

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
    onEdit = () => { },
    header,
    onScroll,
}) => {

    const progress = () => (
        <ActivityIndicator
            style={{
                height: 100
            }}
            size="small"
            color={theme.color.primary} />
    )

    const emptyList = () => (
        <View
            key={(new Date()).toLocaleString()}
            style={{
                display: 'flex',
                flex: 1,
                paddingTop: 12,
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

    return (
        <FlatList
            invertStickyHeaders
            data={itens}
            windowSize={2}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={({ item }) => <Element item={item} onDelete={onDelete} onEdit={onEdit} />}
            keyExtractor={(item) => item.id ? item.id : uuid.v1()}
            ListFooterComponent={(loading && progress)}
            ListEmptyComponent={emptyList}
            //onTouchStart={onScroll}
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
            ListHeaderComponent={header}
        // refreshing={loading}
        // onRefresh={load}

        />
    );
}
