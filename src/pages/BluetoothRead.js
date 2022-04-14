import React, {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  NativeAppEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

import BleManager from '../node_modules/react-native-ble-manager/BleManager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import { stringToBytes, bytesToString } from "convert-string";
import { navigation, petIDRead } from "./ModifyPetScreen.js"

const Buffer = require('buffer/').Buffer;

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 10, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  }

  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = (data) => {
    // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

  const handleDiscoverPeripheral = (peripheral) => {
    //RN4870-C6FC - 04:91:62:94:C6:FC
    if(peripheral.name == "RN4870-C6FC" || peripheral.id == "04:91:62:94:C6:FC")
    {
      console.log('Got ble peripheral', peripheral);
    }
    // if (!peripheral.name) {
    //   peripheral.name = 'NO NAME';
    // }
    // peripherals.set(peripheral.id, peripheral);
    // setList(Array.from(peripherals.values()));
    if (peripheral.name) {
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
  }

  const testPeripheral = (peripheral) => {
    var readDataValues = [];
    var readData = true;
    var stopping = true;
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id)
        .then(() => {
          console.log('Connected to ' + peripheral.id, peripheral);

          // retrieve peripheral services info
          BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
            console.log('Retrieved peripheral services', peripheralInfo);

            // test read and write data to peripheral
            const serviceUUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
            const charasteristicUUID = '49535343-1e4d-4bd9-ba61-23c647249616';

            console.log('peripheral id:', peripheral.id);
            console.log('service:', serviceUUID);
            console.log('characteristic:', charasteristicUUID);

            BleManager.startNotification(peripheral.id, serviceUUID, charasteristicUUID).then(() => {
              bleManagerEmitter.addListener(
                "BleManagerDidUpdateValueForCharacteristic",
                ({ value, peripheral, charasteristicUUID, serviceUUID }) => {
                  if(readData)
                  {
                    // Convert bytes array to string
                    const data = bytesToString(value);
                    // console.log(data);
                    // console.log(`Recieved ${data} for characteristic ${charasteristicUUID}`);
                    if(data != "")
                    {
                      AsyncStorage.getItem(petIDRead)
                        .then(req => JSON.parse(req))
                        .then(json => {
                          console.log("Food Consumed:", json.foodConsumed);
                          readDataValues = json.foodConsumed;
                          console.log(readDataValues);

                          console.log(data);

                          readDataValues.push(data);

                          let petObject = {
                            foodConsumed: readDataValues,
                          };
                
                          AsyncStorage.mergeItem(
                            petIDRead,
                            JSON.stringify(petObject),
                          );
                        });
                        
                      readData = false;
                    }
                  }
                  else
                  {
                    if(stopping)
                    {
                      BleManager.stopNotification(peripheral.id, serviceUUID, charasteristicUUID);
                      // BleManager.disconnect(peripheral.id);
                      stopping = false;
                      navigation.navigate('ModifyPet');
                    }
                    return;
                  }
                }
              );
            });
          });
        })
        .catch((error) => {
          console.log('Connection error', error);
          // BleManager.disconnect(peripheral.id);
        });
      }
    }
  }

  useEffect(() => {
    BleManager.start({showAlert: false});

    var subscriptionDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    var subscriptionScan = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    var subscriptionDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    var subscriptionUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }  
    
    return (() => {
      console.log('unmount');
      subscriptionDiscover.remove();
      subscriptionScan.remove();
      subscriptionDisconnect.remove();
      subscriptionUpdate.remove();
    })
  }, []);

  const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableOpacity onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
    <View style={{flex: 1,backgroundColor: '#fff'}}/*style={styles.body}*/>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <View style={externalStyle.header}>
          <TouchableOpacity
            style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", flex: 1, padding: 2}}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
          </TouchableOpacity>
          <Text style={externalStyle.headerText}>Bluetooth Read</Text>
          <TouchableOpacity
            style={{ backgroundColor:"#FFFFFF00", flexDirection: "row", padding: 2}}
            onPress={() => this.props.navigation.navigate('Setting')}>
            <Icon name="gear" size={30} color="#000000CC" backgroundColor="#FFFFFF00"/>
          </TouchableOpacity>
        </View> */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={externalStyle.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

            
            <View style={{margin: 10}}>
              <TouchableOpacity onPress={() => startScan()} style={externalStyle.primaryButtonContainer}>
                <Text style={externalStyle.primaryButtonText}>{'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}</Text>
              </TouchableOpacity>
              {/* <Button
                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                onPress={() => startScan() } 
              />             */}
            </View>

            <View style={{margin: 10}}>
              <TouchableOpacity onPress={() => retrieveConnected()} style={externalStyle.secondaryButtonContainer}>
                <Text style={externalStyle.secondaryButtonText}>{"Retrieve connected peripherals"}</Text>
              </TouchableOpacity>
              {/* <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } /> */}
            </View>

            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center', color: '#C4C4C4', fontSize: 18}}>No peripherals</Text>
              </View>
            }
          

        </ScrollView>
        <FlatList
            data={list}
            renderItem={({ item }) => renderItem(item) }
            keyExtractor={item => item.id}
          />

        <PawIcon />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
