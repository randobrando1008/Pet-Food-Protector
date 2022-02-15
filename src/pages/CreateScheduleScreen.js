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
  Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class CreateScheduleScreen extends React.Component {

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
          <ScrollView style={externalStyle.scrollView}>
            <Text style={styles.headerStyle}>Let's Feed Some Doggo</Text>
            <View style={externalStyle.lineStyle} />
            <TouchableOpacity
              style={{ backgroundColor:"#FFFFFF00"}}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
            </TouchableOpacity>
            <SignInButton title="Add Pet" onPress={() => this.props.navigation.navigate('AddPet')} />
            <SignInButton title="Modify Pet" onPress={() => this.props.navigation.navigate('ModifyPet')} />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  headerStyle:{
    color:"#000",
    fontSize: 26,
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

export default CreateScheduleScreen
