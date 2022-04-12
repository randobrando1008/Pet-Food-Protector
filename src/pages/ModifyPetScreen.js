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

import { readData } from "./BluetoothRead.js"

export var quantitySent2;

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
export let navigation;

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
        feedWeight: '',
        feedWeightError: '',
        feedNumber: '',
        feedNumberError: '',
        feedTime: '',
        feedTimeError: ''
      }
  }

  submitInformation = async () => {
    var isNameValid = false;
    var isWeightValid = false;
    var isFeedAmountValid = false;
    var isFeedTimeValid = false;
    if(this.state.feedName != "")
    {
      isNameValid = true;
    }

    if(this.state.feedWeight != "")
    {
      if(parseInt(this.state.feedWeight) < 351 && parseInt(this.state.feedWeight) > 0)
        isWeightValid = true;
    }
    console.log(this.state.feedNumber);
    if(this.state.feedNumber != "")
    {
      if(parseFloat(this.state.feedNumber) < 2.1 && parseFloat(this.state.feedNumber) > 0)
        isFeedAmountValid = true;
    }

    if(this.state.feedTime != "")
    {
      if(parseInt(this.state.feedTime) < 4 && parseInt(this.state.feedTime) > 0)
        isFeedTimeValid = true;
    }

    if(!isNameValid || this.state.feedName == "")
    {
      this.setState({feedNameError: "Pet Name is not valid"});
    }
    else
    {
      this.setState({feedNameError: ""});
    }

    if(!isWeightValid || this.state.feedWeight == "" || parseInt(this.state.feedWeight) > 350)
    {
      this.setState({feedWeightError: "Max weight 350"});
    }
    else
    {
      this.setState({feedWeightError: ""});
    }

    if(!isFeedAmountValid || this.state.feedNumber == "" || this.state.feedNumber > 2)
    {
      this.setState({feedNumberError: "Max amount of food is 2 cups"});
    }
    else
    {
      this.setState({feedNumberError: ""});
    }

    if(!isFeedTimeValid || this.state.feedTime == "" || this.state.feedTime > 3)
    {
        this.setState({feedTimeError: "Max number of feeding times is 3"});
    }
    else
    {
        this.setState({feedTimeError: ""});
    }

    if(isNameValid && isWeightValid && isFeedAmountValid && isFeedTimeValid)
    {

      // var petID = uuidv4();
      // var petIDArrayStore = [];

      // await AsyncStorage.getItem(userID)
      //   .then(req => JSON.parse(req))
      //   .then(json => {
      //     console.log("PetID: ", json.petID);
      //     if(json.petID != '' && json.petID != undefined)
      //     {
      //       var petIDStore = JSON.parse(json.petID);
      //       for(var i = 0; i < petIDStore.length; i++)
      //       {
      //         petIDArrayStore[i] = petIDStore[i];
      //       }
      //     }
      //     console.log(petID);
      //     petIDArrayStore.push(petID);
      //     console.log(petIDArrayStore);
      //   });

      // console.log(petIDArrayStore);

      // let object = {
      //   petID: JSON.stringify(petIDArrayStore)
      // };

      // AsyncStorage.mergeItem(
      //   userID,
      //   JSON.stringify(object),
      // );

      // let petObject = {
      //   name: this.state.feedName,
      //   weight: this.state.feedWeight
      // };

      // AsyncStorage.setItem(
      //   petID,
      //   JSON.stringify(petObject),
      // );

      quantitySent2 = this.state.feedTime;
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

  feedWeightValidator()
  {
    console.log(this.state.feedWeight);
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
      this.setState({feedNumberError: "Amount of food cannot be empty"});
    }
    else
    {
      this.setState({feedNumberError: ""});
    }
  }

  feedTimeValidator()
  {
    if(this.state.feedTime=="")
    {
      this.setState({feedTimeError: "Number of feeding times cannot be empty"});
    }
    else
    {
      this.setState({feedTimeError: ""});
    }
  }

  componentDidMount = () => {
    console.log(petID);
    console.log(readData);
    navigation = this.props.navigation;
    AsyncStorage.getItem(petID, (err, result) => {
      var parsedResults = JSON.parse(result);
      console.log(parsedResults);
      this.setState({feedName: parsedResults.name});
      this.setState({feedWeight: parsedResults.petweight});
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
            onChangeText={feedWeight => this.setState({ feedWeight })}
            placeholder={'Weight'}
            style={externalStyle.inputStyle}
            onBlur={()=>this.feedWeightValidator()}
          />
          <Text style={externalStyle.extraText}>Note: Pet's Weight is in pounds</Text>
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedWeightError}</Text>

          <Text style={externalStyle.extraText}>How Much Food To Feed:</Text>
          <TextInput
            value={this.state.feedNumber}
            autoCapitalize="none"
            keyboardType={'numeric'}
            onChangeText={feedNumber => this.setState({ feedNumber })}
            placeholder={'Quantity'}
            style={externalStyle.inputStyle}
            onBlur={()=>this.feedNumberValidator()}
          />
          <Text style={externalStyle.extraText}>Note: Food Weight is in cups</Text>
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedNumberError}</Text>

          <Text style={externalStyle.extraText}>How many times a day:</Text>
          <TextInput
              value={this.state.feedTime}
              numericvalue
              keyboardType={'numeric'}
              onChangeText={feedTime => this.setState({ feedTime })}
              placeholder={'Quantity'}
              style={externalStyle.inputStyle}
              onBlur={()=>this.feedTimeValidator()}
          />
          <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.feedTimeError}</Text>

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
function SettingsScreen() {
  var tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
  var tableData = ['Data', 'Data2', 'Data3', 'Data4'];
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SignInButton title="BLUETOOTH" onPress={() => navigation.navigate('BluetoothRead')} />
      <Table borderStyle={{borderWidth: 2, borderColor: '#00A5FF'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        <Row data={tableData} textStyle={styles.text}/>
      </Table>
    </View>
  );
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
      <Tab.Screen options={{headerShown:false}} name="Analytics" component={SettingsScreen} />
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
