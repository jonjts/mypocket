'use strict';

var React = require('react-native');

var { StyleSheet, } = React;

module.exports = StyleSheet.create({

    modal: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle:{
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#105762'
    },
    contentMessage:{
        color: '#BDBDBD',
        paddingBottom: 19,
        paddingTop: 10
    },
    content: {
        backgroundColor: 'white',
        //flexDirection: 'row',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentButton: {
        //flexDirection: 'row',
        //flex: 1,
        position: 'absolute'
    }
});