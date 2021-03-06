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
  TouchableHighlight,
  ToastAndroid
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BleManager from '../node_modules/react-native-ble-manager/BleManager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import { stringToBytes, bytesToString } from "convert-string";

import { feedingHours, feedingMinutes, weightOfFood, feedingNumbers, navigation} from "./DatePickerScreenAdd.js"

import externalStyle from '../styles/externalStyle';
import PawIcon from '../styles/PawIcon';

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
    // navigation.navigate("CreateSchedule");
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
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
    if (peripheral.name) {
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
  }
  /*A=targetWeight
  B=hour 1
  C=minute 1
  D=hour 2
  E=minute 2
  F=hour 3
  G=
  */

  const testPeripheral = (peripheral) => {
    var writeDataArray = [];
    var convertedWriteDataArray = [];
    var writeDataSeparated = "";
    var writeData = `${weightOfFood}${feedingHours[0]}${feedingMinutes[0]}${feedingHours[1]}${feedingMinutes[1]}${feedingHours[2]}${feedingMinutes[2]}`;
    for(var i = 0; i < writeData.length; i++)
    {
      writeDataArray.push(writeData[i]);
    }

    for(var i = 0; i < writeDataArray.length; i++)
    {
      convertedWriteDataArray.push(stringToBytes(writeDataArray[i]));
    }

    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id)
        .then(() => {
          console.log('Connected to ' + peripheral.id, peripheral);

          BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
            console.log(peripheralInfo);
            const serviceUUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
            const charasteristicUUID = '49535343-1e4d-4bd9-ba61-23c647249616';
            setTimeout(() => {
              BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[0]).then(() => {
                console.log("Write: " + convertedWriteDataArray[0]);
                BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[1]).then(() => {
                  console.log("Write: " + convertedWriteDataArray[1]);
                  BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[2]).then(() => {
                    console.log("Write: " + convertedWriteDataArray[2]);
                    BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[3]).then(() => {
                      console.log("Write: " + convertedWriteDataArray[3]);
                      BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[4]).then(() => {
                        console.log("Write: " + convertedWriteDataArray[4]);
                        BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[5]).then(() => {
                          console.log("Write: " + convertedWriteDataArray[5]);
                          BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[6]).then(() => {
                            console.log("Write: " + convertedWriteDataArray[6]);
                            BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[7]).then(() => {
                              console.log("Write: " + convertedWriteDataArray[7]);
                              BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[8]).then(() => {
                                console.log("Write: " + convertedWriteDataArray[8]);
                                BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[9]).then(() => {
                                  console.log("Write: " + convertedWriteDataArray[9]);
                                  BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[10]).then(() => {
                                    console.log("Write: " + convertedWriteDataArray[10]);
                                    BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[11]).then(() => {
                                      console.log("Write: " + convertedWriteDataArray[11]);
                                      BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[12]).then(() => {
                                        console.log("Write: " + convertedWriteDataArray[12]);
                                        BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[13]).then(() => {
                                          console.log("Write: " + convertedWriteDataArray[13]);
                                          BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, convertedWriteDataArray[14]).then(() => {
                                            console.log("Write: " + convertedWriteDataArray[14]);
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              })
              .catch((error) => {
                console.log(error);
              });
            }, 500);
          });
        })
        .catch((error) => {
          console.log('Connection error', error);
          ToastAndroid.showWithGravity(
            "Connection Error",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        });
      }
    }

    /*Test Data*/
    // var testWriteDataArray = [];
    // var testConvertedWriteDataArray = [];

    // testWriteDataArray.push('6');
    // // testWriteDataArray.push('15');
    // // testWriteDataArray.push('4');
    // // testWriteDataArray.push('22');
    // // testWriteDataArray.push('47');
    // // testWriteDataArray.push('1');
    // // testWriteDataArray.push('23');

    // for(var i = 0; i < testWriteDataArray.length; i++)
    // {
    //   testConvertedWriteDataArray.push(stringToBytes(testWriteDataArray[i]));
    // }

    // console.log(testConvertedWriteDataArray);

    // if (peripheral){
    //   if (peripheral.connected){
    //     BleManager.disconnect(peripheral.id);
    //   }else{
    //     BleManager.connect(peripheral.id)
    //     .then(() => {
    //       console.log('Connected to ' + peripheral.id, peripheral);

    //       BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
    //         console.log(peripheralInfo);
    //         const serviceUUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
    //         const charasteristicUUID = '49535343-1e4d-4bd9-ba61-23c647249616';

    //         setTimeout(() => {
    //           BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[0]).then(() => {
    //             console.log("Write: " + testConvertedWriteDataArray[0]);
    //             // BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[1]).then(() => {
    //             //   console.log("Write: " + testConvertedWriteDataArray[1]);
    //             //   BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[2]).then(() => {
    //             //     console.log("Write: " + testConvertedWriteDataArray[2]);
    //             //     BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[3]).then(() => {
    //             //       console.log("Write: " + testConvertedWriteDataArray[3]);
    //             //       BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[4]).then(() => {
    //             //         console.log("Write: " + testConvertedWriteDataArray[4]);
    //             //         BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[5]).then(() => {
    //             //           console.log("Write: " + testConvertedWriteDataArray[5]);
    //             //           BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[6]).then(() => {
    //             //             console.log("Write: " + testConvertedWriteDataArray[6]);
    //             //           });
    //             //         });
    //             //       });
    //             //     });
    //             //   });
    //             // });
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //         }, 1000);
    //         // setTimeout(() => {
    //         //   BleManager.startNotification(peripheral.id, serviceUUID, charasteristicUUID).then(() => {
    //         //     console.log('Started notification on ' + peripheral.id);
                
    //         //     setTimeout(() => {
    //         //       BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, [54]).then(() => {
    //         //         console.log("Write: " + "54");
    //         //         // BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[1]).then(() => {
    //         //         //   console.log("Write: " + testConvertedWriteDataArray[1]);
    //         //         //   BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[2]).then(() => {
    //         //         //     console.log("Write: " + testConvertedWriteDataArray[2]);
    //         //         //     BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[3]).then(() => {
    //         //         //       console.log("Write: " + testConvertedWriteDataArray[3]);
    //         //         //       BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[4]).then(() => {
    //         //         //         console.log("Write: " + testConvertedWriteDataArray[4]);
    //         //         //         BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[5]).then(() => {
    //         //         //           console.log("Write: " + testConvertedWriteDataArray[5]);
    //         //         //           BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, testConvertedWriteDataArray[6]).then(() => {
    //         //         //             console.log("Write: " + testConvertedWriteDataArray[6]);
    //         //         //           });
    //         //         //         });
    //         //         //       });
    //         //         //     });
    //         //         //   });
    //         //         // });
    //         //       })
    //         //       .catch((error) => {
    //         //         console.log(error);
    //         //       });
    //         //     }, 1000);
    //         //     // navigation.navigate("CreateSchedule");
    //         //     //BleManager.disconnect(peripheral.id);
    //         //   }).catch((error) => {
    //         //     console.log('Notification error', error);
    //         //   });
    //         // }, 200);
    //       });
    //     })
    //     .catch((error) => {
    //       console.log('Connection error', error);
    //       // BleManager.disconnect(peripheral.id);
    //     });
    //   }
    // }
  }
  /*A=targetWeight
  B=hour 1
  C=minute 1
  D=hour 2
  E=minute 2
  F=hour 3
  G=mintue 3
  */
  useEffect(() => {
    var writeDataArray = [];
    var convertedWriteDataArray = [];
    var writeDataSeparated = "";
    var writeData = `${weightOfFood}${feedingHours[0]}${feedingMinutes[0]}${feedingHours[1]}${feedingMinutes[1]}${feedingHours[2]}${feedingMinutes[2]}`;
    for(var i = 0; i < writeData.length; i++)
    {
      writeDataArray.push(writeData[i]);
    }

    for(var i = 0; i < writeDataArray.length; i++)
    {
      convertedWriteDataArray.push(stringToBytes(writeDataArray[i]));
    }

    console.log(writeDataArray);
    console.log(convertedWriteDataArray)

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
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            
            <View style={{margin: 10}}>
              <TouchableOpacity onPress={() => startScan() } style={externalStyle.primaryButtonContainer}>
                <Text style={externalStyle.primaryButtonText}>{'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 10}}>
              <TouchableOpacity onPress={() => retrieveConnected() } style={externalStyle.primaryButtonContainer}>
                <Text style={externalStyle.primaryButtonText}>{"Retrieve connected peripherals"}</Text>
              </TouchableOpacity>
            </View>

            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center', color: '#C4C4C4', fontSize: 18,}}>No peripherals</Text>
              </View>
            }
          
          </View>              
        </ScrollView>
        <FlatList
            data={list}
            renderItem={({ item }) => renderItem(item) }
            keyExtractor={item => item.id}
        />
        <PawIcon />
      </SafeAreaView>
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
