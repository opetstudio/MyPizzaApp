import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import { TabViewAnimated, SceneMap, TabBar } from 'react-native-tab-view';

import OverviewSlideShow from '../components/OverviewSlideShow';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import { updateSession } from '../actions/SessionAction';
import TabBarMenu from '../components/TabBarMenu';
import ChatsContainer from '../containers/ChatsContainer';
import GroupsContainer from '../containers/GroupsContainer';
import NearbyContainer from '../containers/NearbyContainer';
import SimplePage from '../screens/SimplePage';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});

// const _renderHeader = props => <TabBarMenu {...props} />;


class LaunchContainer extends React.Component {
  constructor(props) {
    super(props);
    ////console.log('[LaunchContainer] constructor');
    this._onLogedIn = this._onLogedIn.bind(this);
    this._render_switcher = this._render_switcher.bind(this);
    this._handleIndexChange = this._handleIndexChange.bind(this);
    // this._renderScene = this._renderScene.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }
  componentWillMount() {
    ////console.log('[LaunchContainer] componentWillMount => ');
    this.setState({
      authToken: this.props.SessionReducer.authToken,
      loggedAccount: this.props.SessionReducer.loggedAccount,
      fullname: this.props.SessionReducer.fullname,
      index: 0,
      routes: [
        { key: '1', icon: 'Nearby' },
        { key: '2', title: 'Chats' },
        { key: '3', title: 'Groups' }
      ],
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      authToken: nextProps.SessionReducer.authToken,
      loggedAccount: nextProps.SessionReducer.loggedAccount,
      fullname: nextProps.SessionReducer.fullname,
    });
  }
  _onLogedIn(token, account) {
    ////console.log('[LaunchContainer] token => ', token);
    ////console.log('[LaunchContainer] account => ', account);
    this.props.updateSession({ token, account });
  }
  _renderHeader(props) {
    return (
      // <TabBar {...props} />
      <TabBarMenu routes={this.state.routes} {...props} />
    );
    // return (
    //   <TabBar
    //     {...props}
    //     scrollEnabled
    //     indicatorStyle={styles.indicator}
    //     style={styles.tabbar}
    //     tabStyle={styles.tab}
    //     labelStyle={styles.label}
    //   />
    // );
  }
  // _renderScene(route) {
  //   // return SceneMap({
  //   //     1: ChatsContainer,
  //   //     2: ContactsContainer
  //   // });
  //   switch (route.key) {
  //     case '1':
  //       return (
  //         <ChatsContainer />
  //       );
  //     case '2':
  //       return (
  //         <ContactsContainer />
  //       );
  //     default:
  //       return null;
  //   }
  // }
  _handleIndexChange(index) {
    this.setState({ index });
  }
  _render_overview() {
    return (
      <OverviewSlideShow
        onLogedIn={(t, a) => this._onLogedIn(t, a)}
      />
    );
  }
  _render_createprofile() {
    return (
      <CreateProfileScreen title="Create Profile" />
    );
  }
  _render_home_screen() {
    const _renderScene = SceneMap({
        1: NearbyContainer,
        2: ChatsContainer,
        3: GroupsContainer,
      });
    return (
      // <View>
      // <TabViewAnimated
      //     style={styles.container}
      //     navigationState={this.state}
      //     renderScene={_renderScene}
      //     renderHeader={_renderHeader}
      //     onIndexChange={this._handleIndexChange.bind(this)}
      // />

      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={_renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
  _render_switcher() {
     if (this.state.loggedAccount === null) {
       return this._render_overview();
     } else if (this.state.fullname === '') {
         return this._render_createprofile();
     }
    //return this._render_home_screen();
    // Actions.hometabbar({ type: ActionConst.REPLACE });
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {
          this._render_switcher()
          //this._render_createprofile()
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  // const students = _.map(state.GurustaffReducer.listData, (val, uid) => {
  //   ////console.log('[LaunchContainer] ');
  //   return { ...val, uid };
  // });
  return {
    RestapiReducer: state.RestapiReducer,
    SessionReducer: state.SessionReducer,
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateSession
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchContainer);
