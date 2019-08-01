import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

import Row from '../components/Row';
import { PopupMenuGroupMember } from '../components/PopupMenuGroupMember';
import { removeOneMemberGroup } from '../actions/GraphqlAction';

class GroupMemberRowContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._deleteMember = this._deleteMember.bind(this);
    }
    componentWillMount() {
        console.log('[GroupMemberRowContainer] componentWillMount props=', this.props);
        this.setState({
            contactName: this.props.contactName,
            deviceid: this.props.deviceid,
            id: this.props.id,
            my_msisdn: this.props.my_msisdn,
            display_phone_number: this.props.display_phone_number
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log('[GroupMemberRowContainer] componentWillReceiveProps nextProps=', nextProps);
        this.setState({
            contactName: nextProps.contactName,
            deviceid: nextProps.deviceid,
            my_msisdn: nextProps.my_msisdn,
            id: nextProps.id,
            display_phone_number: nextProps.display_phone_number
        });
    }
    _deleteMember() {
        this.props.removeOneMemberGroup({
            deviceid: this.state.deviceid,
            owner: this.props.owner,
            groupid: this.props.groupid,
            member: this.props.id
        }, (status, msg) => {
            if (!status) Alert.alert(msg);
        });
    }
    _addMember() {
        Alert.alert('add member');
    }
    _toggleEditMode(name) {
        console.log('[GroupMemberRowContainer] _toggleEditMode name', name);
        PopupMenuGroupMember({
            name,
            deleteMember: this._deleteMember
        });
    }
    render() {
        console.log('[GroupMemberRowContainer] render.', this.props);
        const val = this.props.contactDetail;
        const profile_picture = this.props.userDetail.profile_picture;
        const owner = this.props.owner;
        // const phone_number = this.props.phone_number;
        console.log('[GroupMemberRowContainer]', val.name);
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress= {() => {
                    return this.state.my_msisdn === owner
                    && this.state.my_msisdn !== this.state.id ?
                    this._toggleEditMode(val.name) : null;
                }}>
                    <Row
                        key={val.uid}
                        data={{
                            name: this.state.contactName,
                            phone_number: this.state.display_phone_number,
                            time: 'MOBILE',
                            badge: null,
                            profile_picture,
                            isGroupMember: true
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        removeOneMemberGroup
      },
      dispatch
    );
  }
export default connect((state, ownprops) => {
    console.log('[GroupMemberRowContainer] connect ', ownprops);
    const idRow = ownprops.id;
    const contactDetail = state.ContactsReducer.byId[idRow] || {};
    console.log('[GroupMemberRowContainer] connect contactDetail=', contactDetail);
    const userDetail = state.UsersReducer.byId[idRow] || {};
    let name = (state.ContactsReducer.byId[idRow] || {}).name || `~${(state.UsersReducer.byId[idRow] || {}).display_name || idRow}`;

    const display_phone_number = contactDetail.phoneNumberNormalized || `+${idRow}`;
    const my_msisdn = state.SessionReducer.sessionPhoneNumber;
    if (idRow === my_msisdn) {
        name = state.UserprofileReducer.display_name || my_msisdn;
    }
    return {
        my_msisdn,
        id: idRow,
        contactDetail,
        userDetail,
        contactName: name,
        deviceid: state.SessionReducer.deviceId,
        display_phone_number
    };
}, mapDispatchToProps)(GroupMemberRowContainer);
