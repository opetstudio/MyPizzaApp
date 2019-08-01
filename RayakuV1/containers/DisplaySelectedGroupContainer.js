import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TextInput
}
from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../components/Row';
import FloatIcon from '../components/FloatIcon';
import GroupContactsContainer from './GroupContactsContainer';

import styles from '../styles/SelectedGroupMember.style';
import { colors } from '../styles/color.style';
const index = 0;

class DisplaySelectedGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this._displaySelectedItems = this._displaySelectedItems.bind(this);
  }
  componentDidMount() {
    console.log('DisplaySelectedGroupContainer component componentDidMount,',this.props);

  }
  componentWillReceiveProps(nextProps) {
    console.log('DisplaySelectedGroupContainer component componentWillReceiveProps,',nextProps);

  }
  _displaySelectedItems() {
    console.log('_displaySelectedItems',this.props.listSelectedGroupMembers);
    const selectedMembers = this.props.listSelectedGroupMembers;
    const totalMember = this.props.totalSelected;
    let index = (totalMember - 1 < 1) ? 0 : totalMember - 1;
    const result = selectedMembers.map(a => a.phoneName);
    console.log('selectedMembers:', result);

    if (totalMember === 0) return null;
      // for(const i = 0; i<totalMember; i++){
        // const item = this.props.listSelectedGroupMembers[index].phoneName;
        // const keys = this.props.listSelectedGroupMembers[index].contactIds;
        return (
              <View
                style={styles.selectedItem}
              >

              { result.map((item, key)=>(
                // console.log('item:', item);
                <View
                style={{
                  //width: (item.length * 8) + 60,
                  borderRadius: 15,
                  backgroundColor: colors.lighterGray,
                  overflow: Platform.OS === 'ios' ? 'hidden' : null,
                  paddingVertical: 5,
                  paddingHorizontal: 10
                  }}
                key={key}>
                  <Text> {item[key]} </Text>
                  </View>)
                )}
              </View>
        );
    
 }

  render() {
    console.log('render displaySelectedItems');
    return (
      <View>
        {this._displaySelectedItems()}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('DisplaySelectedGroupContainer mapStateToProps', state);
  const listSelectedGroupMembers = state.GroupMemberReducer.listSelectedGroupMembers || [];
  return {
    listSelectedGroupMembers,
    totalSelected: listSelectedGroupMembers.length
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySelectedGroupContainer);
