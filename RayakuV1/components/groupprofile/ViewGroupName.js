import React from 'react';
import {
  View,
  Text
}
from 'react-native';

import styles from '../../styles/GroupNameModal.style';

class ViewGroupName extends React.Component {
    render() {
        return (
            <View><Text style={styles.nmText}>{this.props.groupName}</Text></View>
        );
    }
}

export default ViewGroupName;
