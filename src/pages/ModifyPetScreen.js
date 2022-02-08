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
  Button,
  TextInput,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

class ModifyPetScreen extends React.Component {

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
          <View>
            <Text>How Much To Feed:</Text>
            <TextInput
              style={styles.input}
              value={this.state.feedNumber}
              placeholder="Quantity"
              keyboardType="numeric"
            />

            <Text>How many times a day:</Text>
            <TextInput
              style={styles.input}
              value={this.state.timesNumber}
              placeholder="Quantity"
              keyboardType="numeric"
            />

            <Button title="What time to feed?" onPress={this.showDatePicker} />
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="time"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ModifyPetScreen
