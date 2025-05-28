import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './App/Navigation/StackNavigator';
import GlobalState from './App/Context';

const App = () => {
  return (
    <NavigationContainer>
      <GlobalState>
        <StackNavigator />
      </GlobalState>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
