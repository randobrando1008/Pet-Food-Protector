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
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <View>
                <Image
                style={{ resizeMode:'contain', alignSelf: 'center', height: 70, width: 400, right: 17 }}
                source={require('./happyDoggo.png')}
                />
                <Text>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.email}
                  placeholder="Email"
                />
                <Text>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.password}
                  placeholder="Password"
                />
                <Button
                  title="Sign In"
                  onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen