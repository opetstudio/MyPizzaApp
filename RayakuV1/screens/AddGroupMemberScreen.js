import React from 'react';
// import AddGroupMemberContainer from '../containers/AddGroupMemberContainer';
import AddGroupMemberContainer from '../containers/AddGroupMemberContainer';

class AddGroupMemberScreen extends React.Component {
  componentWillMount() {
    console.log('NewGroupScreen component componentWillMount', this.props);
  }
  render() {
    return (
      <AddGroupMemberContainer session={this.props.session} groupId={this.props.groupId}/>
    );
  }
  }

  export default AddGroupMemberScreen;
