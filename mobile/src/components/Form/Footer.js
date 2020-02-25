import React from 'react';
import theme from '~/theme/light'

import GradientButton from '~/components/buttons/GradientButton'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

// import { Container } from './styles';

export default ({
    onBackPress,
    onSubmitPress,
    showBackButton = true,
    showSubmitButton = true,
    backLabel = 'VOLTAR',
    submitLabel = 'Salvar'
}) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                paddingBottom: 20,
                paddingTop: 18,
                borderColor: theme.color.default,
            }}>
            {
                showBackButton &&
                <TouchableOpacity
                    style={{
                        height: 30,
                        flex: 0.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                    }}
                    onPress={onBackPress}>
                    <Text
                        style={{
                            color: theme.color.default,
                        }}
                    >
                        {backLabel}
                    </Text>
                </TouchableOpacity>
            }
            <GradientButton
                onPress={onSubmitPress}
                text={submitLabel}
                style={{ elevation: 4, alignSelf: 'center' }}
            />
        </View>
    );
}
