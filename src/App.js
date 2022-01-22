/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
  Image,
  Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LogoTitle() {
  return (
    <Image
      style={{ resizeMode:'contain', alignSelf: 'center', height: 70, width: 400, right: 17 }}
      source={require('./happyDoggo.png')}
    />
  );
}

function HomeScreen({ navigation }) {
  return (

    <View >
      <Button
        className="styleLoginBtn"
        title="Sign In"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        className="createAccBtn"
        title="Create an Account"
        onPress={() => navigation.navigate('CreateNewAccount')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function NewAccountScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CreateNewAccount" component={NewAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  styleLoginBtn: {
    flex: 1,
    color: "white",
    backgroundColor: "#00A5FF",
    alignItems: 'center',
    justifyContent: "center",
    height: 50,
    width: 190,
    borderRadius: 25,
    margin: 2
  },
  createAccBtn: {
    flex: 1,
    color: "#00A5FF",
    backgroundColor: "white",
    borderColor: "#00A5FF",
    alignItems: 'center',
    justifyContent: "center",
    height: 50,
    width: 190,
    borderRadius: 25,
    margin: 2
  },
});

export default App;
