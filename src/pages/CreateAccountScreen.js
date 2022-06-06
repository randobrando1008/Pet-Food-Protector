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
  ToastAndroid
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

      ToastAndroid.showWithGravity(
        "Account Creation Successful",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

      this.props.navigation.navigate('SignIn');
    }
    else
    {
      ToastAndroid.showWithGravity(
        "Account Creation Failed",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
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

  cPasswordValidator()
  {
    if(this.state.cPassword=="")
    {
      this.setState({cPasswordError: "Confirm Password cannot be empty"});
    }
    else
    {
      this.setState({cPasswordError: ""});
    }
  }

  componentDidMount = () => {
    // AsyncStorage.getAllKeys((err, result) => {
    //   console.log(result);
    // });
  }

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
                autoCapitalize="none"
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
                autoCapitalize="none"
                secureTextEntry={true}
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
                autoCapitalize="none"
                secureTextEntry={true}
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
