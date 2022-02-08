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
import CreateAccountScreen from './pages/CreateAccountScreen';
import CreateScheduleScreen from './pages/CreateScheduleScreen';
import AddPetScreen from './pages/AddPetScreen';
import ModifyPetScreen from './pages/ModifyPetScreen';

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
          <Stack.Screen
            options={{headerShown:false}}
            name="CreateAccount"
            component={CreateAccountScreen}
          />
          <Stack.Screen
            options={{headerShown:false}}
            name="CreateSchedule"
            component={CreateScheduleScreen}
          />
          <Stack.Screen
            options={{headerShown:false}}
            name="AddPet"
            component={AddPetScreen}
          />
          <Stack.Screen
            options={{headerShown:false}}
            name="ModifyPet"
            component={ModifyPetScreen}
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
