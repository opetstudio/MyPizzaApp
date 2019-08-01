import React from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
    Text
} from 'react-native';

import styles from '../../../styles/NavBar.style';

class NavbarMiddleConversation extends React.Component {
    render() {
        if (this.props.contactDetail) {
            return (
              <View style={[styles.conversationMid]}>
                <Text style={styles.conversationTitle}>{ this.props.title }</Text>
              </View>
            );
          }
          return (
            <View style={[styles.conversationMid]}>
              {/* <TouchableOpacity onPress={() => this.props.addNewContact()} onLongPress= {() => Alert.alert('On Long Pressed')}> */}
              <TouchableOpacity onPress={() => null}>
                <Text style={styles.conversationTitle}>{ this.props.title }</Text>
              </TouchableOpacity>
            </View>
          );
    }
}

export default NavbarMiddleConversation;
