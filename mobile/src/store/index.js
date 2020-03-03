import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable'
import AsyncStorage from '@react-native-community/async-storage';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from "redux-offline-queue";
import createSagaMiddleware from 'redux-saga';
import '../config/reactotron'

import reducers from './ducks';
import sagas from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: seamlessImmutableReconciler,
}


const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const composer = __DEV__ ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer()) : compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer, composer);

sagaMiddleware.run(sagas);

export default () => {
  let persistor = persistStore(store)
  return { store, persistor }
}
