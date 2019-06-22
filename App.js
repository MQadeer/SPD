import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import AppNavigator from "./src/navigation/navigation";
export default class App extends Component {

  
  render() {
    return (
      <AppNavigator />
    );
  }
}
