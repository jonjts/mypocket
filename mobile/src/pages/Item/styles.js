'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;


module.exports = StyleSheet.create({
    cardLabel: {
        fontSize: 13,
        paddingTop: 8,
        justifyContent: 'space-around'
    },
    cardMoney: {
        fontSize: 18,
        paddingTop: 11,
        paddingBottom: 25,
    },
    cardContainer: {
        width: 158,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formElement: {
        paddingRight: 25,
        paddingLeft: 25
    },
    labelInput: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: "space-between",
        fontSize: 12,
        color: '#BDBDBD',
        lineHeight: 28,
    }

})