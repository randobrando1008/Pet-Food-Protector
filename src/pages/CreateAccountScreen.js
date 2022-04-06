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
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class CreateAccountScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        fName: '',
        lName: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        cPassword: '',
        cPasswordError: '',
      }
  }

  submit()
  {
    let rjx=/^[a-zA-Z][a-zA-Z0-9]{3,31}$/;
    let isValidEmail = rjx.test(this.state.email)
    let isValidPassword = rjx.test(this.state.password)
    let isValidcPassword = rjx.test(this.state.cPassword)
    var emailCorrect = false
    var passwordCorrect = false
    var cPasswordCorrect = false

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

    if((!isValidcPassword || this.state.cPassword == "") || (this.state.cPassword == this.state.password))
    {
      if(this.state.cPassword == this.state.password)
      {
        this.setState({cPasswordError: "Password is not the same"})
      }
      else
      {
        this.setState({cPasswordError: "Confirm Password is not valid"})
      }
    }
    else
    {
      this.setState({cPasswordError: ""})
      cPasswordCorrect = true
    }

    if(emailCorrect && passwordCorrect && cPasswordCorrect)
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

  cPasswordValidator()
  {
    if(this.state.cPassword=="")
    {
      this.setState({cPasswordError: "Confirm Password cannot be empty"})
    }
    else
    {
      this.setState({cPasswordError: ""})
    }
  }

  componentDidMount = () => {
    AsyncStorage.getAllKeys((err, result) => {
      console.log(result);
    });
  }

  handleConfirm = e => {
    e.preventDefault();

    var id = uuidv4();

    let object = {
      firstname: this.state.fName,
      lastname: this.state.lName,
      email: this.state.email,
      password: this.state.password,
      petID: ""
    };

    AsyncStorage.setItem(
      id,
      JSON.stringify(object),
    );

    this.props.navigation.navigate('SignIn');

    // AsyncStorage.getItem(id, (err, result) => {
    //   console.log(result);
    // });
  };

  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
          <ScrollView style={externalStyle.scrollView}>
            <Text style={styles.headerStyle}>Create An Account</Text>
            <View style={externalStyle.lineStyle} />

            <Text style={externalStyle.extraText}>First Name:</Text>
            <TextInput
                value={this.state.fName}
                style={externalStyle.inputStyle}
                placeholder="Type in your First Name"
                keyboardType="default"
                onChangeText={ (value) => this.setState({fName: value}) }
            />

            <Text style={externalStyle.extraText}>Last Name:</Text>
            <TextInput
                value={this.state.lName}
                style={externalStyle.inputStyle}
                placeholder="Type in your Last Name"
                keyboardType="default"
                onChangeText={ (value) => this.setState({lName: value}) }
            />

            <Text style={externalStyle.extraText}>Email:</Text>
            <TextInput
                value={this.state.email}
                style={externalStyle.inputStyle}
                placeholder="Type in your Email"
                keyboardType="email-address"
                onBlur={()=>this.emailValidator()}
                onChangeText={ (value) => this.setState({email: value}) }
            />
            <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.emailError}</Text>

            <Text style={externalStyle.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={externalStyle.inputStyle}
                placeholder="Type in your Password"
                keyboardType="default"
                onBlur={()=>this.passwordValidator()}
                onChangeText={ (value) => this.setState({password: value}) }
            />
            <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.passwordError}</Text>

            <Text style={externalStyle.extraText}>Confirm Password:</Text>
            <TextInput
                value={this.state.cPassword}
                style={externalStyle.inputStyle}
                placeholder="Retype in your Password"
                keyboardType="default"
                onBlur={()=>this.cPasswordValidator()}
                onChangeText={ (value) => this.setState({cPassword: value}) }
            />
            <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.cPasswordError}</Text>
            <CreateAccountButton title="Create Account" onPress={() => this.submit()} />
            <PawIcon />
          </ScrollView>
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
    textAlignVertical: "center",
    marginTop: 10
  }
});

export default CreateAccountScreen
