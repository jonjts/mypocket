import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { zoomIn } from 'react-navigation-transitions';

import Signin from './src/pages/Auth/Signin';
import Signup from './src/pages/Auth/Signup';
import SplashScreen from './src/pages/SplashScreen';

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
      headerStyle: {marginTop: 15}
    }),
  }
},
  {
    initialRouteName: 'Signin',
    transitionConfig: () => zoomIn(500),
  },
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: authNavigation
});

export default createAppContainer(InitialNavigator);