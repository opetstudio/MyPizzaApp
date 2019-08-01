import React, { Component } from 'react';
import {
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Modal,
    Platform,
    TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import ModalGropupRenameContainer from '../../containers/groupprofile/ModalGroupRenameContainer';
import ViewGroupNameContainer from '../../containers/groupprofile/ViewGroupNameContainer';

import styles from '../../styles/GroupNameModal.style';
import { colors } from '../../styles/color.style';

const icon_back = require('../../assets/images/back_white.png');
const icon_group = require('../../assets/images/group-default-img-xl.png');

export default class GroupProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._toggleModal = this._toggleModal.bind(this);
        this._onChangeTextInput = this._onChangeTextInput.bind(this);
        this._onSubmitTextInput = this._onSubmitTextInput.bind(this);
        this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
    }
    componentWillMount() {
        const profile_picture = this.props.source_avatar || '';
        this.setState({
            source_avatar: profile_picture,
            title: this.props.title,
            isModalVisible: false,
            phone_number: this.props.phone_number,
            owner: this.props.owner,
          });
    }

    componentWillReceiveProps(nextProps) {
        console.log('[GroupProfilePicture] componentWillMount');
        const profile_picture = nextProps.source_avatar || '';
        this.setState({
            source_avatar: profile_picture
        });
    }

    _onChangeTextInput(text) {
        this.setState({ title: text });
    }

     _onSubmitTextInput(value) {
         console.log('value:', value);
        this.props.onChangeGroupNameInputText(value);
        this._toggleModal(!this.state.isModalVisible);
    }

    _toggleModal(visible) {
        console.log('visible:', visible);
        this.setState({ isModalVisible: visible });
    }

    _onErrorLoadImage() {
        // console.log('[Row] _onErrorLoadImage e=', e);
        this.setState({
          source_avatar: icon_group
        });
    }

    _renderGroupName(title, onPress) {
        return (
            <View>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.nmText}>{title}</Text>
            </TouchableOpacity>
            </View>
        );
      }
    render() {
        const owner = this.state.owner;
        const phone_number = this.state.phone_number;
        console.log('[GroupProfilePicture] render: ', this.state);
        return (
            <View>
                <ModalGropupRenameContainer
                    groupName={this.state.title}
                    groupId={this.props.groupId}
                />
                <TouchableHighlight
                    onPress={() => { return phone_number === owner ? this.props.image_picker() : null; }}
                    disabled= {phone_number !== owner}
                >
                    <ImageBackground
                    source= { this.state.source_avatar }
                    style={styles.imgPhoto}
                    resizeMode='cover'
                    onError={this._onErrorLoadImage}
                    >
                        <View style={[styles.left]}>
                            <TouchableOpacity
                                // onPress={() => Actions.pop()}
                                onPress={() => (Platform.OS === 'ios' ? Actions.pop() : Actions.conversations())}
                                style={styles.leftTouch}
                            >
                            <View
                                style={styles.imgView}
                            >
                                <Image
                                style={styles.img}
                                resizeMode="contain"
                                source={icon_back}
                                />
                            </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.nmBox}>
                            <LinearGradient
                                locations={[0, 1]}
                                colors= {[colors.transparent, '#00000090']}
                                style={{ flex: 1 }}
                                >
                                <TouchableOpacity onPress={() => { return this.state.phone_number === this.state.owner ? this.props.toggleModalGroupRename(true) : null; }}>
                                    <ViewGroupNameContainer groupid={this.props.groupId} />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        );
    }
}
