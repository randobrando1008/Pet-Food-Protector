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

export var quantitySent;
export var pagePass;

import { userID } from './SignInScreen.js';
import { v4 as uuidv4 } from 'uuid';

export let petIDAdd = undefined;

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
          petWeight: '',
          petWeightError: '',
          foodQuantity: '',
          foodQuantityError: '',
          numberOfFeedings: '',
          numberOfFeedingsError: ''

        }
    }

    submitInformation = async () => {
      var isNameValid = false;
      var isWeightValid = false;
      var isFeedAmountValid = false;
      var isnumberOfFeedingsValid = false;

      if(this.state.feedName != "")
      {
        isNameValid = true;
      }

      if(this.state.petWeight != "")
      {
        if(parseInt(this.state.petWeight) < 351 && parseInt(this.state.petWeight) > 0)
          isWeightValid = true;
      }

      if(this.state.foodQuantity != "")
      {
        if(parseFloat(this.state.foodQuantity) < 2.1 && parseFloat(this.state.foodQuantity) > 0)
          isFeedAmountValid = true;
      }

      if(this.state.numberOfFeedings != "")
      {
        if(parseInt(this.state.numberOfFeedings) < 4 && parseInt(this.state.numberOfFeedings) > 0)
          isnumberOfFeedingsValid = true;
      }

      if(!isNameValid || this.state.feedName == "")
      {
        this.setState({feedNameError: "Pet Name is not valid"});
      }
      else
      {
        this.setState({feedNameError: ""});
      }

      if(!isWeightValid || this.state.petWeight == "" || parseInt(this.state.petWeight) > 350)
      {
        this.setState({petWeightError: "Max weight 350"});
      }
      else
      {
        this.setState({petWeightError: ""});
      }

      if(!isFeedAmountValid || this.state.foodQuantity == "" || this.state.foodQuantity > 2)
      {
        this.setState({foodQuantityError: "Max amount of food is 2 cups"});
      }
      else
      {
        this.setState({foodQuantityError: ""});
      }

      if(!isnumberOfFeedingsValid || this.state.numberOfFeedings == "" || this.state.numberOfFeedings > 3)
      {
          this.setState({numberOfFeedingsError: "Max number of feeding times is 3"});
      }
      else
      {
          this.setState({numberOfFeedingsError: ""});
      }

      if(isNameValid && isWeightValid && isFeedAmountValid && isnumberOfFeedingsValid)
      {
        var pet_id = uuidv4();
        var petIDArrayStore = [];

        await AsyncStorage.getItem(userID)
          .then(req => JSON.parse(req))
          .then(json => {
            //console.log("PetID: ", json.petID);
            if(json.petID != '' && json.petID != undefined)
            {
              var petIDStore = JSON.parse(json.petID);
              for(var i = 0; i < petIDStore.length; i++)
              {
                petIDArrayStore[i] = petIDStore[i];
              }
            }
            //console.log(petID);
            petIDArrayStore.push(pet_id);
          });

        let object = {
          petID: JSON.stringify(petIDArrayStore)
        };

        AsyncStorage.mergeItem(
          userID,
          JSON.stringify(object),
        );

        let petObject = {
          name: this.state.feedName,
          petWeight: this.state.petWeight,
          foodQuantity: this.state.foodQuantity,
          numberOfFeedings: this.state.numberOfFeedings,
          feedingTimes: [],
          foodConsumed: []
        };

        AsyncStorage.setItem(
          pet_id,
          JSON.stringify(petObject),
        );
        
        petIDAdd = "";
        petIDAdd = pet_id;
        pagePass = this.props.route.name;
        quantitySent = this.state.numberOfFeedings;
        this.props.navigation.navigate('DatePickerScreen');
      }
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

    petWeightValidator()
    {
      if(this.state.petWeight=="")
      {
        this.setState({petWeightError: "Pet's Weight cannot be empty"});
      }
      else
      {
        this.setState({petWeightError: ""});
      }
    }

    foodQuantityValidator()
    {
      if(this.state.foodQuantity=="")
      {
        this.setState({foodQuantityError: "Amount of food cannot be empty"});
      }
      else
      {
        this.setState({foodQuantityError: ""});
      }
    }

    numberOfFeedingsValidator()
    {
      if(this.state.numberOfFeedings=="")
      {
        this.setState({numberOfFeedingsError: "Number of feeding times cannot be empty"});
      }
      else
      {
        this.setState({numberOfFeedingsError: ""});
      }
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
                value={this.state.petWeight}
                numericvalue
                keyboardType={'numeric'}
                onChangeText={petWeight => this.setState({ petWeight })}
                placeholder={'Weight'}
                style={externalStyle.inputStyle}
                onBlur={()=>this.petWeightValidator()}
              />
              <Text style={externalStyle.extraText}>Note: Pet's Weight is in pounds</Text>
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.petWeightError}</Text>

              <Text style={externalStyle.extraText}>How Much Food To Feed:</Text>
              <TextInput
                value={this.state.foodQuantity}
                autoCapitalize="none"
                keyboardType={'numeric'}
                onChangeText={foodQuantity => this.setState({ foodQuantity })}
                placeholder={'Quantity'}
                style={externalStyle.inputStyle}
                onBlur={()=>this.foodQuantityValidator()}
              />
              <Text style={externalStyle.extraText}>Note: Food Weight is in cups</Text>
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.foodQuantityError}</Text>

              <Text style={externalStyle.extraText}>How many times a day:</Text>
              <TextInput
                  value={this.state.numberOfFeedings}
                  numericvalue
                  keyboardType={'numeric'}
                  onChangeText={numberOfFeedings => this.setState({ numberOfFeedings })}
                  placeholder={'Quantity'}
                  style={externalStyle.inputStyle}
                  onBlur={()=>this.numberOfFeedingsValidator()}
              />
              <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.numberOfFeedingsError}</Text>

              <View style={{width: 265,
                    justifyContent: 'center',
                    alignSelf: "center",
                    flexWrap:'wrap'}}>
                <Text style={externalStyle.extraText}>What Times To Feed?</Text>
                <TouchableOpacity
                  style={externalStyle.primaryButtonContainer}
                  onPress={() => this.submitInformation()}>
                  <Text style={externalStyle.primaryButtonText}>Pick Times</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <PawIcon />
          </View>
        );
    }
}

export default AddPetScreen
