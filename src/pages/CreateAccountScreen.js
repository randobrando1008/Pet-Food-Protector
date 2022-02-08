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

const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.CreateAccountButtonContainer}>
      <Text style={styles.CreateAccountButtonText}>{title}</Text>
    </TouchableOpacity>
);

class CreateAccountScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
      }
  }

  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
            <Text style={styles.headerStyle}>Create An Account</Text>
            <View style={styles.lineStyle} />
            <Text style={styles.extraText}>First Name:</Text>
            <TextInput
                value={this.state.fName}
                style={styles.inputStyle}
                placeholder="Type in your First Name"
            />
            <Text style={styles.extraText}>Last Name:</Text>
            <TextInput
                value={this.state.lName}
                style={styles.inputStyle}
                placeholder="Type in your Last Name"
            />
            <Text style={styles.extraText}>Email:</Text>
            <TextInput
                value={this.state.email}
                style={styles.inputStyle}
                placeholder="Type in your Email"
            />
            <Text style={styles.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={styles.inputStyle}
                placeholder="Type in your Password"
            />
            <Text style={styles.extraText}>Confirm Password:</Text>
            <TextInput
                value={this.state.cPassword}
                style={styles.inputStyle}
                placeholder="Type in your Password"
            />
            <CreateAccountButton title="Create Account" onPress={() => this.props.navigation.navigate('CreateAccount')} />
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
    marginTop: 150,
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