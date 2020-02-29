import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const Card = ({ ...props }) => {

    return (
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: Dimensions.get('window').width * 0.88,
        paddingLeft: 25,
        paddingRight: 25,
        display: 'flex',
        flex: 1
    },
});

export default Card;