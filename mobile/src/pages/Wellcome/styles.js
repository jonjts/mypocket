'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;


module.exports = StyleSheet.create({
    container: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        minHeight: 200,
        alignSelf: "center",
        width: 320,
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
        paddingLeft: 25,
        paddingRight: 25,
    },
    line: {
        width: 248,
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#BDBDBD',
        marginTop: 21,
        marginBottom: 21,
    },
    cardContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    title: {
        fontSize: 16,
        color: '#BDBDBD',
        alignSelf: 'center',
    },
    nome: {
        fontSize: 41,
        color: '#105762',
    },
    extraMensagem:{
        fontSize: 16,
        color: '#105762',
        paddingBottom: 48,
    }
})