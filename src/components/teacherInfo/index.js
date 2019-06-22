

import React, { Component } from 'react';
import { Platform, StyleSheet, View, } from 'react-native';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';



export default class TeacherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tchInfoList: []
    }

  }
  componentDidMount() {
    this.setState({
      tchInfoList: this.props.navigation.getParam('tchInfoList', [])
    })
    console.log(this.state.tchInfoList);
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          {this.state.tchInfoList.map((element,index) => {
            return (
              <Card key={index}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: 'Image URL' }} />
                    <Body>
                      <Text>{element.prof_name}</Text>
                      <Text note>At {element.place}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon FontAwesome name="calendar" />
                      <Text>{element.schedule}</Text>
                    </Button>
                  </Left>
                  
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    );
  }
}

