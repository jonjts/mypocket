import React from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

// import { Container } from './styles';

export default ({ onPress, label, selected, isHorizontal }, ...props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#3AB9CE',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8
            }, props.style]}>
                {
                    selected ?
                        <View style={{
                            position: 'relative',
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#3AB9CE',
                        }} />
                        : null
                }
            </View>
            <Text>
                {label}
            </Text>
        </TouchableOpacity>

    );
}
