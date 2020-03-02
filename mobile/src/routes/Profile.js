
import { fadeIn } from 'react-navigation-transitions';
import { createStackNavigator } from 'react-navigation-stack';
//Profile
import Profile from '~/pages/Profile'
import EditProfile from '~/pages/Profile/Edit'
import EditPassword from '~/pages/Profile/EditPassword'

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

export default profileNavigation