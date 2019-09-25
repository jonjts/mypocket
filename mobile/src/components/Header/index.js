import React, { useState, useEffect } from 'react';
var styles = require('./styles');
import Icon from 'react-native-vector-icons/Feather';
import {
    TouchableOpacity,
    Text,
    StatusBar,
    View
} from 'react-native';

const Header = ({ ...props }) => {

    return (
        <>
            <StatusBar backgroundColor="#3AB9CE" barStyle="light-content" />
            <View
                style={styles.header}
            >
                <View
                    style={styles.mainHeaderContainer}>
                    <TouchableOpacity
                        style={styles.mainHeaderRight}
                    >
                        <Icon
                            name="more-vertical"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <Text style={styles.appName}>
                        My Pocket
                    </Text>
                    <TouchableOpacity
                        style={styles.mainHeaderRight}
                        onPress={() => { props.rightAcion ? props.rightAcion() : null}}
                    >
                        {
                            props.showBack ?

                                <Icon
                                    name="arrow-left"
                                    size={24}
                                    color="#fff"
                                />
                                :
                                <Icon
                                    name="search"
                                    size={24}
                                    color="#fff"
                                />
                        }

                    </TouchableOpacity>
                </View>
                {props.children}

            </View>
        </>
    )
};

export default Header;