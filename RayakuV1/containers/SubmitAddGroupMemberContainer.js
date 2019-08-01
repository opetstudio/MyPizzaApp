import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Text, Alert, Platform, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { addMemberGroup } from '../actions/GraphqlAction';
import { SELECTED_EXISTING_GROUP_MEMBERS_KEY } from '../constants';
import styles from '../styles/NavBar.style';
import { colors } from '../styles/color.style';

class SubmitAddGroupMemberContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._submitAddGroupMember = this._submitAddGroupMember.bind(this);
    }
    componentWillMount() {
        this.setState({
            user_id: this.props.user_id,
            group_id: this.props.group_id,
            deviceid: this.props.deviceid,
            listChecked: this.props.listChecked,
            update_inprogress: this.props.update_inprogress,
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            user_id: nextProps.user_id,
            group_id: nextProps.group_id,
            deviceid: nextProps.deviceid,
            listChecked: nextProps.listChecked,
            update_inprogress: nextProps.update_inprogress,
        });
    }
    _submitAddGroupMember() {
        const dataSubmit = {
            members: this.state.listChecked || [],
            owner: this.state.user_id,
            deviceid: this.state.deviceid,
            groupid: this.state.group_id
        };
        this.props.addMemberGroup({
            data: dataSubmit
        }, (status, message) => {
           if (!status) Alert.alert(`Submit error: ${message}`);
           else Actions.pop();
        });
    }
    _render_loading_indicator() {
        return (
            <View style={[styles.right, { marginRight: 10 }]}>
                <ActivityIndicator size="small" color={Platform.OS === 'ios' ? colors.black : colors.white} />
            </View>
        );
    }
    render() {
            console.log('[SubmitAddGroupMemberContainer] state=', this.state);
        
            if (this.state.update_inprogress) return this._render_loading_indicator();
            return (
            <View style={[styles.right]}>
                <TouchableOpacity onPress={() => this._submitAddGroupMember() } style={styles.rightTouch}>
                <Text style={{ color: (Platform.OS === 'ios') ? colors.black : colors.white }}>
                    Done
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect((state) => {
    return {
        listChecked: state.FlagCheckBoxReducer.listChecked[SELECTED_EXISTING_GROUP_MEMBERS_KEY] || [],
        group_id: state.GroupprofileReducer.group_id,
        deviceid: state.SessionReducer.deviceId,
        user_id: state.SessionReducer.sessionPhoneNumber,
        update_inprogress: state.GroupReducer.isRmOneGroupMemberInprogress,
    };
}, (dispatch) => {
    return bindActionCreators({ addMemberGroup }, dispatch);
})(SubmitAddGroupMemberContainer);
