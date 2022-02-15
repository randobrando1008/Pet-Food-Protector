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
            <Text style={styles.extraText}>First Name:</Text>
            <TextInput
                value={this.state.fName}
                style={styles.inputStyle}
                placeholder="Type in your First Name"
                onChange={ e => this.setState({fName: e.target.value}) } 
            />
            <Text style={styles.extraText}>Last Name:</Text>
            <TextInput
                value={this.state.lName}
                style={styles.inputStyle}
                placeholder="Type in your Last Name"
                onChange={ e => this.setState({lName: e.target.value}) }
            />
            <Text style={styles.extraText}>Email:</Text>
            <TextInput
                value={this.state.email}
                style={styles.inputStyle}
                placeholder="Type in your Email"
                onChange={ e => this.setState({email: e.target.value}) }
            />
            <Text style={styles.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={styles.inputStyle}
                placeholder="Type in your Password"
                onChange={ e => this.setState({password: e.target.value}) }
            />
            <Text style={styles.extraText}>Confirm Password:</Text>
            <TextInput
                value={this.state.cPassword}
                style={styles.inputStyle}
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

export default CreateAccountScreen
