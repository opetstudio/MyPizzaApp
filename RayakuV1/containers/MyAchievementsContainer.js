import React, { Component } from 'react';
import { 
  AppRegistry, 
  SectionList, 
  StyleSheet, 
  Text, 
  View,
  FlatList, 
} from 'react-native';

import { connect } from 'react-redux';
import Achievements from '../components/Achievements';

class MyAchievementsContainer extends Component {
  
  _render_row({ item }) {
    console.log('[MyAchievementsContainer] _render_row=>', item);
    return (<Achievements id={item} />);
  }

  render() {
    return (
      <View>
        <FlatList
          renderItem={this._render_row}
          // ListHeaderComponent={this._render_head}
          data={this.props.allIds}
          keyExtractor={(item) => item}
        />
      </View>
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

export default connect(mapStateToProps)(MyAchievementsContainer);