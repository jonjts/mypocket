import React, { useState, useEffect, useRef } from 'react';
var styles = require('./styles');
import Icon from 'react-native-vector-icons/Feather';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { withNavigation } from 'react-navigation';

import {
    TouchableOpacity,
    Text,
    StatusBar,
    View
} from 'react-native';

const Header = ({ navigation, title = 'MyPocket', rightComponent, rightAcion, ...props }) => {

    const [showMenuButton, setShowMenuButton] = useState(props.showMenu != null ? props.showMenu : true)

    const menu = useRef()

    function hideMenu() {
        navigation.navigate('Info')
        menu.current.hide()
    }

    function showMenu() {
        menu.current.show()
    }

    return (
        <>
            <StatusBar backgroundColor="#3AB9CE" barStyle="light-content" />
            <View
                style={[styles.header]}
            >
                <View
                    style={[styles.mainHeaderContainer,]}>
                    <View style={styles.mainHeaderRight}>
                        {showMenuButton ?
                            <Menu
                                ref={menu}
                                style={{ marginLeft: 20 }}
                                button={
                                    <TouchableOpacity
                                        onPress={showMenu}
                                        style={{ height: 24, width: 24 }}
                                    >
                                        <Icon
                                            name="more-vertical"
                                            size={18}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                }
                            >
                                <MenuItem
                                    onPress={hideMenu}
                                    ellipsizeMode="clip"
                                    style={{
                                        flex: 1,
                                        //alignItems: 'center',
                                        //alignContent: 'center',
                                        justifyContent: 'center',
                                        width: 200,
                                    }}>
                                    <Icon
                                        name="alert-circle"
                                        size={18}
                                        color="#BDBDBD"
                                    />
                                    <Text
                                        style={{ alignSelf: 'center' }}
                                    >
                                        &nbsp;&nbsp;&nbsp;&nbsp;Informações
                                </Text>
                                </MenuItem>
                            </Menu>
                            :
                            <View style={{ height: 24, width: 24 }} />
                        }
                    </View>
                    <Text style={styles.appName}>
                        {title}
                    </Text>
                    <TouchableOpacity
                        style={[styles.mainHeaderRight, { height: 24, width: 24 }]}
                        onPress={() => { rightAcion ? rightAcion() : null}}
                    >
                        {
                            props.showBack ?

                                <Icon
                                    name="arrow-left"
                                    size={18}
                                    color="#fff"
                                />
                                : rightComponent ? rightComponent :
                                    <Icon
                                        name="search"
                                        size={18}
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

export default withNavigation(Header);