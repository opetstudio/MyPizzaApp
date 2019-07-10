import React, { Component } from 'react'
import { Body, Container, Content, Header, Icon, Left, Form, Right, Item, Label, Input, Card, CardItem, Text } from 'native-base'
import CustomButton from '../../Components/CustomButton'

export default class LoginScreen2 extends Component{
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      password: ''
    }
  }
  _goToMainPage = () => {
    this.props.navigation.navigate('HomeScreen')
  }
  _goBack = () => {
    this.props.navigation.goBack()
  }
  render () {

    return (
      <Container>
        <Header transparent style={{marginLeft: 15}}>
          <Left>
            <Icon name='md-arrow-back' style={{color: 'grey'}} onPress={this._goBack}/>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input onChangeText={text => this.setState({name: text})} />
            </Item>
            <Item stackedLabel style={{marginBottom: 20}}>
              <Label>Password</Label>
              <Input onChangeText={text => this.setState({password: text})} />
            </Item>
          </Form>
          <CustomButton onPress={this._goToMainPage} title={'LOGIN'} />
        </Content>
      </Container>
    )
  }
}
