'use strict';

var React = require('react-native');

var { StyleSheet, } = React;

module.exports = StyleSheet.create({

    button: {
        height: 48,
        minWidth: 121,
        borderRadius: 100,
        elevation: 1,
    },
    buttonEntar: {
        height: 48,
        minWidth: 121,
        borderRadius: 100,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "500",
        lineHeight: 16,
        fontFamily: 'Roboto',
    },
});