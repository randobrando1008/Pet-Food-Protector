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
  AsyncStorage,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import axios from 'axios';

const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.CreateAccountButtonContainer}>
      <Text style={styles.CreateAccountButtonText}>{title}</Text>
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

  // componentDidMount = () => {
  // }

  handleConfirm = e => {
    e.preventDefault();

    console.log("It is in the handleConfirm Function");
    console.log(this.state.fName);
    console.log(this.state.lName);
    console.log(this.state.email);

    let UID123_object = {
      firstname: this.state.fName,
      lastname: this.state.lName,
      email: this.state.email
    };

    AsyncStorage.setItem(
      'UID123',
      JSON.stringify(UID123_object),
    );

    AsyncStorage.getItem('UID123', (err, result) => {
      console.log(result);
    });
  };

  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.headerStyle}>Create An Account</Text>
            <View style={styles.lineStyle} />
            <Text style={styles.extraText}>First Name:</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type in your First Name"
                onChangeText={ (value) => this.setState({fName: value}) } 
                value={this.state.fName}
            />
            <Text style={styles.extraText}>Last Name:</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type in your Last Name"
                onChangeText={ (value) => this.setState({lName: value}) }
                value={this.state.lName}
            />
            <Text style={styles.extraText}>Email:</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type in your Email"
                onChangeText={ (value) => this.setState({email: value}) }
                value={this.state.email}
            />
            <Text style={styles.extraText}>Password:</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type in your Password"
                onChangeText={ (value) => this.setState({password: value}) }
                value={this.state.password}
            />
            <Text style={styles.extraText}>Confirm Password:</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Retype in your Password"
                onChangeText={ (value) => this.setState({cPassword: value}) }
                value={this.state.cPassword}
            />
            {/* <CreateAccountButton title="Create Account" onPress={this.handleConfirm} /> */}
            <CreateAccountButton title="Create Account" onPress={this.handleConfirm} />
          </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({

  scrollView: {
    marginHorizontal: 20,
  },
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
  },
  lineStyle:{
    borderWidth: 2,
    borderColor: "#00A5FF",
    borderRadius: 35,
    margin: 10,
    marginTop: 30
  },
  CreateAccountButtonContainer: {
    backgroundColor: "#00A5FF",
    borderRadius: 35,
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 50,
  },
  CreateAccountButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  }

});

export default CreateAccountScreen
