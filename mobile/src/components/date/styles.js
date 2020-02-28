'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;
const maxHeight = Dimensions.get('window').height * 0.30;

module.exports = StyleSheet.create({

    card: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: (maxHeight / 2) - 12
    },
    input: {
        color: "#105762"
    },
    height: {
        height: 92
    },
    monthLabelContainer: {
        alignSelf: "center",
    },
    monthLabel: {
        color: '#fff',
        fontSize: 16,
        paddingRight: 10
    },
    selectorColor: {
        color: '#105762'
    },
    monthSelectorLabel: {
        maxWidth: 80,
        fontSize: 14,
    },
    cardNavigation: {
        width: 24,
        display: "flex",
        height: 24,
        alignSelf: 'center',
        marginTop: 2,
        backgroundColor: 'transparent',
        flex: 1,
    },
    cardNavigationRight: {
        marginLeft: -30,
        justifyContent: 'center',
        height: 40,
    },
    cardNavigationLeft: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: -30,
        height: 40,
    },
    iconLeft: {
        marginLeft: 20,
    },
    iconRight: {
        marginRight: 20,
    },
    textBoxBtnHolder: {
        position: 'relative',
        display: 'flex',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    visibilityBtn: {
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        right: 3,
        height: 40,
        width: 50,
        padding: 5
    },
    label: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: "space-between",
        fontSize: 12,
        color: '#BDBDBD',
        lineHeight: 28,
    },
});