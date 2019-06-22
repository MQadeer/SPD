import React, { Component } from 'react';
import { BackHandler, TouchableHighlight } from "react-native";
import axios from 'axios';
import config from "../../config";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';


export default class TchLogin extends Component {
  state = {
    tchId: ""
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form style={{}}>
            <Item floatingLabel>
              <Label>Professor Id</Label>
              <Input onChangeText={(value) => {
                this.setState({
                  tchId: value
                })
              }} />
            </Item>
          </Form>
          <Button large primary onPress={this.loginHandler}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  loginHandler = () => {
    axios.post(`${config.requestPort}/loginRoute/tchLogin`, {
      body: {
        tchId: this.state.tchId
      }
    })
      .then(res => {
        console.log("res parsed  ", res.data);
        res.data==null ? alert("Wrong Professor Id") : this.props.navigation.navigate('TeacherEnteries', { tchInfo: res.data });
      }).catch(err => {
        console.log("errorr ", err)
      })
  }
}