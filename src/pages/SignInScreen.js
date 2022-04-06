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
  TextInput
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
          emailError: '',
          password: ''
      }
  }
  submit()
  {
    let rjx=/^[a-zA-Z][a-zA-Z0-9]{3,31}$/;
    let isValidEmail = rjx.test(this.state.email)
    let isValidPassword = rjx.test(this.state.password)
    var emailCorrect = false
    var passwordCorrect = false
    if(!isValidEmail || this.state.email == "")
    {
      this.setState({emailError: "Email is not valid"})
    }
    else
    {
      this.setState({emailError: ""})
      emailCorrect = true
    }

    if(!isValidPassword || this.state.password == "")
    {
      this.setState({passwordError: "Password is not valid"})
    }
    else
    {
      this.setState({passwordError: ""})
      passwordCorrect = true
    }

    if(emailCorrect && passwordCorrect)
    {
      this.props.navigation.navigate('CreateSchedule')
    }
  }
  emailValidator()
  {
    if(this.state.email=="")
    {
      this.setState({emailError: "Email cannot be empty"})
    }
    else
    {
      this.setState({emailError: ""})
    }
  }
  passwordValidator()
  {
    if(this.state.password=="")
    {
      this.setState({passwordError: "Password cannot be empty"})
    }
    else
    {
      this.setState({passwordError: ""})
    }
  }

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
          <Text style={externalStyle.extraText}>Username:</Text>
          <TextInput
              value={this.state.email}
              keyboardType={'email-address'}
              style={externalStyle.inputStyle}
              placeholder="Email"
              onBlur={()=>this.emailValidator()}
              onChange={ e => this.setState({email: e.target.value}) }
          />
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.emailError}</Text>
          <Text style={externalStyle.extraText}>Password:</Text>
          <TextInput
              value={this.state.password}
              keyboardType={'default'}
              style={externalStyle.inputStyle}
              placeholder="Password"
              onBlur={()=>this.passwordValidator()}
              onChange={ e => this.setState({password: e.target.value}) }
          />
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.passwordError}</Text>
          <SignInButton title="Sign In" onPress={() => this.submit()/*() => this.props.navigation.navigate('CreateSchedule')*/} />
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
  }
});

export default SignInScreen
