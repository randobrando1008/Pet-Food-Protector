import React from 'react';

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
    Platform,
  } from 'react-native';

import { BleManager } from 'react-native-ble-plx';

class Bluetooth extends React.Component {

    constructor(props) {
        super(props);
        this.manager = new BleManager();
    }

    async requestAccessFineLocationPermission() {
        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //     {
        //         title: 'Access fine location required for discovery',
        //         message:
        //           'In order to perform discovery, you must enable/allow ' +
        //           'fine location access.',
        //         buttonNeutral: 'Ask Me Later"',
        //         buttonNegative: 'Cancel',
        //         buttonPositive: 'OK'
        //     }
        // );
        // return granted === PermissionsAndroid.RESULTS.GRANTED;

        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: 'Location permission for bluetooth scanning',
                message: 'wahtever',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            ); 
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Location permission for bluetooth scanning granted');
              return true;
            } else {
              console.log('Location permission for bluetooth scanning revoked');
              return false;
            }
          } catch (err) {
            console.warn(err);
            return false;
          }
    };

    scanAndConnect = async () => {
        let granted = await this.requestAccessFineLocationPermission();
        if(granted)
        {
            console.log(granted);
            this.manager.startDeviceScan(null, null, (error, device) => {
                console.log("StartDeviceScan");
                if (error) {
                    // Handle error (scanning will be stopped automatically)
                    console.log(error);
                    return;
                }
    
                console.log(device);
        
                // Check if it is a device you are looking for based on advertisement data
                // or other criteria.
                if (device.name === 'TI BLE Sensor Tag' || 
                    device.name === 'SensorTag') {
                    
                    // Stop scanning as it's not necessary if you are scanning for one device.
                    this.manager.stopDeviceScan();
        
                    // Proceed with connection.
                }
            });
        }
    };
    
    componentDidMount() {
        this.scanAndConnect();
        // const subscription = this.manager.onStateChange((state) => {
        //     if (state === 'PoweredOn') {
        //         this.scanAndConnect();
        //         subscription.remove();
        //     }
        // }, true);
    };

    render() {
        return (
          <View style={{flex: 1,backgroundColor: '#fff'}}>
          </View>
        );
      }

}

export default Bluetooth