import React, { Component } from "react";
import { connect } from 'react-redux'
import {Content, Form, Item, Label, Input, Button, Text, Spinner} from 'native-base'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'
import AddcardAction, {AddcardSelectors} from './redux'
import {Colors} from '../../Themes'

class FormAddCard extends Component {
  componentWillMount () {
      this.props.addcardPatch({addcardFormSubmitMSG: {ir: false, rc: '', rs: '', rd: ''}})
  }
  componentDidUpdate (prevProps) {
      if(!this.props.addcardFormSubmitMSG.ir && this.props.addcardFormSubmitMSG.rc === '00'){
          this.props.onSuccessSubmit()
      }
  }
  render() {
      return (
          <Content padder>
          <Form>
            <Text style={{alignSelf: 'center', marginBottom: 10}}>Card Number</Text>
            <Item fixedLabel regular>
              {/* <Label>Card Number</Label> */}
              <Input style={{textAlign: 'center'}} placeholder='ex. 1234567789' placeholderTextColor='#d3d3d3' />
            </Item>
            {/* <Item fixedLabel>
              <Label>Expiry Date</Label>
              <Input style={{textAlign: 'right'}} placeholder='ex. 2921' placeholderTextColor='#d3d3d3' />
            </Item>
            <Item fixedLabel>
              <Label>Security Code</Label>
              <Input style={{textAlign: 'right'}} placeholder='ex. 224' placeholderTextColor='#d3d3d3' />
            </Item> */}
          </Form>
          <Button primary disabled={this.props.addcardFormSubmitMSG.ir} block style={{ margin: 15 }} onPress={() => this.props.addcardFormSubmit({})} >
            <Text>Add Card</Text>
          </Button>
          {this.props.addcardFormSubmitMSG.ir && <Spinner color="green" />}
        </Content>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  // const foo = params.get('foo'); // bar
  return {
    addcardFormSubmitMSG: AddcardSelectors.addcardFormSubmitMSG(state.addcard)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addcardFormSubmit: data => dispatch(AddcardAction.addcardFormSubmit(data)),
    addcardPatch: (data) => dispatch(AddcardAction.addcardPatch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormAddCard)
