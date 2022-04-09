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

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import { userID } from './SignInScreen.js';

const MakeChangesButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class SettingScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        fName: '',
        fNameError: '',
        lName: '',
        lNameError: '',
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
    var isfNameValid = false;
    var islNameValid = false;
    var isValidEmail = false;
    var isValidPassword = false;
    var cPasswordMatch = false;

    if(this.state.fName != "")
    {
      isfNameValid = true;
    }

    if(this.state.lName != "")
    {
      islNameValid = true;
    }

    if(this.state.email.includes("@") && this.state.email.includes("."))
    {
      isValidEmail = true;
    }

    if(this.state.password != "")
    {
      isValidPassword = true;
    }

    if(!isfNameValid || this.state.fName == "")
    {
      this.setState({fNameError: "First Name is not valid"});
    }
    else
    {
      this.setState({fNameError: ""});
    }

    if(!islNameValid || this.state.lName == "")
    {
      this.setState({lNameError: "Last Name is not valid"});
    }
    else
    {
      this.setState({lNameError: ""});
    }

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

    if(this.state.cPassword == "")
    {
      this.setState({cPasswordError: "Confirm Password cannot be empty"});
    }
    else if(this.state.cPassword != this.state.password)
    {
      this.setState({cPasswordError: "Passwords Do Not Match"});
    }
    else
    {
      this.setState({cPasswordError: ""});
      cPasswordMatch = true;
    }

    if(isValidEmail && isValidPassword && cPasswordMatch && isfNameValid && islNameValid)
    {
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
    }
  }

  fNameValidator()
  {
    if(this.state.fName=="")
    {
      this.setState({fNameError: "First Name cannot be empty"});
    }
    else
    {
      this.setState({fNameError: ""});
    }
  }

  lNameValidator()
  {
    if(this.state.lName=="")
    {
      this.setState({lNameError: "Last Name cannot be empty"});
    }
    else
    {
      this.setState({lNameError: ""});
    }
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
    AsyncStorage.getItem(userID, (err, result) => {
      var parsedResults = JSON.parse(result);
      this.setState({fName: parsedResults.firstname});
      this.setState({lName: parsedResults.lastname});
      this.setState({email: parsedResults.email});
      this.setState({password: parsedResults.password});
    });
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        <View style={externalStyle.header}>
          <TouchableOpacity
            style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", flex: 1, padding: 2}}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <ScrollView style={externalStyle.scrollView}>
          <Text style={externalStyle.extraText}>First Name:</Text>
              <TextInput
                  value={this.state.fName}
                  style={externalStyle.inputStyle}
                  placeholder="Type in your First Name"
                  keyboardType="default"
                  onBlur={()=>this.fNameValidator()}
                  onChangeText={ (value) => this.setState({fName: value}) }
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.fNameError}</Text>

              <Text style={externalStyle.extraText}>Last Name:</Text>
              <TextInput
                  value={this.state.lName}
                  style={externalStyle.inputStyle}
                  placeholder="Type in your Last Name"
                  keyboardType="default"
                  onBlur={()=>this.lNameValidator()}
                  onChangeText={ (value) => this.setState({lName: value}) }
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.lNameError}</Text>

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
                  secureTextEntry={true}
                  value={this.state.password}
                  style={externalStyle.inputStyle}
                  placeholder="Type in your Password"
                  keyboardType="default"
                  onBlur={()=>this.passwordValidator()}
                  onChangeText={ (value) => this.setState({password: value}) }
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.passwordError}</Text>
            <MakeChangesButton title="Submit Changes" onPress={() => this.submit()} />
            <PawIcon />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  headerText: {
    padding: 2,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 15
  }

});

export default SettingScreen
