import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen
            name='Start'
            component={Start}
          />
          <Stack.Screen
            name='Chat'
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
}