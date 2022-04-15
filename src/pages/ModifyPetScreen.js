import React, {useState, Component} from 'react';
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
import { format } from "date-fns";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { petID } from "./CreateScheduleScreen.js";
import { userID } from './SignInScreen.js';

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

export var quantitySent;
export let navigation;
export var petIDModify;
export var petIDRead;

const SignInButton = ({ onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
    <Text style={externalStyle.primaryButtonText}>{title}</Text>
  </TouchableOpacity>
);

class HomeScreen extends React.Component {

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
      let foodInGrams = parseFloat(this.state.foodQuantity) * 128;

      let petObject = {
        name: this.state.feedName,
        petWeight: this.state.petWeight,
        foodQuantity: foodInGrams.toString(),
        numberOfFeedings: this.state.numberOfFeedings,
      };

      AsyncStorage.mergeItem(
        petID,
        JSON.stringify(petObject),
      );

      petIDModify = petID;
      quantitySent = this.state.numberOfFeedings;
      this.props.navigation.navigate('DatePickerScreenModify');
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

    if(parseFloat(this.state.petWeight) >= 1 && parseFloat(this.state.petWeight) <= 12)
    {
      this.setState({recommendFeeding1: "Recommended Ammount for 1 feeding time(in cups): 0.33 - 1"});
      this.setState({recommendFeeding2: "Recommended Ammount for 2 feeding times(in cups): 0.17 - 0.5"});
      this.setState({recommendFeeding3: "Recommended Ammount for 3 feeding times(in cups): 0.11 - 0.33"});
    }
    else if(parseFloat(this.state.petWeight) >= 13 && parseFloat(this.state.petWeight) <= 20)
    {
      this.setState({recommendFeeding1: "Recommended Ammount for 1 feeding time(in cups): 1 - 1.33"});
      this.setState({recommendFeeding2: "Recommended Ammount for 2 feeding times(in cups): 0.5 - 0.67"});
      this.setState({recommendFeeding3: "Recommended Ammount for 3 feeding times(in cups): 0.33 - 0.44"});
    }
    else if(parseFloat(this.state.petWeight) >= 21 && parseFloat(this.state.petWeight) <= 35)
    {
      this.setState({recommendFeeding1: "Recommended Ammount for 1 feeding time(in cups): 1.33 - 2"});
      this.setState({recommendFeeding2: "Recommended Ammount for 2 feeding times(in cups): 0.67 - 1"});
      this.setState({recommendFeeding3: "Recommended Ammount for 3 feeding times(in cups): 0.44 - 0.67"});
    }
    else if(parseFloat(this.state.petWeight) >= 36 && parseFloat(this.state.petWeight) <= 50)
    {
      this.setState({recommendFeeding1: "Recommended Ammount for 1 feeding time(in cups): 2 - 2.67"});
      this.setState({recommendFeeding2: "Recommended Ammount for 2 feeding times(in cups): 1 - 1.33"});
      this.setState({recommendFeeding3: "Recommended Ammount for 3 feeding times(in cups): 0.67 - 0.88"});
    }
    else
    {
      this.setState({recommendFeeding1: ""});
      this.setState({recommendFeeding2: ""});
      this.setState({recommendFeeding3: ""});
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

  deletePet = async () => {
    var petIDArrayStore = [];

    await AsyncStorage.getAllKeys((err, result) => {
      console.log(result);
    });

    await AsyncStorage.getItem(userID)
      .then(req => JSON.parse(req))
      .then(json => {
        var petIDs = JSON.parse(json.petID);
        console.log(petIDs);
        for(var i = 0; i < petIDs.length; i++)
        {
          if(petIDs[i] == petID)
          {
            petIDs[i] = "";
            break;
          }
        }
        console.log(petIDs);
        for(var i = 0; i < petIDs.length; i++)
        {
          if(petIDs[i] != "")
          {
            petIDArrayStore[i] = petIDs[i];
          }
        }
        console.log(petIDArrayStore);
      });

      
    let object = {
      petID: JSON.stringify(petIDArrayStore)
    };

    await AsyncStorage.mergeItem(
      userID,
      JSON.stringify(object),
    );

    await AsyncStorage.removeItem(petID);

    await AsyncStorage.getAllKeys((err, result) => {
      console.log(result);
    });

    await AsyncStorage.getItem(userID)
      .then(req => JSON.parse(req))
      .then(json => {
        console.log(json);
      });
      
    this.props.navigation.navigate('CreateSchedule');
  }

  componentDidMount = () => {
    console.log(petID);
    petIDRead = petID;
    navigation = this.props.navigation;
    AsyncStorage.getItem(petID, (err, result) => {
      var parsedResults = JSON.parse(result);
      console.log(parsedResults);
      let foodInCups = parseFloat(parsedResults.foodQuantity) / 128;
      this.setState({feedName: parsedResults.name});
      this.setState({petWeight: parsedResults.petWeight});
      this.setState({foodQuantity: foodInCups.toString()});
      this.setState({numberOfFeedings: parsedResults.numberOfFeedings});
    });
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
          <Text style={externalStyle.headerText}>Modify Schedule</Text>
          <TouchableOpacity
            style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
            onPress={() => this.deletePet()}>
            <Icon name="trash" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
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
          <Text style={{alignSelf: 'center', color: 'green'}}>{this.state.recommendFeeding1}</Text>
          <Text style={{alignSelf: 'center', color: 'green'}}>{this.state.recommendFeeding2}</Text>
          <Text style={{alignSelf: 'center', color: 'green'}}>{this.state.recommendFeeding3}</Text>

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
      </View>
    );
  }
}

// 4/7/22, Dispensed: 00g
class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tableData: ['', '', '', '', '', '', ''],
      petIDArrayStoring: [],
      storedValues: [],
    }
  }

  refreshList = async () => {
    await AsyncStorage.getItem(petID)
      .then(req => JSON.parse(req))
      .then(json => {
        console.log(json.foodConsumed);
        for(var i = 0; i < json.foodConsumed.length; i++)
        {
          if(json.foodConsumed[i] == "")
          {
            json.foodConsumed[i] = '4/9/22, 30g';
            break;
          }
        }
        this.setState({tableData: json.foodConsumed});
        console.log(this.state.tableData);
      });
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem(petID)
      .then(req => JSON.parse(req))
      .then(json => {
        console.log(json.foodConsumed);
        this.setState({tableData: json.foodConsumed});
        console.log(this.state.tableData);
      });
  };

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <Table borderStyle={{margin: 2, borderWidth: 2, borderRadius: 10, borderColor: '#EAEAEA'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Row data={this.state.tableData} textStyle={styles.text}/>
        </Table>
        <SignInButton title="Refresh Data" onPress={() => navigation.navigate('BluetoothRead')} />
        <TouchableOpacity
            onPress={() => this.refreshList()}
            style={{backgroundColor:"#00A5FF", justifyContent: "center", width: 70, height: 70, borderRadius: 70/2, alignSelf: 'flex-end', position: 'absolute', bottom: 50, left: 40}}>
            <View style={{justifyContent: "center", alignSelf: "center"}}>
              <Icon name="refresh" size={40} color="#FFFFFF"/>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();

export default function ModifyPetScreen() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Modify Schedule') {
              iconName = focused
                ? 'paw'
                : 'paw';
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'rocket' : 'rocket';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen options={{headerShown:false}} name="Modify Schedule" component={HomeScreen} />
      <Tab.Screen options={{headerTitleAlign: 'center', headerShown:true}} name="Analytics" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const AddButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40,  width: '80%', boarderRadius:20, backgroundColor: '#ffffff' },
  text: { margin: 6, color: '#C4C4C4' }
});
