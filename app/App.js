/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  Button,
  TextInput,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  const [amountnumber, onChangeAmountNumber] = React.useState(null);
  const [timesNumber, onChangeTimesNumber] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hours = ((date.getHours() + 11) % 12 + 1);
    minutes = date.getMinutes();
    if(date.getHours() > 12)
    {
      dd = "PM"
    }
    else
    {
      dd = "AM"
    }
    console.log("A time has been picked: ", hours + ":" + minutes + dd);
    hideDatePicker();
  };

  return (
    <View>
      <Text>How Much To Feed:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAmountNumber}
        value={amountnumber}
        placeholder="Quantity"
        keyboardType="numeric"
      />
      <Text>Feed Number: {amountnumber}</Text>

      <Text>How many times a day:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTimesNumber}
        value={timesNumber}
        placeholder="Quantity"
        keyboardType="numeric"
      />
      <Text>Times Number: {timesNumber}</Text>

      <Button title="What time to feed?" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
