import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import RayaCoinsTitle from '../components/RayaCoinsTitle';

class RayaCoinsContainer extends Component {
  render() {
    return (
      <RayaCoinsTitle totalcoins = {this.props.totalcoins}/>

    );
  }
}

function mapStateToProps(state, ownProps) {

  const byId = state.CoinsReducer.byId || {};
  const allIds = state.CoinsReducer.allIds || []; 

  let totalcoins = 0;

  allIds.forEach((id)=>{
    const row = byId[id];
    totalcoins += row.coin;
  });

  return {
    totalcoins
  };
}

export default connect(mapStateToProps)(RayaCoinsContainer);