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
  AsyncStorage,
} from 'react-native';

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

class SignInScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
      }
  }

  // componentDidMount = () => {
  // }

  checkLogIn = e => {
    e.preventDefault();
    var logIn = false;

    AsyncStorage.getAllKeys((err, result) => {
      for(var i = 0; i < result.length; i++)
      {
        AsyncStorage.getItem(result[i], (err, result) => {
          var parsedResults = JSON.parse(result);
          console.log(parsedResults.email);
          console.log(this.state.email);
          if(parsedResults.email == this.state.email)
          {
            console.log(this.state.password);
            if(parsedResults.password == this.state.password)
            {
              logIn = true;
              console.log(logIn);
            }
          }

          if(logIn)
          {
            console.log("IN HERE");
            this.props.navigation.navigate('CreateSchedule');
          }
          else
          {
            console.log("Email/Password is incorrect");
          }
        });
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
          <Text style={styles.headerStyle}>Sign In</Text>
          <View style={externalStyle.lineStyle} />
          <Text style={styles.extraText}>Email:</Text>
          <TextInput
              value={this.state.email}
              style={externalStyle.inputStyle}
              placeholder="Enter Email"
              onChangeText={ (value) => this.setState({email: value}) }
          />
          <Text style={styles.extraText}>Password:</Text>
          <TextInput
              value={this.state.password}
              style={externalStyle.inputStyle}
              placeholder="Enter Password"
              onChangeText={ (value) => this.setState({password: value}) }
          />
          <SignInButton title="Sign In" onPress={this.checkLogIn} />
          <PawIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  headerStyle:{
    color:"#000",
    fontSize: 62,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  },
  extraText: {
    color: '#C4C4C4',
    fontSize: 18,
    width: 265,
    justifyContent: 'center',
    alignSelf: "center",
    padding: 2,
    margin: 5
  },
  inputStyle: {
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 14,
    width: 255,
    height: 40,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  }
});

export default SignInScreen
