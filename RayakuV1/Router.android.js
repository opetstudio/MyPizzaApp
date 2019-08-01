import React from 'react';
import {
  View,
  StyleSheet, Image, BackHandler, ToastAndroid, Platform
} from 'react-native';
import {
  Scene,
  Router as Routerflux,
  Reducer,
  Overlay,
  Tabs,
  Modal, Drawer,
  Stack,
  Lightbox, Actions
} from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import TabIcon from './components/TabIcon';
import CustomNavBar from './components/CustomNavBar'; // routerflux component
import TermModal from './components/modal/TermModal'; // routerflux component

//  Screen
import SettingScreen from './screens/SettingScreen'; // routerflux component
import CallScreen from './screens/CallScreen'; // routerflux component
import ChatsScreen from './screens/ChatsScreen'; // routerflux component
import NearbyScreen from './screens/NearbyScreen'; // routerflux component
import GroupsScreen from './screens/GroupsScreen'; // routerflux component
import SignupOverviewScreen from './screens/SignupOverviewScreen'; // routerflux component
import CreateProfileScreen from './screens/CreateProfileScreen'; // routerflux component
import EditProfileScreen from './screens/EditProfileScreen';
import AboutScreen from './screens/AboutScreen';
import OverviewSlideShow from './components/OverviewSlideShow'; // routerflux component
import ConversationScreen from './screens/ConversationScreen'; // routerflux component
import NewChatScreen from './screens/NewChatScreen'; // routerflux component
import NewGroupScreen from './screens/NewGroupScreen'; // routerflux component
import GroupProfileScreen from './screens/GroupProfileScreen'; // routerflux component
import ProfileScreen from './screens/ProfileScreen'; // routerflux component
import ViewProfileScreen from './screens/ViewProfileScreen'; // routerflux component
import ViewGroupProfileScreen from './screens/ViewGroupProfileScreen'; // routerflux component
import ContactSettingScreen from './screens/ContactSettingScreen'; // routerflux component
import RayaCoinsScreen from './screens/RayaCoinsScreen'; // routerflux component
import AddGroupMemberScreen from './screens/AddGroupMemberScreen'; // routerflux component
import ReferalScreen from './screens/ReferalScreen'; //routerflux component

// containers
import DrawerContentContainer from './containers/DrawerContentContainer'; // routerflux component
import ErrorModal from './components/modal/ErrorModal';
import InprogressModal from './components/modal/InprogressModal';
import UserContentModal from './components/modal/UserContentModal';

const icon_nearby = require('./assets/images/nearby-icon-active.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconStyle: {
    marginTop: 3,
    width: 80,
    backgroundColor: 'transparent'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#FFF',
    height: 4
  },
});

