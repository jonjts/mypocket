import React from 'react';

import('./config/reactotron').then(() => console.log('Reactotron Configured'))
import { Provider } from 'react-redux';
import store from './store';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
let theme = useColorScheme();


import Routes from './routes';

const App = () => (
  <>
    <Provider store={store}>
      <AppearanceProvider>
        <Routes theme={theme} />
      </AppearanceProvider>
    </Provider>
  </>
);

export default App;
