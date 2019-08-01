import React from 'react';
import { connect } from 'react-redux';

import ViewGroupName from '../../components/groupprofile/ViewGroupName';

class ViewGroupNameContainer extends React.Component {
    render() {
        return (
           <ViewGroupName groupName={this.props.groupName} />
        );
    }
}

export default connect((state, ownProps) => ({
    groupName: (state.GroupReducer.byId[ownProps.groupid] || {}).name || ''
}))(ViewGroupNameContainer);
