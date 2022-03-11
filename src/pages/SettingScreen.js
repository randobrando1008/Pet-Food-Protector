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
        lName: '',
        email: '',
        password: '',
        cPassword: ''
      }
  }

  componentDidMount = () => {
    AsyncStorage.getItem(userID, (err, result) => {
      var parsedResults = JSON.parse(result);
      console.log(parsedResults);
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
          <MakeChangesButton title="Submit Changes" />
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
