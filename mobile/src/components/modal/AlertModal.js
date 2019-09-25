import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import { View, Image, Text, Button } from 'react-native';
import GradientButton from '../buttons/GradientButton'
import Modal from "react-native-modal";
import iconAlert from '../../assets/images/alert-circle.png';
import Icon from 'react-native-vector-icons/Feather';

const AlertModal = ({ forwardedRef, ...rest }) => {

    return (
        <View >
            <Modal
                {...rest}
                style={styles.modal}
                ref={forwardedRef}
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                backdropColor="#6E8D92"
                backdropOpacity={0.4}
            >
                <View style={styles.content}>
                    <View>
                        <Icon
                            style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
                            name="alert-circle"
                            size={35}
                            color="#105762"
                        />
                        <Text style={styles.contentTitle}>{rest.title ? rest.title : 'Atenção'}</Text>
                    </View>
                    <Text style={[styles.contentTitle, styles.contentMessage]}>{rest.text}</Text>
                    <GradientButton
                        onPress={() => rest.onComfirm() ? rest.onComfirm() : {}}
                        text="VOLTAR"
                    />
                </View>
            </Modal>
        </View>
    )
};

export default AlertModal;