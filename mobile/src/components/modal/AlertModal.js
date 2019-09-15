import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import { View, TextInput, Text, Button } from 'react-native';
import GradientButton from '../buttons/GradientButton'
import Modal from "react-native-modal";

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
                    <Text style={styles.contentTitle}>{rest.text}</Text>
                    <GradientButton
                        onPress={ () => rest.onComfirm() }
                        text="Ok"
                    />
                </View>
            </Modal>
        </View>
    )
};

export default AlertModal;