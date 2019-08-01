import React from 'react';
import {
  View
}
from 'react-native';

import NearbyContainer from '../containers/NearbyContainer';

class NearbyScreen extends React.Component {
  componentWillMount() {
    ////console.log('NearbyScreen component componentWillMount ', this.props);
  }
  componentDidMount() {
    ////console.log('NearbyScreen component componentDidMount');
  }
  componentWillUnmount() {
    ////console.log('NearbyScreen component componentWillUnmount');
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <NearbyContainer
          {...this.props}
        />
      </View>
    );
  }
}

export default NearbyScreen;
