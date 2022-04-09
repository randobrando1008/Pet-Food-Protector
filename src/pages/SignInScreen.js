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
  AsyncStorage
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

export let userID = undefined;

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
          password: '',
          passwordError: '',
          accountFound: false
      }
  }
  submit = async () =>
  {
    let isValidEmail = false;
    let isValidPassword = false;
    this.state.accountFound = false;

    if(this.state.email.includes("@") && this.state.email.includes("."))
    {
      isValidEmail = true;
    }

    if(this.state.password != "")
    {
      isValidPassword = true;
    }
    var emailCorrect = false;
    var passwordCorrect = false;

    if(!isValidEmail || this.state.email == "")
    {
      this.setState({emailError: "Email is not valid"});
    }
    else
    {
      this.setState({emailError: ""});
    }

    if(!isValidPassword || this.state.password == "")
    {
      this.setState({passwordError: "Password is not valid"});
    }
    else
    {
      this.setState({passwordError: ""});
    }

    await AsyncStorage.getAllKeys((err, result) => {
      for(var i = 0; i < result.length; i++)
      {
        let user_id = "";
        user_id = result[i];
        let record = i;
        let length = result.length;
        emailCorrect = false;
        passwordCorrect = false;
        AsyncStorage.getItem(result[i], (err, result) => {
          var parsedResults = JSON.parse(result);
          if(parsedResults.email == this.state.email)
          {
            emailCorrect = true;
            if(parsedResults.password == this.state.password)
            {
              passwordCorrect = true;
              userID = "";
              userID = user_id;
            }
          }
          
          if(emailCorrect && passwordCorrect)
          {
            this.state.accountFound = true;
            this.props.navigation.navigate('CreateSchedule');

          }

          if((record == (length-1)) && (!emailCorrect || !passwordCorrect) && (!this.state.accountFound) && this.state.password != "")
          {
            this.setState({passwordError: "Email/Password is incorrect"});
          }
          else
          {
            if(this.state.password != "")
            {
              this.setState({passwordError: ""});
            }
          }
        });
        
        // if(this.props.route.name != "SignIn")
        // {
        //   break;
        // }
      }
    });
  }

  emailValidator()
  {
    if(this.state.email=="")
    {
      this.setState({emailError: "Email cannot be empty"});
    }
    else
    {
      this.setState({emailError: ""});
    }
  }
  passwordValidator()
  {
    if(this.state.password=="")
    {
      this.setState({passwordError: "Password cannot be empty"});
    }
    else
    {
      this.setState({passwordError: ""});
    }
  }

  componentDidMount = () => {
    console.log(userID);
  }

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
              onChangeText={ (value) => this.setState({email: value}) }
          />
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.emailError}</Text>
          <Text style={externalStyle.extraText}>Password:</Text>
          <TextInput
              secureTextEntry={true}
              value={this.state.password}
              keyboardType={'default'}
              style={externalStyle.inputStyle}
              placeholder="Password"
              onBlur={()=>this.passwordValidator()}
              onChangeText={ (value) => this.setState({password: value}) }
          />
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.passwordError}</Text>
          <SignInButton title="Sign In" onPress={() => this.submit()} />
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
