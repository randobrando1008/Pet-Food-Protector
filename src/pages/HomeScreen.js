import React, {useState, Component} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  NativeModules,
  NativeEventEmitter,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  PermissionsAndroid,
  AsyncStorage,
  Button,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.secondaryButtonContainer}>
      <Text style={externalStyle.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount = async () => {
  //   AsyncStorage.clear();
  // }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        <Image
        style={{ resizeMode:'contain', alignSelf: 'center', height: 70, width: 400, marginTop: 10 }}
        source={require('./happyDoggo.png')}
        />
        <View style = {externalStyle.lineStyle} />
        <Text style={styles.headerText}>Welcome to The Happy Doggo!</Text>
        <Text style={styles.extraText}>If you already have an account click the Sign In button below, if you're a new user go ahead and Create an Account.</Text>
        <View style = {externalStyle.lineStyle} />
        <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
        <CreateAccountButton title="Create an Account" onPress={() => this.props.navigation.navigate('CreateAccount')} />
        <PawIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 15
  },
  extraText: {
    color: '#000',
    fontSize: 18,
    width: 265,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  }
});

export default HomeScreen
