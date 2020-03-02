import { createStackNavigator } from 'react-navigation-stack';
import { zoomIn } from 'react-navigation-transitions';

import Signin from '~/pages/Auth/Signin';
import Signup from '~/pages/Auth/Signup';
import Wellcome from '~/pages/Wellcome'

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
            headerStyle: { marginTop: 15 },
            headerLeft: null
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

export default authNavigation