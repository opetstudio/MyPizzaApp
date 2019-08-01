import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
// import firebase from 'firebase';

import CreateProfileScreen from './CreateProfileScreen';
import OverviewScreen from './OverviewScreen';
import ButtonLogoutFBAccountKit from '../components/ButtonLogoutFBAccountKit';
import LaunchContainer from '../containers/LaunchContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     authToken: null,
    //     loggedAccount: null
    // };
    this._onLogedOut = this._onLogedOut.bind(this);
    this._onLogedIn = this._onLogedIn.bind(this);
  }
  componentWillMount() {
    this.setState({
      authToken: null,
      loggedAccount: null
    });
    // const { currentUser } = firebase.auth();
    // if (currentUser == null) {
    //   Actions.login({ type: 'reset', data: 'Custom data', title: 'Custom title' });
    // }
  }

  _onLogedIn(token, account) {
    // alert('logedinss');
    ////console.log('token=>', token);
    ////console.log('account=>', account);
    this.setState({
      authToken: token,
      loggedAccount: account,
    });
  }
  _onLogedOut() {
    // alert('logoutsss');
    this.setState({
      authToken: null,
      loggedAccount: null,
    });
  }
  _render_launch_screen() {
    return (
      <View {...this.props} style={styles.container}>
        <Text>Welcome</Text>
        {/* <Button
          title="Go to Login"
          onPress={() => Actions.login({ data: 'Custom data', title: 'Custom title' })}
        /> */}
        <Button title="Go to Login page" onPress={Actions.login} />
        <Button title="Go to Register page" onPress={Actions.register} />
        <Button title="Go to Overview page" onPress={Actions.overview} />
        <Button title="Display Error Modal" onPress={Actions.error} />
        <Button title="Display Lightbox" onPress={Actions.demo_lightbox} />
        <Button
          title="MessageBar alert"
          onPress={() => MessageBarManager.showAlert({
            title: 'Your alert title goes here',
            message: 'Your alert message goes here',
            alertType: 'success',
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
          })}
        />
        <Button title="Go to TabBar page" onPress={Actions.drawer} />
      </View>
    );
  }
  _render_overview_screen() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <OverviewScreen
          title="Overview"
          onLogedIn={(t, a) => this._onLogedIn(t, a)}
        />
      </View>
    );
  }
  _render_createprofile_screen() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <CreateProfileScreen title="Create Profile" />
        <ButtonLogoutFBAccountKit
          onLogedOut={() => this._onLogedOut()}
        />
      </View>
    );
  }
  render() {
    // if (this.state.loggedAccount === null) {
    //   return (
    //     <View>
    //       {this._render_launch_screen()}
    //     </View>
    //   );
    // }

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <LaunchContainer />
      </View>
    );
  }
}

export default LaunchScreen;
