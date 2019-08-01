import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Scene,
  Router as Routerflux,
  Reducer,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox, Actions
} from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import TabIcon from './components/TabIcon';
import CustomNavBar from './components/CustomNavBar';
import TermModal from './components/modal/TermModal'; // routerflux component

// Screen
import SettingScreen from './screens/SettingScreen'; //routerflux component
import CallScreen from './screens/CallScreen'; //routerflux component
import ChatsScreen from './screens/ChatsScreen'; //routerflux component
import NearbyScreen from './screens/NearbyScreen'; //routerflux component
import GroupsScreen from './screens/GroupsScreen'; //routerflux component
import SignupOverviewScreen from './screens/SignupOverviewScreen'; //routerflux component
import CreateProfileScreen from './screens/CreateProfileScreen'; //routerflux component
import EditProfileScreen from './screens/EditProfileScreen';
import AboutScreen from './screens/AboutScreen';
import OverviewSlideShow from './components/OverviewSlideShow'; //routerflux component
import ConversationScreen from './screens/ConversationScreen'; //routerflux component
import NewChatScreen from './screens/NewChatScreen'; //routerflux component
import NewGroupScreen from './screens/NewGroupScreen'; //routerflux component
import GroupProfileScreen from './screens/GroupProfileScreen'; //routerflux component
import ProfileScreen from './screens/ProfileScreen'; //routerflux component
import ViewProfileScreen from './screens/ViewProfileScreen'; //routerflux component
import ContactSettingScreen from './screens/ContactSettingScreen'; //routerflux component
import RayaCoinsScreen from './screens/RayaCoinsScreen'; //routerflux component
import ViewGroupProfileScreen from './screens/ViewGroupProfileScreen'; //routerflux component
import AddGroupMemberScreen from './screens/AddGroupMemberScreen'; // routerflux component
import ReferalScreen from './screens/ReferalScreen'; //routerflux component


import ErrorModal from './components/modal/ErrorModal';
import InprogressModal from './components/modal/InprogressModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconStyle: {
    marginTop: 3,
    width: 60,
    backgroundColor: 'transparent'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#FD5B31',
    height: 2
  },
});

const getSceneStyle = () => ({
  backgroundColor: '#fff',
  shadowOpacity: 1,
  shadowRadius: 3,
});

class Router extends React.Component {
  constructor(props) {
    super(props);
    // //console.log('[Router.ios] constructor');
    this._renderMenuMessages = this._renderMenuMessages.bind(this);
    this._renderMenuSettings = this._renderMenuSettings.bind(this);
    this._renderMenuCalls = this._renderMenuCalls.bind(this);
  }
  componentWillMount() {
    // ////console.log('[Router.ios] componentWillMount ', this.props);

    this.setState({
      menu: 1,
      blur: '',
      focus: ''
    });
  }

