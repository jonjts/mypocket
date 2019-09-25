import React, { useState } from 'react';
import TextField from './TextField';
import Icon from 'react-native-vector-icons/Feather';
import {
    Platform,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

const PasswordTextField = props => {
    const [hidePassword, setHidePassword] = useState(true)

    managePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    }

    return (
        <View>
            {props.label &&
                <Text style={[styles.label]}>
                    {props.label}
                </Text>
            }
            <View style={styles.textBoxBtnHolder}>
                <TextField
                    {...props}
                    label={null}
                    underlineColorAndroid="transparent"
                    secureTextEntry={hidePassword}
                    style={styles.textBox} />
                <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                    <Icon 
                    name={ hidePassword ? 'eye-off' : 'eye'} 
                    size={16}
                    color={ props.error ? '#FC451D' : '#BDBDBD'} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create(
    {
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            right: 3,
            height: 40,
            width: 35,
            padding: 5
        },
        btnImage:
        {
            resizeMode: 'contain',
            height: 16,
            width: 16,
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

export default PasswordTextField;