const getSceneStyle = () => ({
  backgroundColor: '#FFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._renderMenuMessages = this._renderMenuMessages.bind(this);
    this._renderMenuSettings = this._renderMenuSettings.bind(this);
    this.reducerCreate = this.reducerCreate.bind(this);
    this._onBackPress = this._onBackPress.bind(this);
  }

  componentWillMount() {
    this.state.backButtonPressedOnceToExit = false;
    this.state.initialRouteName = 'messages_tab_chat_1';
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    //   BackHandler.addEventListener('hardwareBackPress', () => {
    //     try {
    //         Actions.pop();
    //         return true;
    //     } catch (err) {
    //         console.debug('Cant pop. Exiting the app...');
    //         return false;
    //     }
    // });
    this.setState({
      menu: 1,
      blur: '',
      focus: ''
    });
  }

  componentWillUnmount() {
    // console.log('Unmounting app, removing listeners');
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
    // BackHandler.removeEventListener('hardwareBackPress');
  }

  _onBackPress() {
    // const { dispatch, nav } = this.props;
    // console.log('[Router.android] onBackPress');
    if (Actions.currentScene === this.state.initialRouteName) {
      // console.log('[Router.android] onBackPress EXIT APPPPPPP');
      return false;
     } else if (Actions.currentScene === 'DrawerOpen') {
      Actions.drawerClose();
      return true;
    }
    // if (Actions.state.index === 0) {
    //   console.log('[Router.android] onBackPress Actions.state.index === 0');
    //   return false;
    // }
     
    console.log('[Router.android] onBackPress Actions.state.index !== 0, ');
    // const blur = this.state.blur;
    // Actions[this.state.blur].pop();
    Actions.pop(this.state.blur);
    return true;
  }

  reducerCreate(params) {
    //  // console.log('[Router.android] params=', params);
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      // console.log('[Router.android] reducerCreate Actions.state.index =', Actions.state.index);
      // console.log('[Router.android] reducerCreate ACTION:', action);

      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_BLUR') this.state.blur = action.routeName;
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') this.state.focus = action.routeName;

      // console.log('[Router.android] reducerCreate this.state.blur:', this.state.blur);
      // console.log('[Router.android] reducerCreate this.state.focus:', this.state.focus);

      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
        if (this.state.blur === 'conversations1' && this.state.focus === 'creategroupprofile1') {
          // console.log('[Router.android] doin pop:');
          return Actions.popTo('messages_tab_groups_1');
        }
      }
      if (action.type === 'Navigation/BACK') {
        if (this.state.blur === 'conversations1' && (this.state.focus === 'viewprofile1' || this.state.focus === 'viewgroupprofile1')) {
          // console.log('[Router.android] doin pop:');
          return Actions.conversations();
          // return Actions.popTo('conversations');
        }
      }
      return defaultReducer(state, action);
    };
  }

  _renderMenuMessages() {
    return (
      <Scene
        title="Message"
        key="messages"
        navBar={CustomNavBar}
        initial
      >
        <Tabs
          key="messages_tab"
          tabBarPosition='top'
          swipeEnabled
          indicatorStyle={styles.tabBarSelectedItemStyle}
          showIcon
          iconStyle={styles.tabIconStyle}
          showLabel={false}
          style={{
            elevation: 0,
            height: 50,
            backgroundColor: '#FD5B31'
          }}
          labelStyle={{
            color: '#FFFF', alignSelf: 'center'
          }}
        >
          <Stack
            key="messages_tab_nearby"
            title="Nearby"
            tabBarIcon={() => (
              <Image
              source={icon_nearby}
              style={{ height: 25, width: 25 }}
              resizeMode='contain'
              />
            )}
            hideNavBar
            style={{
              marginBottom: 50,
            }}
          >
              <Scene
                session={this.props.session}
                hideSplashScreen={this.props.hideSplashScreen}
                key="messages_tab_nearby_1"
                component={NearbyScreen}
                title="Tab #0_1"
                titleStyle={{ color: '#FD5B31', alignSelf: 'center' }}
              />
          </Stack>

          <Stack
            key="messages_tab_chat"
            title="Chats"
            tabBarLabel="Chats"
            icon={TabIcon}
            hideNavBar
            initial
          >
            <Scene
              session={this.props.session}
              key="messages_tab_chat_1"
              component={ChatsScreen}
              title="Tab #2_1"
            />
          </Stack>

          <Stack
            key="messages_tab_groups"
            title="Groups"
            tabBarLabel="Groups"
            icon={TabIcon}
            showIcon={false}
            hideNavBar
          >
            <Scene
              session={this.props.session}
              key="messages_tab_groups_1"
              component={GroupsScreen}
              title="Tab #3"
            />
          </Stack>
        </Tabs>
      </Scene>
    );
  }

  _renderMenuCalls() {
    return (
      <Stack
        back
        backTitle="Back"
        key="calls"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="calls1" component={CallScreen} title="Call"
        />
      </Stack>
    );
  }

  _renderMenuSettings() {
    return (
      <Stack
        back
        backTitle="Back"
        title="Settings"
        key="settings"
        navBar={CustomNavBar}

      >
        <Scene
          session={this.props.session}
          key="settings1" component={SettingScreen} title="Setting"
        />
      </Stack>
    );
  }

  _renderConversation() {
    return (
      <Stack
        back
        backTitle="Back"
        title="Conversations"
        key="conversations"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="conversations1" component={ConversationScreen} title="conversations1"
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
          session={this.props.session}
          key="newchat1" component={NewChatScreen} title="New Chat"
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
        back
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
        title="View Group Info"
        key="viewGroupProfile"
        navBar={CustomNavBar}
      >
        <Scene
          hideNavBar
          session={this.props.session}
          key="viewgroupprofile1" component={ViewGroupProfileScreen} title="View Group Info"
        />
          <Scene
            session={this.props.session}
            
            key="addGroupMember" component={AddGroupMemberScreen} title="Add Group Member"
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
        <Scene
          session={this.props.session}
          key="signUp1" component={SignupOverviewScreen} title="Sign Up"
        />
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

  _renderOverview() {
    return (
      <Stack
        title="Overview"
        key="overviewScreen"
        hideNavBar
      >
        <Scene
          session={this.props.session}
          key="overviewScreen1" component={OverviewSlideShow} title="Overview"
        />
      </Stack>
    );
  }

  _renderContactSetting() {
    return (
      <Stack
        title="Contact Settings"
        key="contactSettings"
        navBar={CustomNavBar}
      >
        <Scene
          session={this.props.session}
          key="contactSettings1" component={ContactSettingScreen} title="Contact Settings"
        />
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

  _renderUserModal() {
    return (
      <Stack
        title="User Modal"
        key="userModal"
        hideNavBar
      >
        <Scene key="userModal1" component={UserContentModal} title="User Modal" />
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
        createReducer={this.reducerCreate}
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
              <Drawer
                key="drawer"
                contentComponent={DrawerContentContainer}
                drawerWidth={300}
                // initial
              >
                {this._renderMenuCalls()}
                {this._renderMenuMessages()}
                {this._renderMenuSettings()}
                {this._renderSignUp()}
                {this._renderCreateProfile()}
                {this._renderOverview()}
                {this._renderConversation()}
                {this._renderNewChat()}
                {this._renderNewGroupScreen()}
                {this._renderGroupProfile()}
                {this._renderTermModal()}
                {this._renderProfile()}
                {this._renderEditProfile()}
                {this._renderViewProfile()}
                {this._renderViewGroupProfile()}
                {this._renderContactSetting()}
                {this._renderAbout()}
                {this._renderRayaCoins()}
                {this._renderReferal()}
               </Drawer>
              </Stack>
            </Lightbox>
            {this._renderModalError()}
            {this._renderModalInprogress()}
            {this._renderUserModal()}
          </Modal>
        </Overlay>
      </Routerflux>
    );
  }

  render() {
    // // console.log('[Router.android] render function');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}
      >
        { this._renderRouterFlux() }
      </View>
    );
  }
}

export default Router;
