import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ forwardedRef, ...rest }) => {

    return (
        <TouchableOpacity
            {...rest}
            ref={forwardedRef}
            style={[styles.buttonEntar, rest.style]}
            activeOpacity={0.5}
        >
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                colors={['#7AE3DD', '#25ABC9']}
                style={[styles.linearGradient, { borderRadius: 100, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }]}>
                <Text
                    style={styles.label}
                > {rest.text} </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
};

export default GradientButton;