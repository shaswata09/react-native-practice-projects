/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products : productsReducer,
});

const store = createStore(rootReducer);


export default function App(){
  return (
    <>
      <Provider store={store}>
        <View>
          <Text>Hei there...</Text>
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});
