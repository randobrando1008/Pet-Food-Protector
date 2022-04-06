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
  Button,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { format } from "date-fns";

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import CreateScheduleScreen from './CreateScheduleScreen'

export var pagePass;

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class AddPetScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          feedName: '',
          feedWeight: '',
          feedNumber: ''
        }
    }

    sendData = () => {
      pagePass = 'AddPet';

      return;
    }

    render() {

        return (
          <View style={{flex: 1,backgroundColor: '#fff'}}>
            {/* <HeaderPrototype text="Add A Pet" /> */}
            <View style={externalStyle.header}>
              <TouchableOpacity
                style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", flex: 1, padding: 2}}
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
              </TouchableOpacity>
              <Text style={externalStyle.headerText}>Add A Pet</Text>
              <TouchableOpacity
                style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
                onPress={() => this.props.navigation.navigate('Setting')}>
                <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
              </TouchableOpacity>
            </View>

            <ScrollView style={externalStyle.scrollView}>
              <Text style={externalStyle.extraText}>Name Of Pet:</Text>
              <TextInput
                value={this.state.feedName}
                style={externalStyle.inputStyle}
                placeholder="Name"
                keyboardType="default"
                onChange={ e => this.setState({feedName: e.target.value}) }
              />
              <Text style={externalStyle.extraText}>Pet's Weight:</Text>
              <TextInput
                value={this.state.feedWeight}
                style={externalStyle.inputStyle}
                placeholder="Name"
                keyboardType="default"
                onChange={ e => this.setState({feedWeight: e.target.value}) }
              />

              <Text style={externalStyle.extraText}>How Much To Feed:</Text>
              <TextInput
                value={this.state.feedNumber}
                style={externalStyle.inputStyle}
                placeholder="Quantity"
                keyboardType="numeric"
                onChange={ e => this.setState({feedNumber: e.target.value}) }
              />

              <View style={{width: 265,
                    justifyContent: 'center',
                    alignSelf: "center",
                    flexWrap:'wrap'}}>
                <Text style={externalStyle.extraText}>What time to feed?</Text>
                <TouchableOpacity
                  style={{ backgroundColor:"#FFFFFF00", padding: 2}}
                  onPress={() => {this.sendData(); this.props.navigation.navigate('Quantity');}}>
                  <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
              </View>
              <AddButton title="Submit" /*onPress={CreateScheduleScreen.addMore()}*/ />
            </ScrollView>
            <PawIcon />
          </View>
        );
    }
}

export default AddPetScreen
