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

export default class FormValidateOtp extends Component {
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
                  {/* <Label>OTP</Label> */}
                  <Input style={{textAlign: 'center'}} placeholder='ex. 123456' placeholderTextColor='#d3d3d3' />
                </Item>
              </Form>
              <Button block style={{ margin: 15}} onPress={() => {}} >
                <Text>Submit OTP</Text>
              </Button> 
            {this.props.formAddcardSubmitMSG.ir && <Spinner color="green" />}
          </Content>
        )
    }
}
