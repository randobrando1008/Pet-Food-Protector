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

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.signInButtonContainer}>
      <Text style={styles.signInButtonText}>{title}</Text>
    </TouchableOpacity>
);

class SignInScreen extends React.Component {

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
            <Text style={styles.headerStyle}>Sign In</Text>
            <View style={styles.lineStyle} />
            <Text style={styles.extraText}>Username:</Text>
            <TextInput
                value={this.state.email}
                placeholder="Email"
            />
            <Text style={styles.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                placeholder="Password"
            />
            <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
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
    color: '#000',
    fontSize: 18,
    width: 265,
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
  signInButtonContainer: {
    backgroundColor: "#00A5FF",
    borderRadius: 35,
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 150,
  },
  signInButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  },

});

export default SignInScreen