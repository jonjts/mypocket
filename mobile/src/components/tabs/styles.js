'use strict';

var React = require('react-native');

var { StyleSheet, } = React;

module.exports = StyleSheet.create({

    indicator: {
        height: 3,
        width: 48, 
        backgroundColor: '#E0E0E0',
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 10
    },
    buttonAdd: {
        height: 75,
        width: 75,
        borderRadius: 100,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});