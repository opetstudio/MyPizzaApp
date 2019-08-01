import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAll as fetchAllConversation, fetchAllMessageGroup } from '../actions/ConversationAction';
import { user_group as fetchUserGroup } from '../actions/GraphqlAction';

class FirstloadDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.state.deviceId = this.props.deviceId;
    this.state.myPhoneNumberB64 = this.props.session.sessionPhoneNumber;
    if (this.state.myPhoneNumberB64 !== '') {
        this.props.fetchAllConversation({
          my_msisdn: this.state.myPhoneNumberB64,
          deviceId: this.state.deviceId,
          page: 1
        });
        this.props.fetchAllMessageGroup({
          my_msisdn: this.state.myPhoneNumberB64,
          deviceId: this.state.deviceId,
          page: 1
        });
        this.props.fetchUserGroup({ user_id: this.state.myPhoneNumberB64 }, () => {
          // this.props.fetchUserGroupMessag({ user_id: this.props.user_id });
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    const myPhoneNumber = nextProps.session.sessionPhoneNumber;
    this.state.myPhoneNumberB64 = myPhoneNumber;
    this.setState({ myPhoneNumberB64: myPhoneNumber });
  }
  render() {
    // no need view
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllConversation,
      fetchAllMessageGroup,
      fetchUserGroup
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(FirstloadDataContainer);
