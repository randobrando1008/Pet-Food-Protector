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
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.signInButtonContainer}>
      <Text style={styles.signInButtonText}>{title}</Text>
    </TouchableOpacity>
);
const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.createAccountButtonContainer}>
      <Text style={styles.createAccountButtonText}>{title}</Text>
    </TouchableOpacity>
);

class HomeScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
      }
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
          <Image
          style={{ resizeMode:'contain', alignSelf: 'center', height: 70, width: 400 }}
          source={require('./happyDoggo.png')}
          />
          <View style = {styles.lineStyle} />
          <Text style={styles.headerText}>Welcome to The Happy Doggo!</Text>
          <Text style={styles.extraText}>If you already have an account click the Sign In button below, if you're a new user go ahead and Create an Account.</Text>
          <View style = {styles.lineStyle} />
          {/* <Text>Username:</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            placeholder="Email"
          />
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            value={this.state.password}
            placeholder="Password"
          /> */}
          <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('Details')} />
          <CreateAccountButton title="Create an Account" />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  lineStyle:{
    borderWidth: 2,
    borderColor: "#00A5FF",
    borderRadius: 35,
    margin: 10,
    marginTop: 30
  },
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
  },
  signInButtonContainer: {
    backgroundColor: "#00A5FF",
    borderRadius: 35,
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 150,
  },
  signInButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  },
  createAccountButtonContainer: {
    backgroundColor: "#fff",
    borderColor: "#00A5FF",
    borderWidth: 2,
    borderRadius: 35,
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  },
  createAccountButtonText: {
    fontSize: 18,
    color: "#00A5FF",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default HomeScreen