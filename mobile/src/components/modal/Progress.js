import React from 'react';
var styles = require('./styles');
import {
    View,
    ActivityIndicator
} from 'react-native';
import Modal from "react-native-modal";

const AlertModal = ({ forwardedRef, ...rest }) => (
    <View >
        <Modal
            {...rest}
            style={[styles.modal, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
            ref={forwardedRef}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            backdropColor="#6E8D92"
            backdropOpacity={0.4}
        >
            <ActivityIndicator size="large" color="#18B4CE" />
        </Modal>
    </View>
);

export default AlertModal;