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
import { quantitySent, pagePassDate } from './QuantityScreen';


// function useInput() {
//     const [date, setDate] = useState(new Date());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };
//     const showDatepicker = () => {
//         showMode('date');
//     };

//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//     }
//     return {
//         date,
//         showDatepicker,
//         show,
//         mode,
//         onChange
//     }
// }

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class DatePickerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedName: '',
            feedWeight: '',
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
    };

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

    returnPage = (pagePassDate) => {
        if (pagePassDate == 'AddPet')
        {
            return <AddButton title="Submit" onPress={() => this.props.navigation.navigate('AddPet')} />
        }
        else
        {
            return <AddButton title="Submit" onPress={() => this.props.navigation.navigate('ModifyPet')} />
        }
    }

    // const input = useInput(new Date())
    // const input2 = useInput(new Date())
    render() {
        var myLoop = [];
        for(let i = 0; i < quantitySent; ++i){
            myLoop.push(
                <View key={i}>
                    <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                    />
                    <View style={{//width: 265,
                        // height: '25%',
                        justifyContent: 'center',
                        alignSelf: "center",
                        /*flexWrap:'wrap'*/}}>
                        <Text style={externalStyle.extraText}>Chanage Schedule</Text>
                        <TouchableOpacity
                            style={{ backgroundColor:"#FFFFFF00", padding: 1}}
                            onPress={this.showDatePicker} >
                            <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                        </TouchableOpacity>
                    </View>
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

                {this.returnPage(pagePassDate)}
            </ScrollView>
            <PawIcon />
            {/* <Button
                onPress={input.showDatepicker}
                title={input.date.toLocaleDateString()} />
                {input.show && (
                    <DateTimePicker
                    testID="dateTimePicker1"
                    value={input.date}
                    mode={input.mode}
                    is24Hour={true}
                    display="default"
                    onChange={input.onChange}
                    />
                )}

            <Button              
                onPress={input2.showDatepicker}
                title={input2.date.toLocaleDateString()} />
                {input2.show && (
                    <DateTimePicker
                    testID="dateTimePicker2"
                    value={input2.date}
                    mode={input2.mode}
                    is24Hour={true}
                    display="default"
                    onChange={input2.onChange}
                    />
                )}*/}
        </View>
    );}
}

export default DatePickerScreen
