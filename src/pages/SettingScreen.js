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

class SettingScreen extends React.Component {

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
          <View style = {styles.lineStyle} />
          <Text style={styles.headerText}>Welcome to The Happy Doggo!</Text>
          <Text style={styles.extraText}>If you already have an account click the Sign In button below, if you're a new user go ahead and Create an Account.</Text>
          <View style = {styles.lineStyle} />
          <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
          <CreateAccountButton title="Create an Account" onPress={() => this.props.navigation.navigate('CreateAccount')} />
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
  }

});

export default SettingScreen
