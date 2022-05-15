/**
 * @format
 */

import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import 'react-native-get-random-values' // for Realm.BSON.objectID()
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )

AppRegistry.registerComponent(appName, () =>RNRedux);
