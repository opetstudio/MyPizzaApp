import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform
}
from 'react-native';

import ActionButton from 'react-native-action-button';
import Row from '../components/Row';
import FloatIcon from '../components/FloatIcon';

class NearbyContainer extends React.Component {
  componentWillMount() {
    ////console.log('OnProgress description componentWillMount');
  }
  render() {

    let _scrollView: ScrollView;
    let _scrollToBottomY;
    let rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push(
        <Row key={i} data={{ index: i }} />
      );
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',

        }}
      >
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onScroll={() => { console.log('onScroll!'); }}
        >
          <View
            style={{
              flex: 1,
              marginBottom: 15,
              marginTop: 15,
              marginLeft: 12,
              marginRight: 12
            }}
          >
            {/*}<Text color='#88888880'>People Nearby</Text>*/}
            <Text style={{ fontWeight: '100', textAlign: 'center', marginTop: 150 }}>
            Rayaku Team is working passionately to make sure you can use this feature
            as soon as possible :)
            </Text>
          {/*}{rows}*/}
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default NearbyContainer;
