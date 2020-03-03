import React from 'react';

import('./config/reactotron').then(() => console.log('Reactotron Configured'))
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
//Redux
import configureStore from '~/store';
const { store, persistor } = configureStore();


import Routes from './routes';

const App = () => (
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </>
);

export default App;
