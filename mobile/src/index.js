import React from 'react';

import('./config/reactotron').then(() => console.log('Reactotron Configured'))
import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';

const App = () => (
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
  </>
);

export default App;
