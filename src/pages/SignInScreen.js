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
          password: ''
      }
  }

  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
            <Text style={styles.headerStyle}>Sign In</Text>
            <View style={externalStyle.lineStyle} />
            <Text style={styles.extraText}>Username:</Text>
            <TextInput
                value={this.state.email}
                style={styles.inputStyle}
                placeholder="Email"
            />
            <Text style={styles.extraText}>Password:</Text>
            <TextInput
                value={this.state.password}
                style={styles.inputStyle}
                placeholder="Password"
            />
            <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('CreateSchedule')} />
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
  }
});

export default SignInScreen
