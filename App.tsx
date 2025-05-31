import {LogBox, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './App/Navigation/StackNavigator';
import {UserProvider} from './App/Context/UseContext';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <StackNavigator />
        <Toast />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
