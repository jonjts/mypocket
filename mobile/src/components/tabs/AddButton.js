import React, { Component } from 'react';
var styles = require('./styles');
import { TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export default function AddButton({ navigation, forwardedRef, ...rest }) {

    return (
        <TouchableOpacity
            {...rest}
            style={[styles.buttonAdd, rest.style]}
            activeOpacity={0.5}
        >
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                colors={['#7AE3DD', '#25ABC9']}
                style={[styles.linearGradient, { borderRadius: 100, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' },]}>
                <Icon name="plus" size={24} color="#fff" />
            </LinearGradient>
        </TouchableOpacity>
    )
}