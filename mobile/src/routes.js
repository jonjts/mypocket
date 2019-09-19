import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Wellcome';

const Routes = createAppContainer(createSwitchNavigator({ Main }));

export default Routes;
