import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import CheckBoxContainer from '../containers/CheckBoxContainer';
import DisplaySelectedGroupContainer from '../containers/DisplaySelectedGroupContainer';
import Row from '../components/Row';
import { CONTACT_TYPE_MOBILE } from '../constants';

class GroupContactsDetailContainer extends React.Component {
  constructor() {
    super();
    this._renderCheckBox = this._renderCheckBox.bind(this);
    this._displaySelectedItems = this._displaySelectedItems.bind(this);
  }

  _displaySelectedItems() {
    console.log('[GroupContactsContainer] _displaySelectedItems contact');
    return (
      <DisplaySelectedGroupContainer />
    );
  }

  _renderCheckBox(uid, phoneName) {
      const screens = this.props.selectedKey;
      if (!this.props.editMode) return null;
      return (
        <CheckBoxContainer
        uid={uid}
        screens={screens}
        name={phoneName}
        displaySelectedItems={this._displaySelectedItems}
        selectedKey={this.props.selectedKey}
        />
      );
  }

  render() {
    const v = this.props.item;
    const phoneName = v.name;
    const phone_number_display = v.phoneNumber;
    const contactType = CONTACT_TYPE_MOBILE;

    return (
      <View style={{ flexDirection: 'row' }}>
      {this._renderCheckBox(v.uid, phoneName)}
        <Row
          key={v.uid}
          data={{
            name: phoneName,
            phone_number: phone_number_display,
            time: contactType,
            badge: null,
            profile_picture: this.props.user_detail.profile_picture || ''
          }}
        />
    </View>);
  }
}

function mapStateToProps(state, ownProps) {
    return {
      user_detail: state.UsersReducer.byId[ownProps.item.phoneNumberNormalized] || {}
    };
  }

export default connect(mapStateToProps)(GroupContactsDetailContainer);