  componentDidMount() {
    // //console.log('[Router.ios] componentDidMount');

    this.props.hideSplashScreen();
  }
  reducerCreate(params) {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      console.log('[Router.ios] ACTION:', action);
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_BLUR') this.state.blur = action.routeName;
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') this.state.focus = action.routeName;
      // console.log('[Router.ios] state:', this.state);
      // console.log('[Router.ios] routes:', state.routes[state.routes.length - 1].routeName);
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
        if (this.state.blur === 'conversations1' && this.state.focus === 'creategroupprofile1') {
          // Actions.messages_tab_chat_1();
          // action.routeName = 'messages_tab_chat_1';
          console.log('[Router.ios] doin pop:');
          return Actions.popTo('messages_tab_groups_1');
          // return null;
          // theAction = {
          //   ...action,
          //   routeName: 'messages_tab_chat_1'
          // };
        }
      }
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
        if (this.state.blur === 'conversations1' && this.state.focus === 'newchat1') {
          // console.log('[Router.android] doin pop:');
          return Actions.popTo('messages_tab_chat_1');
          // return Actions.popTo('conversations');
        }
      }
      return defaultReducer(state, action);
    };
  }

  _renderMenuMessages() {
    return (
        <Stack
          key="message_stack_tab"
          tabBarLabel="Messages"
          title="Messages"
          navBar={CustomNavBar}
          initial
          showLabel={false}
        >
            <Scene
              tabs
              key="message_tab"
              title="Message"
              tabBarPosition="top"
              icon={TabIcon}
              showIcon
              swipeEnabled
              indicatorStyle={styles.tabBarSelectedItemStyle}
              iconStyle={styles.tabIconStyle}
              style={{
                elevation: 40,
                height: 50,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 5
              }}
            >
                {/* <Stack
                  key="messages_tab_nearby"
                  tabBarLabel="Nearby"
                  title="Nearby"
                  icon={TabIcon}
                >
                    <Scene
                      session={this.props.session}
                      hideSplashScreen={this.props.hideSplashScreen}
                      key="messages_tab_nearby_1"
                      title="Tab #0_1"
                      component={NearbyScreen}
                      hideNavBar
                    />
                </Stack> */}
                <Stack
                  key="messages_tab_chat"
                  tabBarLabel="Chats"
                  title="Chats"
                  icon={TabIcon}
                  initial
                >
                      <Scene
                      session={this.props.session}
                      key="messages_tab_chat_1"
                      title="Tab #1_1"
                      component={ChatsScreen}
                      hideNavBar
                      initial
                      />
                </Stack>
                <Stack
                  key="messages_tab_groups"
                  tabBarLabel="Groups"
                  title="Groups"
                  icon={TabIcon}
                >
                    <Scene
                    session={this.props.session}
                    key="messages_tab_groups_1"
                    title="Tab #0_1"
                    component={GroupsScreen}
                    hideNavBar
                    />
                </Stack>
            </Scene>
        </Stack>
    );
  }
  _renderMenuCalls() {
    return (
      <Stack
        key="calls_stack_tab"
        tabBarLabel="Calls"
        title="Calls"
        showLabel={false}
        navBar={CustomNavBar}
      >
        <Scene
          tabs
          icon={TabIcon}
          key="calls_tab"
          tabBarPosition="top"
          showIcon
          swipeEnabled
          indicatorStyle={styles.tabBarSelectedItemStyle}
          iconStyle={styles.tabIconStyle}
          style={{
            elevation: 40,
            height: 50,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5
          }}
        >
            <Stack
              key="calls_tab_#1"
              tabBarLabel="Recent"
              title="Recent"
              icon={TabIcon}
            >
                <Scene
                key="calls_tab_#1_1"
                title="Calls_1"
                component={NearbyScreen}
                hideNavBar
                />
            </Stack>
            <Stack
              key="calls_tab_#2"
              tabBarLabel="Missed"
              title="Missed"
              icon={TabIcon}
            >
                  <Scene
                  key="calls_tab_#2_1"
                  title="Calls_2"
                  component={NearbyScreen}
                  hideNavBar
                  />
            </Stack>
        </Scene>
      </Stack>
    );
  }
  _renderMenuSettings() {
    return (
      <Stack
        key="settings_stack_tab"
        tabBarLabel="Settings"
        title="Settings"
        icon={TabIcon}
        showLabel={false}
        navBar={CustomNavBar}
      >
        <Scene
          //tabs
          hideTabBar={true}
          icon={TabIcon}
          component={SettingScreen}
          key="settings_tab"
          tabBarPosition="top"
          showIcon
          swipeEnabled
        />
      </Stack>
    );
  }
  _renderMenuSettingsxxx() {
    return (
      <Stack
        key="settings_stack_tabxxx"
        tabBarLabel="Settings"
        title="Settings"
        icon={TabIcon}
        showLabel={false}
        navBar={CustomNavBar}
      >
        <Scene
          key="settings_tabxx"
          title="Settings"
          component={SettingScreen}
        />
      </Stack>
    );
  }


  _renderConversation() {
    return (
      <Stack
        back
        backTitle="Back"
        key="conversations"
        navBar={CustomNavBar}

      >
        <Scene
          session={this.props.session}
          key="conversations1" component={ConversationScreen}
        />
      </Stack>
    );
  }
  _renderNewChat() {
    return (
      <Stack
        back
        backTitle="Back"
        title="New Chat"
        key="newchat"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session} key="newchat1" component={NewChatScreen} title="New Chat"
        />
      </Stack>
    );
  }
  _renderNewGroupScreen() {
    return (
      <Stack
        back
        backTitle="Back"
        title="Create Group"
        key="creategroup"
        navBar={CustomNavBar}
      >
        <Scene key="creategroup1" component={NewGroupScreen} title="Create Group"
        />
      </Stack>
    );
  }

  _renderGroupProfile() {
    return (
      <Stack
        title="Create Group"
        key="creategroupprofile"
        navBar={CustomNavBar}
      >
        <Scene key="creategroupprofile1" component={GroupProfileScreen} title="Create Group"
        />
      </Stack>
    );
  }

  _renderProfile() {
    return (
      <Stack
        back
        backTitle="Back"
        title="Profile"
        key="getprofile"
        hideNavBar
      >
        <Scene
          session={this.props.session}
          key="getprofile1" component={ProfileScreen} title="getprofile1"
        />
      </Stack>
    );
  }

  _renderCreateProfile() {
    return (
      <Stack
        title="Create Profile"
        key="createProfile"
        hideNavBar
        //initial
      >
        <Scene
          session={this.props.session}
          key="createProfile1" component={CreateProfileScreen} title="Create Profile"
        />
      </Stack>
    );
  }

  _renderEditProfile() {
    return (
      <Stack
        title="Edit Profile"
        key="editProfile"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="editProfile1" component={EditProfileScreen} title="Edit Profile"
        />
      </Stack>
    );
  }
  _renderRayaCoins() {
    return (
      <Stack
        title="Raya Coins"
        key="rayacoins"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="rayacoins1" component={RayaCoinsScreen} title="Raya Coins"
        />
      </Stack>
    );
  }

  _renderViewProfile() {
    return (
      <Stack
        back
        backTitle="Back"
        title="View Profile"
        key="viewProfile"
        hideNavBar
      >
        <Scene
          session={this.props.session}
          key="viewprofile1" component={ViewProfileScreen} title="View Profile"
        />
      </Stack>
    );
  }

  _renderViewGroupProfile() {
    return (
      <Stack
        back
        backTitle="Back"
        title="View Group"
        key="viewGroupProfile"
        hideNavBar
      >
        <Scene
          session={this.props.session}
          key="viewgroupprofile1" component={ViewGroupProfileScreen} title="View Group Profile"
        />
      </Stack>
    );
  }
  _renderNewGroupMember() {
    return (
      <Stack
        back
        title="Add Group Member"
        key="addGroupMember"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="addgroupmember1" component={AddGroupMemberScreen} title="Add Group Member"
        />
      </Stack>
    );
  }

  _renderNewGroupMember() {
    return (
      <Stack
        back
        title="Add Group Member"
        key="addGroupMember"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="addgroupmember1" component={AddGroupMemberScreen} title="Add Group Member"
        />
      </Stack>
    );
  }

  _renderSignUp() {
    return (
      <Stack
        title="Sign Up"
        key="signUp"
        hideNavBar
      >
        <Scene key="signUp1" component={SignupOverviewScreen} title="Sign Up" />
      </Stack>
    );
  }

  _renderReferal() {
    return (
      <Stack
        title="Referal"
        key="referal"
        hideNavBar
      >
        <Scene key="referal1" component={ReferalScreen} title="Referal" />
      </Stack>
    );
  }

  _renderTermModal() {
    return (
      <Stack
        title="Term Modal"
        key="termModal"
        hideNavBar
      >
        <Scene key="termModal1" component={TermModal} title="Term Modal" />
      </Stack>
    );
  }

  _renderAbout() {
    return (
      <Stack
        title="About"
        key="about"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="about1" component={AboutScreen} title="About"
        />
      </Stack>
    );
  }

  _renderModalError() {
    return <Scene key="error" component={ErrorModal} />;
  }
  _renderModalInprogress() {
    return <Scene key="inprogressModal" component={InprogressModal} />;
  }

  _renderRouterFlux() {
    return (
      <Routerflux
        createReducer={this.reducerCreate.bind(this)}
        getSceneStyle={getSceneStyle}
      >
        <Overlay key="overlay">
          <Modal
            key="modal"
            hideNavBar
            transitionConfig={() => ({
              screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
          >
            <Lightbox key="lightbox">
              <Stack
                hideNavBar
                key="root"
                titleStyle={{ alignSelf: 'center' }}
              >
                <Tabs
                  key="root_1"
                  title="Tab"
                  tabBarPosition="bottom"
                  swipeEnabled={false}
                  showLabel
                  activeTintColor="#E83014"
                  iconStyle={styles.tabIconStyle}
                  style={{
                    borderTopColor: 'transparent',
                    backgroundColor: '#FFF'
                  }}
                >
                    {/*}{this._renderMenuCalls()}*/}
                    {this._renderMenuMessages()}
                    {this._renderMenuSettings()}
                </Tabs>

                {this._renderConversation()}
                {this._renderSignUp()}
                {this._renderCreateProfile()}
                {this._renderNewChat()}
                {this._renderNewGroupScreen()}
                {this._renderGroupProfile()}
                {this._renderTermModal()}
                {this._renderProfile()}
                {this._renderEditProfile()}
                {this._renderViewProfile()}
                {this._renderViewGroupProfile()}
                {this._renderAbout()}
                {this._renderRayaCoins()}
                {this._renderNewGroupMember()}
                {this._renderReferal()}
              </Stack>
            </Lightbox>
            {this._renderModalError()}
            {this._renderModalInprogress()}
          </Modal>
        </Overlay>
      </Routerflux>
    );
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}
        >
          {this._renderRouterFlux()}
        </View>
      </View>
    );
  }
}

export default Router;
