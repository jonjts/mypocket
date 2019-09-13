import React, { useState } from 'react';
import TextField from './TextField';
import { TextInputMask } from 'react-native-masked-text'
import { BoxShadow } from 'react-native-shadow';

import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

const MaskTextField = ({ forwardedRef, ...rest }) => {

    return (
        <View>
            {rest.label &&
                <Text style={[styles.label]}>
                    {rest.label}
                </Text>
            }
            <BoxShadow setting={styles.shadowOpt}>
                <TextInputMask
                    {...rest}
                    ref={forwardedRef}
                    placeholderTextColor={ rest.error ? "#FC451D" : "#a7a7a7"}
                    style={[styles.input, rest.error ? styles.invalidInput : styles.validInput]}
                    paddingLeft={16} />
                {rest.error ? <Text style={{ color: '#FC451D', fontSize: 12 }}>{rest.error}</Text> : null}
            </BoxShadow>
        </View>
    );
}

const styles = {
    invalidInput: {
        borderColor: '#FC451D',
        borderWidth: 1,
    },
    validInput: {

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
    textBoxBtnHolder:
    {
        position: 'relative',
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },

    textBox:
    {
        fontSize: 15,
        height: 48,
        width: 271,
        backgroundColor: '#fff',
        borderRadius: 6,
    },

    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 40,
        width: 35,
        padding: 5
    },
    btnImage:
    {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
    label: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: "space-between",
        fontSize: 12,
        color: '#BDBDBD',
        lineHeight: 28,
    },
    shadowOpt: {
        width: 271,
        height: 48,
        color: "#000",
        border: 20,
        radius: 6,
        opacity: 0.04,
        x: 0,
        y: 0,
        style: { marginVertical: 5, },
    },
};

export default MaskTextField;