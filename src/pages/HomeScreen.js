import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  NativeModules,
  NativeEventEmitter,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  PermissionsAndroid,
  AsyncStorage,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

const SignInButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.primaryButtonContainer}>
      <Text style={externalStyle.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

const CreateAccountButton = ({ onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={externalStyle.secondaryButtonContainer}>
      <Text style={externalStyle.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    }
  }

  async requestAccessFineLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access.',
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  connectToDevice = async (device) => {
    console.log(device);
    console.log(device._bluetoothModule._nativeModule);
    let connection = true;
    connection = await device._bluetoothModule._nativeModule.isDeviceConnected(device.address);
    // console.log(connection);
    try {
      // let deviceAccept = await device._bluetoothModule._nativeModule.accept({});
      console.log("Attempting Connection.....");
      let connectToDevice = device._bluetoothModule._nativeModule.connectToDevice(device.address, {}).then(() => {
        connection = device._bluetoothModule._nativeModule.isDeviceConnected(device.address);
        //console.log(connection);
      });
      //connection = await device._bluetoothModule._nativeModule.isDeviceConnected(device.address);
      
      //console.log("After Connection.....");
      // let connection = await RNBluetoothClassic.connectToDevice(
      //    device.address,
      //    {}
      //  );

      let readMessage = await device._bluetoothModule._nativeModule.readFromDevice(device.address);
      //console.log(readMessage);
      //console.log("After Read.....");

      // console.log(connection);
    } catch (error) {
      // Handle error accordingly
      console.log(error.message);
    }
    // connection = await device.isConnected();
    // console.log(connection)
    // let connected = await RNBluetoothClassic.connectToDevice(
    //   devices[0].address,
    //   {}
    // );
    // console.log(connected);
  }

  startDiscovery = async () => {
    let found = false;
    try {
      let granted = await this.requestAccessFineLocationPermission();

      if (!granted) {
      throw new Error(`Access fine location was not granted`);
      }
  
      this.setState({ discovering: true });
  
      try {
        let device: BluetoothDevice;

        while(!found)
        {
          let discoveredDevices: BluetoothNativeDevice[] = await RNBluetoothClassic.startDiscovery();
        
          for (let discovered of discoveredDevices) {
            console.log(discovered.name);
            // if(discovered.name == "RN4870-C657")
            // {
            //   device = discovered;
            //   this.connectToDevice(device);
            //   break;
            // }
            if(discovered.name == "RN4870-C657")
            {
              device = discovered;
              found = true;
              try {
                let cancelled = await RNBluetoothClassic.cancelDiscovery();
              } catch(error) {
                console.log(error.message);
              }
              break;
            }
          }
        }

        this.connectToDevice(device);
        
      } catch (err) {
        console.log(err.message);
      }     
    } catch (err) {
      console.log(err.message);
      // Toast.show({
      // text: err.message,
      // duration: 2000
      // });
    }
  }

  // componentDidMount = async () => {
    // var id = "123";
    // var petIDArray = ["123","234"];
    // var petIDArrayStore = [];

    // let object = {
    //   firstname: "TEST",
    //   lastname: "TESTASWELL",
    //   email: "TEST@EMAIL.COM",
    //   password: "PASSWORD",
    //   petID: JSON.stringify(petIDArray)
    // };

    // AsyncStorage.setItem(
    //   id,
    //   JSON.stringify(object),
    // );
    
    // AsyncStorage.getItem(id)
    //   .then(req => JSON.parse(req))
    //   .then(json => {
    //     var petIDStore = JSON.parse(json.petID);
    //     for(var i = 0; i < petIDStore.length; i++)
    //     {
    //       petIDArrayStore[i] = petIDStore[i];
    //     }
    //     petIDArrayStore.push("345");
    //   })

    // AsyncStorage.getAllKeys((err, result) => {
    //   console.log(result);
    // });
  //   try {
  //     available = await RNBluetoothClassic.isBluetoothAvailable();
  //     if(available)
  //     {
  //       try {
  //         enabled = await RNBluetoothClassic.isBluetoothEnabled();
  //         if(enabled)
  //         {
  //           this.startDiscovery();
  //         }
  //       } catch (err) {
  //           // Handle accordingly
  //           console.log(err);
  //       }
  //     }
  //   } catch (err) {
  //     // Handle accordingly
  //     console.log(err)
  //   }
  // }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        <Image
        style={{ resizeMode:'contain', alignSelf: 'center', height: 70, width: 400, marginTop: 10 }}
        source={require('./happyDoggo.png')}
        />
        <View style = {externalStyle.lineStyle} />
        <Text style={styles.headerText}>Welcome to The Happy Doggo!</Text>
        <Text style={styles.extraText}>If you already have an account click the Sign In button below, if you're a new user go ahead and Create an Account.</Text>
        <View style = {externalStyle.lineStyle} />
        <SignInButton title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
        <CreateAccountButton title="Create an Account" onPress={() => this.props.navigation.navigate('CreateAccount')} />
        <Button title="Bluetooth" onPress={() => this.props.navigation.navigate('Bluetooth')} />
        <PawIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5,
    marginTop: 15
  },
  extraText: {
    color: '#000',
    fontSize: 18,
    width: 265,
    justifyContent: 'center',
    alignSelf: "center",
    margin: 5
  }
});

export default HomeScreen
