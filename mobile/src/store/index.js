import { createStore, compose,applyMiddleware } from 'redux';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from "redux-offline-queue";
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../config/reactotron'

import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const composer = __DEV__ ? compose(applyMiddleware(...middlewares),console.tron.createEnhancer(),) : compose(applyMiddleware(...middlewares));

//const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;

const store = createStore(reducers, composer);

//const store = createStore(reducers, compose(...middleware, Reactotron.createEnhancer()))


sagaMiddleware.run(sagas);

export default store;
