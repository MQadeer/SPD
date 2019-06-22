import React, { Component } from 'react';
import { BackHandler, TouchableHighlight } from "react-native";
import axios from 'axios';
import config from "../../config";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';


export default class Login extends Component {
  state = {
    agno: ""
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form style={{}}>
            <Item floatingLabel>
              <Label>Student Ag No</Label>
              <Input value={this.state.agno} onChangeText={(value) => {
                this.setState({
                  agno: value
                })
              }} />
            </Item>
            <Item>
              <TouchableHighlight onPress={()=>{this.props.navigation.navigate('TchLogin')}}>
                <Text style={{ textAlignVertical: "center" }}>Login by Professor Id</Text>
              </TouchableHighlight>
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
    axios.post(`${config.requestPort}/loginRoute/stdLogin`, {
      body: {
        agno: this.state.agno
      }
    })
      .then(res => {
        console.log("res parsed  ", res.data[0]);
        this.props.navigation.navigate('TeacherInfo', { tchInfoList: res.data });
      }).catch(err => {
        console.log("errorr ", err)
      })
  }
}