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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class AddPetScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedNumber: '',
            timesNumber: '',
            isDatePickerVisible: false
        }
    }

    showDatePicker = () => {
        this.setState({isDatePickerVisible: true})
    };

    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false})
    }

    handleConfirm = (date) => {
        console.log(date);
        var hours = ((date.getHours() + 11) % 12 + 1);
        var minutes = date.getMinutes();
        if(date.getHours() > 12)
        {
            var dd = "PM"
        }
        else
        {
            var dd = "AM"
        }
        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }
        console.log("A time has been picked: " + hours + ":" + minutes + dd);
        this.hideDatePicker();
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
                keyboardType="text"
                onChange={ e => this.setState({feedName: e.target.value}) }
              />
              <Text style={externalStyle.extraText}>Pet's Weight:</Text>
              <TextInput
                value={this.state.feedWeight}
                style={externalStyle.inputStyle}
                placeholder="Name"
                keyboardType="text"
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

              <Text style={externalStyle.extraText}>How many times a day:</Text>
              <TextInput
                value={this.state.timesNumber}
                style={externalStyle.inputStyle}
                placeholder="Quantity"
                keyboardType="numeric"
                onChange={ e => this.setState({timesNumber: e.target.value}) }
              />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="time"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              <View style={{width: 265,
                    height: '15%',
                    justifyContent: 'center',
                    alignSelf: "center",
                    flexWrap:'wrap'}}>
                <Text style={externalStyle.extraText}>What time to feed?</Text>
                <TouchableOpacity
                  style={{ backgroundColor:"#FFFFFF00", padding: 2}}
                  onPress={this.showDatePicker}>
                  <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
              </View>
              <AddButton title="Submit" onPress={this.showDatePicker} />
            </ScrollView>
            <PawIcon />
          </View>
        );
    }
}

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

export default AddPetScreen
