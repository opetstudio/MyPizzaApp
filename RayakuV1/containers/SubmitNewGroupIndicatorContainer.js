import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableOpacity, Text, Alert, Platform, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { addGroup } from '../actions/GraphqlAction';
import { SELECTED_GROUP_MEMBERS_KEY } from '../constants';
import styles from '../styles/NavBar.style';
import { colors } from '../styles/color.style';

class SubmitNewGroupIndicatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._submitGroup = this._submitGroup.bind(this);
    }
    componentWillMount() {
        this.setState({
            user_id: this.props.user_id,
            listChecked: this.props.listChecked,
            create_inprogress: this.props.create_inprogress,
            groupName: this.props.group_name,
            groupProfilePicture: this.props.group_profile_picture,
            groupProfilePictureDevice: this.props.group_profile_picture_device
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            user_id: nextProps.user_id,
            listChecked: nextProps.listChecked,
            groupName: nextProps.group_name,
            create_inprogress: nextProps.create_inprogress,
            groupProfilePicture: nextProps.group_profile_picture,
            groupProfilePictureDevice: nextProps.group_profile_picture_device
        });
    }
    _submitGroup() {
        const submitSuccessCallback = (newGroupData) => {
            console.log('[SubmitNewGroupIndicatorContainer] _submitGroup submitSuccessCallback newGroupData=', newGroupData);
            Actions.conversations({
                conversation_id: newGroupData.id,
                title: newGroupData.name,
                friendsPhoneNumber: newGroupData.id,
                contactDetail: newGroupData,
                isGroup: true
            });
        };
        const submitErrorCallback = (error_msg) => {
            Alert.alert(`${error_msg}`);
        };
        const dataSubmit = {
            listChecked: this.state.listChecked,
            owner: this.state.user_id,
            groupName: this.state.groupName,
            groupProfilePicture: this.state.groupProfilePicture,
            groupProfilePictureDevice: this.state.groupProfilePictureDevice
        };
        this.props.addGroup({
            data: dataSubmit,
            submitSuccessCallback,
            submitErrorCallback
        });
    }
    _render_loading_indicator() {
        return (
            <View style={[styles.right, { marginRight: 10 }]}>
                <ActivityIndicator size="small" color={Platform.OS === 'ios' ? colors.black : colors.white}/>
            </View>
        );
    }
    _render_button_submit() {
        return (
            <View style={[styles.right]}>
                <TouchableOpacity onPress={() => this._submitGroup() } style={styles.rightTouch}>
                <Text style={{ color: (Platform.OS === 'ios') ? colors.black : colors.white }}>
                    Done
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        console.log('[SubmitNewGroupIndicatorContainer] state=', this.state);
       if (this.state.create_inprogress) return this._render_loading_indicator();
       return this._render_button_submit();
    }
}

export default connect((state) => {
    return {
        listChecked: state.FlagCheckBoxReducer.listChecked[SELECTED_GROUP_MEMBERS_KEY] || [],
        group_name: state.GroupprofileReducer.group_name,
        create_inprogress: state.GroupprofileReducer.create_inprogress,
        group_profile_picture: state.GroupprofileReducer.group_profile_picture,
        group_profile_picture_device: state.GroupprofileReducer.group_profile_picture_device,
        user_id: state.SessionReducer.sessionPhoneNumber
    };
}, (dispatch) => {
    return bindActionCreators({ addGroup }, dispatch);
})(SubmitNewGroupIndicatorContainer);
