import React from 'react';
import {
  View,
  Image,
  FlatList
}
from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatsDetailContainer from './ChatsDetailContainer';
import { SELECTED_CHATS_KEY } from '../constants';
import UserContentModal from '../components/modal/UserContentModal';

const img_nochat = require('../assets/images/empty-chat.png');

class ChatsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._setDataSource = this._setDataSource.bind(this);
    this._getPaginatedItems = this._getPaginatedItems.bind(this);
    this._next_offset = this._next_offset.bind(this);
    this._render_row = this._render_row.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    // this.state.isVisible = false;
  }
  componentWillMount() {
    this.state.total_chats = this.props.total_chats;
    this.state.friendChats = this.props.friendChats;
    // this.state.fetchAllInProcessForChats = this.props.fetchAllInProcessForChats;
    this.state.page = 1;
    this.state.per_page = 30;
    // set chatsAll
    this._setDataSource();
    this._getPaginatedItems();

    this.state.msgArray = [];
  }
  componentDidMount() {
    console.log('[ChatsContainer] componentDidMount ', this.props);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('[ChatsContainer] componentWillReceiveProps ');
    this.state.total_chats = nextProps.total_chats;
    this.state.friendChats = nextProps.friendChats;
    this._setDataSource();
    this._getPaginatedItems();

    console.log('[ChatsContainer] componentWillReceiveProps editMode', nextProps.editMode);
  }
  componentWillUnmount() {
    // console.log('[ChatsContainer] componentWillUnmount');
  }

  _getPaginatedItems() {
    // console.log('[ChatsContainer] _getPaginatedItems');
    const page = this.state.page || 1;
    const offset = (page - 1) * this.state.per_page;
    const paginatedItems =
    _.slice(this.state.chatsAll, 0, offset + this.state.per_page);
    this.setState({
      chatsAllPaginated: paginatedItems,
    });
  }

  _next_offset() {
    this.state.page += 1;
    if (this.state.chatsAll.length / this.state.per_page > this.state.page) {
      this._getPaginatedItems();
    }
  }

  _setDataSource() {
    try {
      const chatsAll = _.orderBy(
        _.map(this.state.friendChats, (v, k) => {
          if (!v || !k || k === 'undefined') return null;
          return { ...v, createdTimeOnDevice: v.createdTimeOnDevice || v.modifiedon };
        }),
        ['createdTimeOnDevice'], ['desc']
      );
      this.state.chatsAll = _.compact(chatsAll);
    } catch (e) {
      this.state.chatsAll = [];
    }
  }
  setModalVisible() {
    // this.setState({ isVisible: visible });
    console.log('setModalVisible');
    return (
    <UserContentModal isVisible={true} />
    );
  }

  _render_row({ item }) {
    return (
      <ChatsDetailContainer
        conversation_id={item.id || item.uid}
        item={item}
        selectedKey={SELECTED_CHATS_KEY}
        />
    );
  }
  _keyExtractor(item) {
    return item.uid;
  }
  render() {
    console.log('[ChatsContainer] render: ', this.state);
    if (this.state.chatsAll.length) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            marginTop: 10
          }}
        >
          <FlatList
            data={this.state.chatsAllPaginated}
            renderItem={this._render_row}
            keyExtractor={(item) => item.uid }
          />
        </View>
      );
    }
    console.log('render modal');
      return (
        
        // <View>
        //   {this.setModalVisible()}
        <View
          style={{
            flex: 1,
            backgroundColor: '#F7F7F7',
          }}
        >
            <Image
              source={img_nochat}
              style={{
                marginTop: 40,
                marginLeft: 30,
                resizeMode: 'contain',
                width: 250,
                height: 50
              }}
            />
        </View>
        // </View>
      );
  }
}

function mapStateToProps(state) {
  // //console.log('[ChatsContainer] mapStateToProps ');
  return {
    friendChats: state.ConversationReducer.friendChats,
    total_chats: state.ConversationReducer.allIds.length,
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
)(ChatsContainer);
