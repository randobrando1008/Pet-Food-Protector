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
  Pressable,
  AsyncStorage,
  TextInput,
  Animated,
  FlatList,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';
import { userID } from './SignInScreen.js';

export var petID = undefined;

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class CreateScheduleScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          petIDArrayStoring: [],
          storedValues: []
      }
      this.index = 0;
      this.animatedValue = new Animated.Value(0);
  }

  addMore = () => {
    this.animatedValue.setValue(0);
    let newlyAddedValue = { index: this.index }
    this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.index = this.index + 1;
        this.setState({ disabled: false });
      });
    });
  }

  sendToModify = (item) => {
    petID = "";
    petID = item.id;

    this.props.navigation.navigate('ModifyPet');
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.sendToModify(item) }>
        <View style={{borderColor: "#EAEAEA", borderWidth: 2, width: '90%', alignSelf: 'center', borderRadius: 15, margin: 3}}>
          <Text style={externalStyle.extraText}>{item.name}</Text>
          <Text style={externalStyle.extraText}>Weight: {item.petWeight}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  refreshList = async () => {
    console.log(this.state.storedValues);
    this.state.petIDArrayStoring = [];
    this.state.storedValues = [];
    await AsyncStorage.getItem(userID)
      .then(req => JSON.parse(req))
      .then(json => {
        if(json.petID != '' && json.petID != undefined)
        {
          var petIDStore = JSON.parse(json.petID);
          for(var i = 0; i < petIDStore.length; i++)
          {
            this.state.petIDArrayStoring[i] = petIDStore[i];
          }
        }
      });

    if(this.state.petIDArrayStoring.length != 0)
    {
      for(var i = 0; i < this.state.petIDArrayStoring.length; i++)
      {
        await AsyncStorage.getItem(this.state.petIDArrayStoring[i])
        .then(req => JSON.parse(req))
        .then(json => {
          let object = {

            id: this.state.petIDArrayStoring[i],
            name: json.name,
            petWeight: json.petWeight
          }

          this.setState({
            storedValues:[...this.state.storedValues, object]
          });
        });
      }
    }
    else
    {
      this.setState({
        storedValues: []
      });
    }
  }

  componentDidMount = async () => {
    AsyncStorage.getAllKeys((err, result) => {
      for(var i = 0; i < result.length; i++)
      {
        AsyncStorage.getItem(result[i], (err, result) => {
          console.log(result);
        });
      }
    });

    this.state.petIDArrayStoring = [];
    this.state.storedValues = [];
    await AsyncStorage.getItem(userID)
      .then(req => JSON.parse(req))
      .then(json => {
        if(json.petID != '' && json.petID != undefined)
        {
          var petIDStore = JSON.parse(json.petID);
          for(var i = 0; i < petIDStore.length; i++)
          {
            this.state.petIDArrayStoring[i] = petIDStore[i];
          }
        }
      });

    for(var i = 0; i < this.state.petIDArrayStoring.length; i++)
    {
      await AsyncStorage.getItem(this.state.petIDArrayStoring[i])
      .then(req => JSON.parse(req))
      .then(json => {
        let object = {
          id: this.state.petIDArrayStoring[i],
          name: json.name,
          petWeight: json.petWeight
        }

        this.setState({
          storedValues:[...this.state.storedValues, object]
        });
      });
    }
  }

  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#fff'}}>
          <View style={externalStyle.header}>
            <Text style={styles.headerText}>Let's Feed Some Doggos</Text>
            <TouchableOpacity
              style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
            </TouchableOpacity>
          </View>
          
          <View style={externalStyle.lineStyle} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddPet')}
            style={{backgroundColor:"#00A5FF", justifyContent: "center", width: 70, height: 70, borderRadius: 70/2, alignSelf: 'flex-end', position: 'absolute', bottom: 50, right: 40}}>
            <View style={{justifyContent: "center", alignSelf: "center"}}>
              <Icon name="plus" size={40} color="#FFFFFF"/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.refreshList()}
            style={{backgroundColor:"#00A5FF", justifyContent: "center", width: 70, height: 70, borderRadius: 70/2, alignSelf: 'flex-end', position: 'absolute', bottom: 50, left: 40}}>
            <View style={{justifyContent: "center", alignSelf: "center"}}>
              <Icon name="refresh" size={40} color="#FFFFFF"/>
            </View>
          </TouchableOpacity>

          <FlatList
            data={this.state.storedValues}
            renderItem={({ item }) => this.renderItem(item) }
            keyExtractor={item => item.id}
          />  

          <PawIcon />
        </View>
    );
  }
}

const styles = StyleSheet.create({

  headerText: {
    padding: 2,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  },
  inputStyle: {
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 14,
    width: 255,
    height: 40,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  }
});

export default CreateScheduleScreen
