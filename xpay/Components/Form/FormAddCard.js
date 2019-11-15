import React, { Component } from 'react'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text,
    DatePicker,
    Spinner
  } from "native-base";
import _ from 'lodash'

export default class FormAddCard extends Component {
    componentWillMount () {
        this.props.formPatch({formAddcardSubmitMSG: {ir: false, rc: '', rs: '', rd: ''}})
    }
    componentDidUpdate (prevProps) {
        if(!this.props.formAddcardSubmitMSG.ir && this.props.formAddcardSubmitMSG.rc === '00'){
            this.props.onSuccessSubmit()
        }
    }
    render() {
        return (
            <Content>
            <Form>
              <Item fixedLabel>
                <Label>Card Number</Label>
                <Input style={{textAlign: 'right'}} placeholder='ex. 1234567789' placeholderTextColor='#d3d3d3' />
              </Item>
              <Item fixedLabel>
                <Label>Expiry Date</Label>
                <Input style={{textAlign: 'right'}} placeholder='ex. 2921' placeholderTextColor='#d3d3d3' />
              </Item>
              <Item fixedLabel>
                <Label>Security Code</Label>
                <Input style={{textAlign: 'right'}} placeholder='ex. 224' placeholderTextColor='#d3d3d3' />
              </Item>
            </Form>
            <Button disabled={this.props.formAddcardSubmitMSG.ir} block style={{ margin: 15, marginTop: 50 }} onPress={() => this.props.formAddcardSubmit({})} >
              <Text>Add Card</Text>
            </Button>
            {this.props.formAddcardSubmitMSG.ir && <Spinner color="green" />}
          </Content>
        )
    }
}
