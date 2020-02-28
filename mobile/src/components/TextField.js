import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

const TextField = ({ forwardedRef, ...rest }) => {

    const [height, setHeight] = useState(48)

    const inputStyle = () => (
        {
            color: "#105762",
            fontSize: 15,
            height,
            minHeight: 48,
            flex: 1,
            width: 271,
            backgroundColor: '#fff',
            borderRadius: 6,
        }
    )

    const shadowStyle = () => (
        {
            minHeight: 48,
            width: 271,
            height: height,
            color: "#000",
            border: 20,
            radius: 6,
            opacity: 0.04,
            x: 0,
            y: 0,
            style: { marginVertical: 5, },
        }
    )

    return (
        <View>
            {rest.label &&
                <Text style={[styles.label]}>
                    {rest.label}
                </Text>
            }
            <BoxShadow setting={shadowStyle()}>
                <TextInput {...rest} ref={forwardedRef}
                    onBlur={() => rest["error"] = null}
                    paddingLeft={16}
                    onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
                    placeholderTextColor={rest.error ? "#FC451D" : "#a7a7a7"}
                    style={[inputStyle(), rest.error ? styles.invalidInput : styles.validInput]} />
                {rest.error ? <Text style={{ color: '#FC451D', fontSize: 12 }}>{rest.error}</Text> : null}
            </BoxShadow>
        </View>
    )
};

const styles = {
    invalidInput: {
        borderColor: '#FC451D',
        borderWidth: 1,
    },
    validInput: {

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