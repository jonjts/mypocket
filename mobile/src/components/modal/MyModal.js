import React from 'react';
var styles = require('./styles');
import { View} from 'react-native';
import Modal from "react-native-modal";

const MyModal = ({ forwardedRef, ...rest }) => {

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
                    {rest.children}
                </View>
            </Modal>
        </View>
    )
};

export default MyModal;