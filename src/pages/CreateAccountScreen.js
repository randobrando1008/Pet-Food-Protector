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
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

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
          <ScrollView style={externalStyle.scrollView}>
            <Text style={styles.headerStyle}>Create An Account</Text>
            <View style={externalStyle.lineStyle} />
            <Text style={externalStyle.extraText}>First Name:</Text>
            <TextInput
                value={this.state.fName}
                style={externalStyle.inputStyle}
                placeholder="Type in your First Name"
                onChangeText={ (value) => this.setState({fName: value}) }
            />
            <Text style={externalStyle.extraText}>Last Name:</Text>
            <TextInput
                value={this.state.lName}
                style={externalStyle.inputStyle}
                placeholder="Type in your Last Name"
                onChangeText={ (value) => this.setState({lName: value}) }
            />
            <Text style={externalStyle.extraText}>Email:</Text>
            <TextInput
                value={this.state.email}
                style={externalStyle.inputStyle}
                placeholder="Type in your Email"
                onChangeText={ (value) => this.setState({email: value}) }
            />
            <Text style={externalStyle.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={externalStyle.inputStyle}
                placeholder="Type in your Password"
                onChangeText={ (value) => this.setState({password: value}) }
            />
            <Text style={externalStyle.extraText}>Confirm Password:</Text>
            <TextInput
                value={this.state.cPassword}
                style={externalStyle.inputStyle}
                placeholder="Retype in your Password"
                onChangeText={ (value) => this.setState({cPassword: value}) }
            />
            <CreateAccountButton title="Create Account" onPress={this.handleConfirm} />
          </ScrollView>
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
    textAlignVertical: "center",
    marginTop: 10
  }
});

export default CreateAccountScreen
