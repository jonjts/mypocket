import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import { TouchableOpacity, View, Text, Keyboard } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { withNavigation } from 'react-navigation';

const AddButton = ({ navigation, forwardedRef, ...rest }) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setShow(false));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setShow(true));

        return function cleanup() {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }, [])

    return (
        <>
            {
                show ? <TouchableOpacity
                    {...rest}
                    style={[styles.buttonAdd, rest.style]}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('NewItem')}
                >
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                        colors={['#7AE3DD', '#25ABC9']}
                        style={[styles.linearGradient, { borderRadius: 100, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' },]}>
                        <Icon name="plus" size={24} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
                    :
                    null
            }
        </>

    )
}

export default withNavigation(AddButton);