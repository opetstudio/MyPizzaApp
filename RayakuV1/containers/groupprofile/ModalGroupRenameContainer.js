import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Text,
  Alert,
  Keyboard
}
from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import { modalGroupRenameToggle } from '../../actions/GroupprofileAction';
import { renameGroup } from '../../actions/GraphqlAction';

import styles from '../../styles/GroupNameModal.style';
import stylesNavbar from '../../styles/NavBar.style';
import { colors } from '../../styles/color.style';

const icon_back = require('../../assets/images/back_white.png');

class ModalGroupRenameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._toggleModal = this._toggleModal.bind(this);
        this._onSubmitTextInput = this._onSubmitTextInput.bind(this);
        this._onChangeTextInput = this._onChangeTextInput.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }
    componentWillMount() {
        this.setState({
            isModalVisible: this.props.visible,
            title: this.props.groupName,
            groupid: this.props.groupId,
            deviceid: this.props.deviceid,
            myId: this.props.myId,
            marginBottom: 0
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isModalVisible: nextProps.visible
        });
    }
    _keyboardDidShow(e) {
        console.log('keyboardDidShow');
        this.setState({ marginBottom: e.endCoordinates.height });
    }
    _keyboardDidHide() {
    this.setState({ marginBottom: 0 });
    }
    _onChangeTextInput(value) {
        this.setState({ title: value });
    }
    _onSubmitTextInput() {
        // console.log('[ModalGroupRenameContainer] _onSubmitTextInput value=', value);
            this.props.renameGroup(
                {
                deviceid: this.state.deviceid,
                groupid: this.state.groupid,
                myId: this.state.myId,
                data: {
                    name: this.state.title
                }
                },
                (status, message) => {
                    // console.log('statusssss', status);
                    // console.log('messagessss', message);
                    if (status) this._toggleModal(!this.state.isModalVisible);
                    else Alert.alert(message);
                }
            );
   }
    _toggleModal(visible) {
        this.props.modalGroupRenameToggle(visible);
    }
    render() {
        console.log('[ModalGroupRenameContainer] render');
        
        const navBarAndroid = [stylesNavbar.containerAndroid, styles.modalNavbarAndroid];
        const margin = Platform.OS === 'ios' ? this.state.marginBottom : 0;
        console.log('marginBottom:', this.state.marginBottom);
        return (
            //  <KeyboardAvoidingView behavior='position' >
          
            <Modal
                visible={this.state.isModalVisible === true}
                onRequestClose={() => this._toggleModal(!this.state.isModalVisible)}
                animationType={'slide'}
                onShow={() => { this.textInput.focus(); }}
            >
                <View style={[styles.nameModal, { marginBottom: margin }]}>
                    <View style={Platform.OS === 'android' ? navBarAndroid : stylesNavbar.containerIos}>
                        <Text style={styles.modalHeaderText}>Enter new name</Text>
                    </View>
                    <View
                        style={{
                            flex: Platform.OS === 'ios' ? 0.4 : 0.9,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >
                        <LinearGradient
                            colors={['rgba(255,255,255,0.00)', 'rgba(74,74,74,0.04)']}
                            locations={[0, 0.99]}
                            style={{
                            width: 300,
                            }}
                        >
                            <TextInput
                            ref={(input) => { this.textInput = input; }}
                            value={this.state.title}
                            underlineColorAndroid='transparent'
                            multiline={false}
                            style={{
                                fontSize: 20,
                                color: '#000',
                                textAlign: 'center',
                                width: 300,
                                borderBottomWidth: 1,
                                borderBottomColor: '#D3DDE0',
                            }}
                            onSubmitTextInput={this._onSubmitTextInput}
                            onChangeText={this._onChangeTextInput}
                            placeholder="Display Name"
                            placeholderTextColor='#D3DDE0'
                            />
                    </LinearGradient>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => this._toggleModal(!this.state.isModalVisible)}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonOK}>
                                    Cancel
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onSubmitTextInput}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonOK}>
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default connect(
    (state) => ({
    visible: state.GroupprofileReducer.isOpenModalGroupRename,
    deviceid: state.SessionReducer.deviceId,
    myId: state.SessionReducer.sessionPhoneNumber
}),
(dispatch) => bindActionCreators({ modalGroupRenameToggle, renameGroup }, dispatch)
)(ModalGroupRenameContainer);
