/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootNavigator from './src/navigator/RootNavigator'
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './src/reducer/RootReducer';
import rootSaga from './src/saga/RootSaga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator></RootNavigator>
      </Provider>
    );
  }
};

