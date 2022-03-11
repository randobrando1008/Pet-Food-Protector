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

export var userID;

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
    var accountFound = false;

    AsyncStorage.getAllKeys((err, result) => {
      for(var i = 0; i < result.length; i++)
      {
        var user_id = result[i];
        AsyncStorage.getItem(result[i], (err, result) => {
          var parsedResults = JSON.parse(result);
          console.log(parsedResults);
          console.log(parsedResults.email);
          console.log(this.state.email);
          if(parsedResults.email == this.state.email)
          {
            console.log(parsedResults.password);
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
            accountFound = true;
            userID = user_id;
            console.log(userID);
            this.props.navigation.navigate('CreateSchedule');
            return;
          }
          else
          {
            console.log("Email/Password is incorrect");
            accountFound = false;
          }
        });
        
        if(userID != '' && accountFound)
        {
          break;
        }
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
          {/* <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('CreateSchedule')} /> */}
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
