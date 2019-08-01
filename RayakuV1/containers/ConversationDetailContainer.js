import React from 'react';
import { connect } from 'react-redux';
import MessageBubble from '../components/MessageBubble';

class ConversationDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // //console.log('[ConversationDetailContainer] componentWillMount',this.props);
  }
  render() {
    const v = this.props.item;
    console.log('[ConversationDetailContainer] render', v);
    const sender = v.sender || v.sender_phone_number;
    const position = sender !== this.props.sessionPhoneNumber ? 'left' : 'right';
    return (

      <MessageBubble
        key={this.props.message_id}
        position={position}
        messages={v.message}
        createdon={this.props.time}
        timedevice={this.props.timedevice}
        status={this.props.status}
        showdate={v.showdate}
        sender={this.props.sender}
        name={this.props.name}
        isGroup={this.props.isGroup}
      />


    );
  }
}

function mapStateToProps(state, ownProps) {
  // //console.log('[ConversationInputTextContainer] mapStateToProps');
  const message_id = ownProps.item.uid || ownProps.item.id;
  const phonenumber = (state.ConversationReducer.byId[message_id] || {}).sender || '';
  const name = (state.ContactsReducer.byId[phonenumber] || {}).name || `~${(state.UsersReducer.byId[phonenumber] || {}).display_name || phonenumber}`;
  return {
    phonenumber,
    message_id,
    status: state.ConversationReducer.byId[message_id].status,
    name,
    time:
    state.ConversationReducer
    .byId[message_id].localTimeStatusPending, // tampilkan tanggal msg dicreate
    timedevice:
    state.ConversationReducer
    .byId[message_id].createdTimeOnDevice, // group by tanggal
    sessionPhoneNumber: state.SessionReducer.sessionPhoneNumber
  };
}

export default connect(mapStateToProps)(ConversationDetailContainer);
