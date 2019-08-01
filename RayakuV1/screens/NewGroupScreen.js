import React from 'react';
import NewGroupContainers from '../containers/NewGroupContainers';

class NewGroupScreen extends React.Component {
  componentWillMount() {
    console.log('NewGroupScreen component componentWillMount', this.props);
  }
  render() {
    return (
      <NewGroupContainers session={this.props.session}/>
    );
  }
  }

  export default NewGroupScreen;
