'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({

    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1
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
        width: 35,
        padding: 5
    },
    btnImage: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 20,
        width: 20,
    },
    textBoxBtnHolder: {
        position: 'relative',
        display: 'flex',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        display: 'flex',
        flex: 1,
    },
    gridContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 98,
    },
    logo: {
        position: 'absolute',
        height: 57,
        width: 138,
        left: '38%',
        right: '38.06%',
        top: '8.91%',
        bottom: '77.81%',
    },
    card: {
        alignSelf: "center",
        width: 320,
        backgroundColor: '#FFFFFF',
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingLeft: 25,
        paddingRight: 25,
    },
    title: {
        height: 33,
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'normal',
        lineHeight: 21,
        color: '#105762'
    },
    label: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: "space-between",
        fontSize: 12,
        color: '#BDBDBD',
        lineHeight: 28,
    },
    input: {
        fontSize: 15,
        height: 48,
        width: 271,
        backgroundColor: '#fff',
        borderRadius: 6,
        /*shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 64,
        },
        shadowRadius: 16.00,
        shadowOpacity: 0.7,
        elevation: 10 */
    },
    labelForgetPassword: {
        fontSize: 12,
        color: '#BDBDBD',
    },
    buttonEntar: {
        height: 48,
        minWidth: 121,
        borderRadius: 100,
    },
    labelEntrar: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "500",
        lineHeight: 16,
        fontFamily: 'Roboto',
    },
    line: {
        width: 248,
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#BDBDBD'
    },
    buttonSocial: {
        borderRadius: 200,
        height: 35,
        width: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

});