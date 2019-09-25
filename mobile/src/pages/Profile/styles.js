'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;


module.exports = StyleSheet.create({
    email: {
        color: '#BDBDBD',
        fontSize: 14,
        paddingBottom: 15,
        paddingTop: 14,
        alignSelf: 'center'
    },
    label: {
        color: '#BDBDBD',
        fontSize: 12
    },
    value: {
        color: '#105762',
        fontSize: 14
    },
    containerValue: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 13
    },
    icon: {
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center'
    },
    line: {
        height: 1,
        backgroundColor: '#ECEBED',
        width: 248
    },
    visibilityBtn: {
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        top: 35,
        right: 3,
        height: 40,
        width: 35,
        padding: 5
    },

})