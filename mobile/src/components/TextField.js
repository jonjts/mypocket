import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

const TextField = ({ forwardedRef, ...rest }) => (
    <View>
        {rest.label &&
            <Text style={[styles.label]}>
                {rest.label}
            </Text>
        }
        <BoxShadow setting={styles.shadowOpt}>
            <TextInput {...rest} ref={forwardedRef}
                onBlur={() => rest["error"] = null}
                paddingLeft={16}
                placeholderTextColor={ rest.error ? "#FC451D" : "#a7a7a7"}
                style={[styles.input,  rest.error ? styles.invalidInput : styles.validInput]} />
            {rest.error ? <Text style={{ color: '#FC451D', fontSize: 12 }}>{rest.error}</Text> : null}
        </BoxShadow>
    </View>
);

const styles = {
    invalidInput: {
        borderColor: '#FC451D',
        borderWidth: 1,
    },
    validInput: {

    },
    input: {
        color: "#105762",
        fontSize: 15,
        minHeight: 48,
        flex: 1,
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
    label: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: "space-between",
        fontSize: 12,
        color: '#BDBDBD',
        lineHeight: 28,
    },
}

export default TextField;