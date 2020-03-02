import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fadeIn, fromRight } from 'react-navigation-transitions';

//Splash
import SplashScreen from '~/pages/SplashScreen/';
//info
import Info from '~/pages/Info'
//New Item
import NewItem from '~/pages/Item/New'
//Auth
import Auth from '~/routes/Auth'
//Tab
import TabNavigation from '~/routes/Tab'


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
  NewItem: {
    screen: NewItem,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    }),
  },
},
  {
    initialRouteName: 'Tab',
    transitionConfig: () => fromRight(),
  },
);


const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth,
  Main: MainNavigation,
},
  {
    transitionConfig: () => fadeIn(500),
  });


export default createAppContainer(InitialNavigator);