// import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

// import { routerReducer as router } from 'react-router-redux';
import RestapiReducer from './RestapiReducer';
import AppReducer from './AppReducer';
import SessionReducer from './SessionReducer';
import NavigationReducer from './NavigationReducer';
import ChatsReducer from './ChatsReducer';
import ConversationReducer from './ConversationReducer';
import NotificationReducer from './NotificationReducer';
import ContactsReducer from './ContactsReducer';
import UsersReducer from './UsersReducer';
import UserprofileReducer from './UserprofileReducer';
import FilesReducer from './FilesReducer';
import CoinsReducer from './CoinsReducer';

import GroupReducer from './GroupReducer';
import MessageReducer from './MessageReducer';
import FlagCheckBoxReducer from './FlagCheckBoxReducer';
import GroupMemberReducer from './GroupMemberReducer';
import GroupprofileReducer from './GroupprofileReducer';

const config = {
  key: 'primary',
  storage
};

const reducers = {
  SessionReducer,
  AppReducer,
  RestapiReducer,
  NavigationReducer,
  ChatsReducer,
  ConversationReducer,
  ContactsReducer,
  UsersReducer,
  UserprofileReducer,
  FilesReducer,
  GroupReducer,
  NotificationReducer,
  MessageReducer,
  FlagCheckBoxReducer,
  GroupMemberReducer,
  GroupprofileReducer,
  CoinsReducer
};
const rootReducer = persistCombineReducers(config, reducers);
export default rootReducer;
