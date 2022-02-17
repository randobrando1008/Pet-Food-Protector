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
import externalStyle from '../styles/externalStyle';

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
        password: '',
        cPassword: ''
      }
  }

  // handleConfirm = e => {
  //   e.preventDefault();

  //   console.log("It is in the handleConfirm Function");

  //   axios.post('http://localhost:38621/User', {
  //     FirstName: this.state.firstName,
  //     LastName: this.state.lastName,
  //     Email: this.state.email,
  //     Password: this.state.password
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

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
                onChange={ e => this.setState({fName: e.target.value}) } 
            />
            <Text style={externalStyle.extraText}>Last Name:</Text>
            <TextInput
                value={this.state.lName}
                style={externalStyle.inputStyle}
                placeholder="Type in your Last Name"
                onChange={ e => this.setState({lName: e.target.value}) }
            />
            <Text style={externalStyle.extraText}>Email:</Text>
            <TextInput
                value={this.state.email}
                style={externalStyle.inputStyle}
                placeholder="Type in your Email"
                onChange={ e => this.setState({email: e.target.value}) }
            />
            <Text style={externalStyle.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={externalStyle.inputStyle}
                placeholder="Type in your Password"
                onChange={ e => this.setState({password: e.target.value}) }
            />
            <Text style={externalStyle.extraText}>Confirm Password:</Text>
            <TextInput
                value={this.state.cPassword}
                style={externalStyle.inputStyle}
                placeholder="Retype in your Password"
                onChange={ e => this.setState({cPassword: e.target.value}) }
            />
            {/* <CreateAccountButton title="Create Account" onPress={this.handleConfirm} /> */}
            <CreateAccountButton title="Create Account" onPress={this.handleConfirm} />
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
