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
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

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
          <View style={externalStyle.header}>
            <Text style={styles.headerText}>Let's Feed Some Doggos</Text>
            <TouchableOpacity
              style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
            </TouchableOpacity>
          </View>
          <View style={externalStyle.lineStyle} />
          <ScrollView style={externalStyle.scrollView}>
            <SignInButton title="Add Pet" onPress={() => this.props.navigation.navigate('AddPet')} />
            <SignInButton title="Modify Pet" onPress={() => this.props.navigation.navigate('ModifyPet')} />
          </ScrollView>
          <PawIcon />
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
