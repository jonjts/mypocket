import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import { View, Image, Text, TouchableOpacity } from 'react-native';
import GradientButton from '../buttons/GradientButton'
import Modal from "./MyModal";
import Icon from 'react-native-vector-icons/Feather';

const QuestionModal = ({ forwardedRef, icon, ...rest }) => {

    return (
        <Modal {...rest}>
            <View>
                {
                    icon ? icon :
                        <Icon
                            style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
                            name="help-circle"
                            size={35}
                            color="#105762"
                        />
                }

                {rest.children}
                <View
                    style={{
                        direction: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            paddingLeft: 40
                        }}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', height: 30, paddingRight: 40 }}
                            onPress={() => rest.backAction()}>
                            <Text
                                style={{ color: '#105762' }}
                            >
                                {rest.backText ? rest.backText : 'VOLTAR'}
                            </Text>
                        </TouchableOpacity>
                        <GradientButton
                            text={rest.cofirmText ? rest.cofirmText : 'OK'}
                            style={{ elevation: 4, alignSelf: 'center' }}
                            onPress={rest.confirmAction} />
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default QuestionModal;