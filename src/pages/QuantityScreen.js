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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { format } from "date-fns";

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import { pagePass } from './AddPetScreen';

export var pagePassDate;
export var quantitySent;

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class QuantityScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timesNumber: ''
        }
    }
    callDatePicker = () => {

        quantitySent = this.state.timesNumber;
        pagePassDate = '';
        if (pagePass == 'AddPet')
        {
            pagePassDate = pagePass;

        }
        else
            pagePassDate = '';
        console.log(pagePassDate)
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
                <Text style={externalStyle.headerText}>Feeding Times</Text>
                <TouchableOpacity
                    style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
                    onPress={() => this.props.navigation.navigate('Setting')}>
                    <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
            </View>
            <Text style={externalStyle.extraText}>How many times a day:</Text>
            <TextInput
                value={String(this.state.timesNumber)}
                numericvalue
                keyboardType={'numeric'}
                onChangeText={timesNumber => this.setState({ timesNumber })}
                placeholder={'Quantity'}
                style={externalStyle.inputStyle}
            />
            <AddButton title="Submit" onPress={() => {this.callDatePicker(); this.props.navigation.navigate('DatePicker');}} />
            <PawIcon />
        </View>

      );
    }
}

export default QuantityScreen
