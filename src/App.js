import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import HomeScreen from './pages/HomeScreen';
import SignInScreen from './pages/SignInScreen';

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown:false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown:false}}
            name="SignIn" 
            component={SignInScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
