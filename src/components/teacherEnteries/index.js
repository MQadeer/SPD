import React, { Component } from 'react';
import {BackHandler} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import config from "../../config";
import axios from "axios";
export default class TeacherEnteries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      teacherchId: "",
      tchInfo: {},
      place: "",
      dateAndtime: ""
    };

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.setState({
      tchInfo: this.props.navigation.getParam('tchInfo', {})
      
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      dateAndtime: date
    })
    this.hideDateTimePicker();
  };

  render() {
    return (
      <Container>
        <Header />
        <Content style={{ padding: 15 }}>
          <Form style={{ marginTop: 10 }}>
            <Item>
              <Text>{this.state.tchInfo.prof_name}</Text>
            </Item>
            <Item>
              <Text>{this.state.tchInfo.prof_id}</Text>
            </Item>
            <Item floatingLabel style={{ borderBottomColor: config.appColor, borderBottomWidth: 2 }}>
              <Label style={{ color: config.appColor, fontSize: 15 }}>Enter PLace name here</Label>
              <Input style={{ borderColor: "blue" }} onChangeText={(value) => {
                this.setState({
                  place: value
                })
                console.log(this.state);
              }} />
            </Item>

            <Item>

            </Item>
          </Form>
          <Button onPress={this.showDateTimePicker}
            style={{ marginTop: 10, alignSelf: 'center' }}>
            <Text style={{ fontSize: 24, }}>Set Date and Time</Text>
          </Button>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode='datetime'
          />
          
          <Button large primary style={{ marginTop: 10, alignSelf: 'center' }}
          onPress={this.submitHandler}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container >
    );
  }
  submitHandler = () => {
    axios.post(`${config.requestPort}/scheduleRoute/saveSchedule`, {
      body: {
        teacherId: this.state.tchInfo.prof_id,
        place: this.state.place,
        dateAndtime: this.state.dateAndtime
      }
    })
      .then(function (response) {
        alert("Schedule updated !");
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}