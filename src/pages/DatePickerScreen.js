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
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import { quantitySent, pagePass } from './AddPetScreen';
import { quantitySent2 } from './ModifyPetScreen';


const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class DatePickerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hourTime: [],
            minuteTime: [],
            key: -1,
            isDatePickerVisible: false
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
        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }

        this.state.hourTime.push(hours);
        this.state.minuteTime.push(minutes);

        // this.props.state.hourTime.concat(hours);
        // this.props.state.minuteTime = minutes;
        console.log("A time has been picked: " + hours + ":" + minutes );

        console.log("Minute Time: " + this.state.minuteTime);
        console.log("Hour Time: " + this.state.hourTime);
        this.hideDatePicker();
    }

    render() {
        var myLoop = [];
        var finalQuantity;
        if(pagePass == "AddPet")
        {
            finalQuantity = quantitySent;
        }
        else
        {
            finalQuantity = quantitySent2;
        }
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
                        <Text style={externalStyle.extraText}>Chanage Schedule</Text>
                        <TouchableOpacity
                            style={{ backgroundColor:"#FFFFFF00", padding: 1}}
                            onPress={this.showDatePicker} >
                            <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.key == i ? (this.state.hourTime.length ? <Text style={externalStyle.extraText}>Time set: {this.state.hourTime[i]}:{this.state.minuteTime[i]}</Text>:null) : null
                    }
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
                <AddButton title="Submit" onPress={() => this.props.navigation.navigate('CreateSchedule')} />
            </ScrollView>
            <PawIcon />
        </View>
    );}
}

export default DatePickerScreen
