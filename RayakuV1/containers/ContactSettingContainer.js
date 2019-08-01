import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  Switch,
  ScrollView,
  Alert
}
from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../styles/SettingsContainer.style';
import {colors} from '../styles/color.style';

const icon_forward = require('../assets/images/forward.png');

class ContactSettingContainer extends React.Component {
  constructor(props) {
    super(props);
    this._onPressEditProfile = this._onPressEditProfile.bind(this);
  }

  componentWillMount() {
    this.setState({
      trueSwitchMuteIsOn: true,
      falseSwitchMuteIsOn: false,
      trueSwitchBlockIsOn: true,
      falseSwitchBlockIsOn: false
    });
  }

  _onPressEditProfile() {
      Actions.editProfile();
  }

  _onPressClearChat() {
      Alert.alert('Clear Chat pressed!');
  }

  _onPressAlert() {
      Alert.alert('Testing');
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              PERSONALIZED
            </Text>
          </View>
          <TouchableHighlight onPress={this._onPressAlert}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Custom Tone</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Beep</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressAlert}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Starred Messages</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>></Text>
                </View>
            </View>
          </TouchableHighlight>

          <View style={styles.subListTwo} />
          <View style={styles.subListTwo} />
          <TouchableHighlight onPress={this._onPressAlert}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Light Setting</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Default</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressAlert}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Vibrate</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Short</Text>
                </View>
            </View>
          </TouchableHighlight>

          <View style={styles.header}>
            <Text style={styles.headerText}>
              ACCOUNT SETTING
            </Text>
          </View>
          <TouchableHighlight onPress={this._onPressAlert}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Secure Chat Key Pair</Text>
                </View>
                <View style={styles.subViewRight}>
                  {/* <Text style={{ color: colors.mediumGray }}> > </Text> */}
                  <Image
                    style={styles.imgForward}
                    resizeMode="contain"
                    source={icon_forward}
                  />
                </View>
            </View>
          </TouchableHighlight>
          <View style={[styles.subListTwo, { paddingVertical: 6 }]}>
              <View style={styles.subViewLeft}>
                <Text>Mute</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Switch
                  onValueChange={(value) => this.setState({ falseSwitchMuteIsOn: value })}
                  style={{ }}
                  value={this.state.falseSwitchMuteIsOn}
                />
              </View>
          </View>
          <View style={[styles.subListTwo, { paddingVertical: 6 }]}>
              <View style={styles.subViewLeft}>
                <Text>Block Incoming Messages</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Switch
                  onValueChange={(value) => this.setState({ falseSwitchBlockIsOn: value })}
                  style={{ }}
                  value={this.state.falseSwitchBlockIsOn}
                />
              </View>
          </View>
          <TouchableHighlight onPress={this._onPressClearChat}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text style={{ color: 'red' }}>Clear All Chats</Text>
                </View>
            </View>
          </TouchableHighlight>

          <View style={styles.header}>
            <Text style={styles.headerText}>
              This will clear chats between you and this user.
              Please be careful before you proceed.
            </Text>
          </View>


      </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  ////console.log('[ContactSettingContainer] mapStateToProps ');
  return {
    //SessionReducer: state.SessionReducer,
    //display_name: state.SessionReducer.display_name,
    // latestCreatedTimeOnDevice: state.ConversationReducer.latestCreatedTimeOnDevice
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // fetchAll,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactSettingContainer);
