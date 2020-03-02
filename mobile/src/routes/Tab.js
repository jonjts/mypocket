
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Indicator from '~/components/tabs/Indicator'
import AddButton from '~/components/tabs/AddButton'
import Dashboard from '~/pages/Dashboard'
//Profile
import ProfileNavigation from '~/routes/Profile'
//Item
import Item from '~/pages/Item'

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabNavigation = createBottomTabNavigator({
    Home: {
        screen: Dashboard,
        navigationOptions: () => ({
            tabBarLabel: ({ focused }) => (focused ? <Indicator /> : null),
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    color={tintColor}
                    style={styles.tabIcon}
                    size={24}
                />
            )
        })
    },
    Itens: {
        screen: Item,
        navigationOptions: () => ({
            tabBarLabel: ({ focused }) => (focused ? <Indicator /> : null),
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="bar-chart-2"
                    color={tintColor}
                    style={[{ transform: [{ rotate: "90deg" }] }, styles.tabIcon]}
                    size={24}
                />
            )
        })
    },
    Adding: {
        screen: () => null, // Empty screen
        navigationOptions: () => ({
            tabBarLabel: () => null,
            tabBarIcon: ({ tintColor }) => (
                <AddButton
                    style={styles.buttonAdd} /> // Plus button component
            )
        })
    },
    Goals: {
        screen: Dashboard,
        navigationOptions: () => ({
            tabBarLabel: ({ focused }) => (focused ? <Indicator /> : null),
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="flag"
                    color={tintColor}
                    size={24}
                    style={styles.tabIcon}
                />
            )
        })
    },
    Profile: {
        screen: ProfileNavigation,
        navigationOptions: () => ({
            tabBarLabel: ({ focused }) => (focused ? <Indicator /> : null),
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="user"
                    color={tintColor}
                    style={styles.tabIcon}
                    size={24}
                />
            )
        })
    }
}, {
    tabBarOptions: {
        showLabel: true, // hide labels
        activeTintColor: '#3AB9CE', // active icon color
        inactiveTintColor: '#BDBDBD',  // inactive icon color
        keyboardHidesTabBar: true,
        style: {
            backgroundColor: '#171F33' // TabBar background
        }
    },
    tabBarComponent: props => (
        <TabBarComponent
            {...props}
            style={{ borderTopColor: '#FFF', height: tabBarHeight }} />
    ),
});


const tabBarHeight = Dimensions.get('window').height * 0.13;
const styles = StyleSheet.create({

    buttonAdd: {
        position: 'absolute',
        bottom: tabBarHeight * 0.4
    },
    tabIcon: {
        position: 'absolute',
        bottom: tabBarHeight * 0.4
    },
});

export default TabNavigation