import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { zoomIn } from 'react-navigation-transitions';
import Indicator from '~/components/tabs/Indicator'
import AddButton from '~/components/tabs/AddButton'

import Signin from './src/pages/Auth/Signin';
import Signup from './src/pages/Auth/Signup';
import SplashScreen from './src/pages/SplashScreen/';
import Wellcome from './src/pages/Wellcome'
import Dashboard from './src/pages/Dashboard'

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

const TabBarComponent = props => <BottomTabBar {...props} />;

const MainNavigation = createBottomTabNavigator({
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
    screen: Dashboard,
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

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: authNavigation,
  Main: MainNavigation,
},
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
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