'use strict';

var React = require('react-native');
import { Dimensions } from 'react-native';

var { StyleSheet, } = React;

const maxHeight = Dimensions.get('window').height * 0.30;

module.exports = StyleSheet.create({

    header: {
        height: maxHeight,
        backgroundColor: '#3AB9CE',
        borderBottomStartRadius: 71.5,
        paddingRight: 21,
        paddingLeft: 21,
    },
    mainHeaderContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 18,
        paddingBottom: 15
    },
    mainHeaderRight:{
        
    },
    appName:{
        color: '#fff',
        fontSize: 18,
    }
    
});