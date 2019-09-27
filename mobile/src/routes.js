import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { zoomIn, fadeIn, fromRight } from 'react-navigation-transitions';
import Indicator from '~/components/tabs/Indicator'
import AddButton from '~/components/tabs/AddButton'

import Signin from '~/pages/Auth/Signin';
import Signup from '~/pages/Auth/Signup';
import SplashScreen from '~/pages/SplashScreen/';
import Wellcome from '~/pages/Wellcome'
import Dashboard from '~/pages/Dashboard'
//Profile
import Profile from '~/pages/Profile'
import EditProfile from '~/pages/Profile/Edit'
import EditPassword from '~/pages/Profile/EditPassword'
//info
import Info from '~/pages/Info'

const authNavigation = createStackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: () => ({
      headerTransparent: true,
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: () => ({
      headerTransparent: true,
      headerStyle: { marginTop: 15 }
    }),
  }, Wellcome: {
    screen: Wellcome,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    }),
  },
},
  {
    initialRouteName: 'Signin',
    transitionConfig: () => zoomIn(500),
  },
);

const profileNavigation = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      header: null
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: () => ({
      header: null,
      tabBarVisible: false
    }),
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: () => ({
      header: null
    }),
  }
},

  {
    initialRouteName: 'Profile',
    transitionConfig: () => fadeIn(500),
  },
);

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
    screen: Dashboard,
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
    screen: profileNavigation,
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

const MainNavigation = createStackNavigator({
  Tab: {
    screen: TabNavigation,
    navigationOptions: () => ({
      headerTransparent: true,
    }),
  },
  Info: {
    screen: Info,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    }),
  },
},
  {
    initialRouteName: 'Tab',
    transitionConfig: () => fromRight(500),
  },
);


const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: authNavigation,
  Main: MainNavigation,
},
  {
    transitionConfig: () => fadeIn(500),
  });

export default createAppContainer(InitialNavigator);

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