import React from 'react';
import {
  Image
}
from 'react-native';

import CheckBox from 'react-native-check-box';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectGroupMembers } from '../actions/GroupMemberAction';
import { pushOrPopSelectedItem } from '../actions/FlagCheckBoxAction';

const icon_check = require('../assets/images/selections.png');
const icon_uncheck = require('../assets/images/selection-empty.png');

const msgIds = [];
const phoneName = [];
const contactIds = [];

class CheckBoxContainer extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.state.members = {};
    this.state.listAllMembers = [];
    this._onClickSelectBox = this._onClickSelectBox.bind(this);
  }
  componentWillMount() {
    // console.log('[CheckBoxContainer] componentWillMount', this.props);
    this.setState({
      screens: this.props.screens,
      isChecked: this.props.isChecked
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      screens: nextProps.screens,
      isChecked: nextProps.isChecked
    });
  }

 _onClick(rowId) {
      // console.log('[CheckBoxContainer] row id:', rowId);
      msgIds.push(rowId);
      // console.log('[CheckBoxContainer] all msg id:',msgIds);
  }
  _onClickSelectBox(rowId) {
    this.props.pushOrPopSelectedItem({ screens: this.state.screens, id: rowId });
  }

  _onClickGroup(rowId, name) {
      //  console.log('[CheckBoxContainer] _onClickGroup row id:', rowId);
      //  console.log('[CheckBoxContainer] _onClickGroup name:', name);
       // const passIndex = findRowIndex(rowId);
       // console.log('[CheckBoxContainer] passIndex:', passIndex);
       // contactIds.push(rowId);
       // console.log('[CheckBoxContainer] all msg id:',contactIds);
       // phoneName.push(name);
       // console.log('[CheckBoxContainer] all name:',phoneName);

       // this.state.members.contactIds = contactIds;
       // this.state.members.name = phoneName;
       this.state.members = {
          contactIds: rowId,
          phoneName: name
       };
      //  console.log('this.state.members = ', this.state.members);

       this.props.selectGroupMembers(this.state.members);
   }

  render() {
    // console.log('[CheckBoxContainer] isChecked: ', this.state.isChecked);
    // console.log('[CheckBoxContainer] currScene: ', Actions.currentScene);
    const isChecked = this.state.isChecked;
    if (this.props.screens === this.props.selectedKey) {
      return (
        <CheckBox
          style={{ paddingVertical: 27, paddingLeft: 8 }}
          onClick={() => this._onClickSelectBox(this.props.uid)}
          checkedImage={<Image source={icon_check} style={{
            overflow: 'hidden', width: 25, height: 25, paddingBottom: 0
          }}/>}
          unCheckedImage={<Image source={icon_uncheck} style={{
            overflow: 'hidden', marginTop: 3.7, marginLeft: 2.8, marginRight: 4.5, width: 17.585, height: 17.585
          }}/>}
          isChecked={isChecked}
        />
      );
    }
    // if (this.props.editMode) {
    //   return (
    //     <CheckBox
    //       style={{ paddingVertical: 27, paddingLeft: 8 }}
    //       onClick={() => this._onClick(this.props.phone_number)}
    //       checkedImage={<Image source={icon_check} style={{
    //         overflow: 'hidden', width: 25, height: 25, paddingBottom: 0
    //       }}/>}
    //       unCheckedImage={<Image source={icon_uncheck} style={{
    //         overflow: 'hidden', marginTop: 3.7, marginLeft: 2.8, marginRight: 4.5, width: 17.585, height: 17.585
    //       }}/>}
    //     />
    //   );
    // }
    return null;
  }
}
function mapStateToProps(state, ownProps) {
  const listChecked = state.FlagCheckBoxReducer.listChecked[ownProps.screens] || [];
  const isChecked = listChecked.indexOf(ownProps.uid || ownProps.id) !== -1;
  return {
    isChecked
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectGroupMembers,
      pushOrPopSelectedItem
    },
    dispatch
  );
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(CheckBoxContainer);
