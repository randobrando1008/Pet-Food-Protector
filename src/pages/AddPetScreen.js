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
  AsyncStorage,
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

import { userID } from './SignInScreen.js';
import { v4 as uuidv4 } from 'uuid';

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
          feedNameError: '',
          feedWeight: '',
          feedWeightError: '',
          feedNumber: '',
          feedNumberError: ''
        }
    }

	sendData = () => {
      pagePass = 'AddPet';

      return;
    }

    submitInformation = async () => {
      var isNameValid = false;
      var isWeightValid = false;
      var isFeedAmountValid = false;

      if(this.state.feedName != "")
      {
        isNameValid = true;
      }

      if(this.state.feedWeight != "")
      {
        if(parseInt(this.state.feedWeight) < 351 && parseInt(this.state.feedWeight) > 0)
          isWeightValid = true;
      }

      if(this.state.feedNumber != "")
      {
        if(parseInt(this.state.feedNumber) < 4 && parseInt(this.state.feedNumber) > 0)
          isFeedAmountValid = true;
      }

      if(!isNameValid || this.state.feedName == "")
      {
        this.setState({feedNameError: "Pet Name is not valid"});
      }
      else
      {
        this.setState({feedNameError: ""});
      }

      if(!isWeightValid || this.state.feedWeight == "")
      {
        this.setState({feedWeightError: "Max weight 350"});
      }
      else
      {
        this.setState({feedWeightError: ""});
      }

      if(!isFeedAmountValid || this.state.feedNumber == "")
      {
        this.setState({feedNumberError: "Max number of feeding times is 3"});
      }
      else
      {
        this.setState({feedNumberError: ""});
      }

      if(isNameValid && isWeightValid && isFeedAmountValid)
      {

        var petID = uuidv4();
        var petIDArrayStore = [];

        await AsyncStorage.getItem(userID)
          .then(req => JSON.parse(req))
          .then(json => {
            console.log(json.petID);
            if(json.petID != '')
            {
              var petIDStore = JSON.parse(json.petID);
              for(var i = 0; i < petIDStore.length; i++)
              {
                petIDArrayStore[i] = petIDStore[i];
              }
            }
            console.log(petID);
            petIDArrayStore.push(petID);
            console.log(petIDArrayStore);
          });

        console.log(petIDArrayStore);

        let object = {
          petID: JSON.stringify(petIDArrayStore)
        };

        AsyncStorage.mergeItem(
          userID,
          JSON.stringify(object),
        );

        let petObject = {
          name: this.state.name,
          weight: this.state.weight
        };

        AsyncStorage.setItem(
          petID,
          JSON.stringify(petObject),
        );
      }
      //this.props.navigation.navigate('CreateSchedule');
    }

    feedNameValidator()
    {
      if(this.state.feedName=="")
      {
        this.setState({feedNameError: "Pet Name cannot be empty"});
      }
      else
      {
        this.setState({feedNameError: ""});
      }
    }

    feedWeightValidator()
    {
      if(this.state.feedWeight=="")
      {
        this.setState({feedWeightError: "Pet's Weight cannot be empty"});
      }
      else
      {
        this.setState({feedWeightError: ""});
      }
    }

    feedNumberValidator()
    {
      if(this.state.feedNumber=="")
      {
        this.setState({feedNumberError: "Number of Feeding Times cannot be empty"});
      }
      else
      {
        this.setState({feedNumberError: ""});
      }
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
                onBlur={()=>this.feedNameValidator()}
                onChangeText={ (value) => this.setState({feedName: value}) }
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedNameError}</Text>

              <Text style={externalStyle.extraText}>Pet's Weight:</Text>
              <TextInput
                value={this.state.feedWeight}
                numericvalue
                keyboardType={'numeric'}
                onChangeText={weight => this.setState({ weight })}
                placeholder={'Weight'}
                style={externalStyle.inputStyle}
                onBlur={()=>this.feedWeightValidator()}
                onChangeText={ (value) => this.setState({feedWeight: value}) }
              />
              <Text style={externalStyle.extraText}>Note: Pet's Weight is in pounds</Text>
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedWeightError}</Text>

              <Text style={externalStyle.extraText}>How Many Times To Feed:</Text>
              <TextInput
                value={this.state.feedNumber}
                style={externalStyle.inputStyle}
                placeholder="Quantity"
                keyboardType="numeric"
                onBlur={()=>this.feedNumberValidator()}
                onChange={ e => this.setState({feedNumber: e.target.value}) }
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedNumberError}</Text>

              <View style={{width: 265,
                    justifyContent: 'center',
                    alignSelf: "center",
                    flexWrap:'wrap'}}>
                <Text style={externalStyle.extraText}>What Time To Feed?</Text>
                <TouchableOpacity
                  style={{ backgroundColor:"#FFFFFF00", padding: 2}}
                  onPress={() => {this.sendData(); this.props.navigation.navigate('Quantity');}}>
                  <Icon name="calendar" size={18} color="#000000CC" backgroundColor="#FFFFFF00"/>
                </TouchableOpacity>
              </View>
              <AddButton title="Submit" onPress={this.submitInformation} />
            </ScrollView>
            <PawIcon />
          </View>
        );
    }
}

export default AddPetScreen
