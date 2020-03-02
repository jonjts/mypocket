import React from 'react';
import theme from '~/theme/light'
import moment from 'moment'

import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/Feather';
import Swipeout from 'react-native-swipeout';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

// import { Container } from './styles';

export default ({ item, onDelete, onEdit }) => {

    const datePreview = () => (
        <View
            style={{
                flex: 0.25,
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'center',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <View
                style={{
                    paddingRight: 16
                }}
            >
                <ShimmerPlaceHolder
                    style={{ marginBottom: 4 }}
                    width={40}
                    autoRun={true}
                    visible={item.id}>
                    <Text
                        style={{
                            fontSize: 22,
                            lineHeight: 28,
                            fontWeight: 'bold',
                            color: theme.color.default,
                            alignSelf: 'center',
                        }}
                    >
                        {
                            item.realizado_em ? item.realizado_em.getDate() : null
                        }
                    </Text>
                </ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                    style={{ marginBottom: 4 }}
                    width={40}
                    height={10}
                    autoRun={true}
                    visible={item.id}>
                    <Text
                        style={{
                            fontSize: 12,
                            lineHeight: 14,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: theme.color.default,
                        }}
                    >
                        {
                            item.realizado_em ? moment(item.realizado_em).format('MMM') : null
                        }
                    </Text>
                </ShimmerPlaceHolder>
            </View>
            <View
                style={{
                    borderLeftWidth: 1,
                    borderLeftColor: theme.color.secondary,
                    height: 31
                }}
            />

        </View>
    )

    const descricaoPreview = () => (
        <View
            style={{
                flex: 0.5,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
            }}
        >
            <ShimmerPlaceHolder
                style={{ marginBottom: 4 }}
                width={80}
                autoRun={true}
                visible={item.id}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 14,
                        color: theme.color.default,
                    }}
                >
                    {
                        item.descricao
                    }
                </Text>
            </ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                style={{ marginBottom: 4 }}
                height={10}
                width={60}
                autoRun={true}
                visible={item.id}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 14,
                        color: theme.color.secondary,
                    }}
                >
                    {
                        item.categoria ? item.categoria.nome : null
                    }
                </Text>
            </ShimmerPlaceHolder>

        </View>
    )

    const valorPreview = () => (
        <View
            style={{
                flex: .25,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                justifyContent: 'flex-end',
                marginRight: 12,
            }}
        >
            <ShimmerPlaceHolder
                style={{ marginBottom: 4 }}
                width={64}
                autoRun={true}
                visible={item.id}>
                {
                    item.id &&
                    <Text
                        style={{
                            fontSize: 12,
                            lineHeight: 14,
                            color: item.tipo == 'R' ? theme.color.default : theme.color.danger,
                        }}
                    >
                        {item.tipo == 'R' ? '+ ' : '- '}

                        <NumberFormat
                            value={item.valor}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            prefix={'R$ '}
                            fixedDecimalScale={true}
                            renderText={value => <Text >
                                {value}
                            </Text>}
                        />
                    </Text>
                }
            </ShimmerPlaceHolder>

        </View>
    )

    const swipeoutBtns = () => [
        {
            component: <Icon
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlignVertical: 'center',
                    display: 'flex',
                    flex: .8
                }}
                name='trash-2'
                size={24}
                color={theme.color.danger}
            />,
            backgroundColor: 'transparent',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => onDelete(item.id)
        }
    ]

    return (
        <>
            {
                item.header ?
                    <Text
                        style={{
                            color: theme.color.secondary,
                            paddingBottom: 8,
                            fontSize: 12,
                            lineHeight: 28
                        }}
                    >
                        {item.header}
                    </Text>
                    :
                    <Swipeout
                        autoClose
                        right={swipeoutBtns()}
                        backgroundColor='transparent'
                    >
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: 54,
                                backgroundColor: '#fff',
                                marginBottom: 13,
                                borderRadius: 6,
                            }}
                            onPress={() => {
                                onEdit(item.id)
                            }}
                        >
                            {datePreview()}
                            {descricaoPreview()}
                            {valorPreview()}

                        </TouchableOpacity>
                    </Swipeout>
            }
        </>
    );
}
