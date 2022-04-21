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
  TextInput,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import { quantitySentAdd } from './AddPetScreen.js';
import { petIDAdd } from './AddPetScreen.js';

export let feedingHours;
export let feedingMinutes;
export let weightOfFood;
export let feedingNumbers;
export let navigation;

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class DatePickerScreenAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hourTime: [],
            minuteTime: [],
            key: -1,
            isDatePickerVisible: false,
            foodQuantity: "",
            numberOfFeeding: ""
        }
    }

    showDatePicker = () => {
        this.setState({isDatePickerVisible: true})
    };

    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false})
    };

    handleConfirm = (date) => {
        console.log(date);
        var hours = ((date.getHours() + 11) % 12 + 1);
        var minutes = date.getMinutes();
        if(date.getHours() > 12)
        {
            hours += 12;
        }
        if(date.getHours() < 10)
        {
            hours = "0" + hours;
        }
        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }

        this.state.hourTime.push(hours);
        this.state.minuteTime.push(minutes);

        // this.props.state.hourTime.concat(hours);
        // this.props.state.minuteTime = minutes;
        console.log("A time has been picked: " + hours + ":" + minutes );
        // console.log("Index of Hour: " + this.state.hour.indexOf());
        ++this.state.key;
        console.log("Minute Time: " + this.state.minuteTime);
        console.log("Hour Time: " + this.state.hourTime);
        this.hideDatePicker();
    }

    writeToBluetooth = () => {
        for(var i = 0; i < 3; i++)
        {
            if(this.state.hourTime[i] == undefined && this.state.minuteTime[i] == undefined)
            {
                this.state.hourTime[i] = "99";
                this.state.minuteTime[i] = "99";
            }
        }

        feedingHours = this.state.hourTime;
        feedingMinutes = this.state.minuteTime;
        var variable = this.state.foodQuantity;
        if(parseFloat(this.state.foodQuantity) < 100)
        {
            variable = "0" + variable;
        }
        weightOfFood = variable;
        // weightOfFood = this.state.foodQuantity;
        feedingNumbers = this.state.numberOfFeeding;
        navigation = this.props.navigation;
        this.props.navigation.navigate('BluetoothWriteAdd');
    }

    componentDidMount = async () => {
        console.log(petIDAdd);
        await AsyncStorage.getItem(petIDAdd)
            .then(req => JSON.parse(req))
            .then(json => {
              this.state.foodQuantity = json.foodQuantity;
              this.state.numberOfFeeding = json.numberOfFeedings;
            });
    }


    render() {
        var myLoop = [];
        var finalQuantity;
        finalQuantity = quantitySentAdd;
        for(let i = 0; i < finalQuantity; ++i){
            myLoop.push(
                <View key={i}>
                    <DateTimePicker
                        isVisible={this.state.isDatePickerVisible}
                        mode="time"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <View style={{ justifyContent: 'center',
                        alignSelf: "center"}}>
                        <Text style={externalStyle.extraText}>Change Schedule</Text>
                        <TouchableOpacity
                            style={{ backgroundColor:"#FFFFFF00", padding: 1}}
                            onPress={this.showDatePicker} >
                            <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                        </TouchableOpacity>
                    </View>
                    {i > this.state.key ? null : <Text style={externalStyle.extraText}>Time set: {this.state.hourTime[i]}:{this.state.minuteTime[i]}</Text>}
                    {/* {this.printTime(i)} */}
                </View>
            );
        }
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
            <View style={externalStyle.header}>
                <TouchableOpacity
                    style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", flex: 1, padding: 2}}
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-left" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
                <Text style={externalStyle.headerText}>Number of Feeding Times</Text>
                <TouchableOpacity
                    style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
                    onPress={() => this.props.navigation.navigate('Setting')}>
                    <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
            </View>
            <ScrollView style={externalStyle.scrollView}>
                {myLoop}
                {/* <AddButton title="Submit" onPress={() => this.props.navigation.navigate('BluetoothWrite')} /> */}
                <AddButton title="Submit" onPress={() => this.writeToBluetooth()} />
            </ScrollView>
            <PawIcon />
        </View>
    );}
}

export default DatePickerScreenAdd
