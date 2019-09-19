import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { zoomIn } from 'react-navigation-transitions';

import Signin from './src/pages/Auth/Signin';
import Signup from './src/pages/Auth/Signup';
import SplashScreen from './src/pages/SplashScreen/';
import Wellcome from './src/pages/Wellcome'
import Main from './src/pages/Main'

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

const MainNavigation = createSwitchNavigator({
  Home: {
    screen: Main,
    navigationOptions: () => ({
      headerTransparent: true,
    }),
  },
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