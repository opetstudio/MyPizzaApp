import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import NavbarMiddleNearby from '../../components/navbar/middle/navbarMiddleNearby';
import NavbarMiddleConversation from '../../components/navbar/middle/navbarMiddleConversation';
import NavbarMiddleDefault from '../../components/navbar/middle/navbarMiddleDefault';
import PopupMenuMessageContainer from '../PopupMenuMessageContainer';

class NavbarMiddleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._renderForConversataion = this._renderForConversataion.bind(this);
        this._renderForNearby = this._renderForNearby.bind(this);
    }
    componentWillMount() {
        this.setState({
            title: this.props.title
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title
        });
    }
    _renderForConversataion() {
        console.log('[navbarMiddleContainer] props=', this.props);
        console.log('[navbarMiddleContainer] state=', this.state);
       return <NavbarMiddleConversation
        addNewContact={this.props.addNewContact}
        title={this.state.title}
        contactDetail={this.props.contactDetail}
       />;
    }
    _renderForNearby() {
        return <NavbarMiddleNearby />;
    }
    render() {
        const currScene = Actions.currentScene;
        console.log('[navbarMiddleContainer] render ', currScene);
        if (currScene.includes('nearby')) {
            return this._renderForNearby();
        }
        if (currScene.includes('conversations')) {
            return this._renderForConversataion();
        }
        if (currScene.includes('message')) {
            return <PopupMenuMessageContainer
            title= {this.state.title}/>;
        }
        return (
           <NavbarMiddleDefault title={this.state.title} />
        );
    }
}

export default connect((state, ownProps) => {
    const { conversation_id, title, isGroup } = ownProps;
    let titleNavbar = title;
    if (conversation_id && isGroup) {
        titleNavbar =
        (state.GroupReducer.byId[conversation_id] || {}).name || '';
    }
    if (conversation_id && !isGroup) {
        titleNavbar = state.ContactsReducer.byId[conversation_id] ?
        (state.ContactsReducer.byId[conversation_id] || {}).name || '-' : conversation_id;
    }

    return {
        title: titleNavbar
    };
})(NavbarMiddleContainer);
