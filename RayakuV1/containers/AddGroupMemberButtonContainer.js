import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from '../styles/ViewProfile.style';
import { colors } from '../styles/color.style';

const icon_forward = require('../assets/images/forward.png');

class AddGroupMemberButtonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.state.phone_number = this.props.phone_number;
        this.state.owner = this.props.owner;
    }
    render() {
        if (this.state.phone_number === this.state.owner) {
            return (
                <View>
                <TouchableHighlight onPress={() => Actions.addGroupMember({ groupId: this.props.groupId }) }>
                    <View style={styles.subListTwo}>
                        <View style={styles.subViewLeft}>
                        <Text>Add Member</Text>
                        </View>
                        <View style={styles.subViewRight}>
                        {/* <Text style={{ color: colors.mediumGray }}>-</Text> */}
                        <Image
                            style={styles.imgForward}
                            resizeMode="contain"
                            source={icon_forward}
                        />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            );
        }
        return null;
    }
}

function mapStateToProps(state, ownProps) {
    console.log('[AddGroupMemberButtonContainer] mapStateToProps ', this.props);
    const owner = (state.GroupReducer.byId[ownProps.groupId]).owner || '';
    const phone_number = state.UserprofileReducer.phone_number || '';
    return {
      owner,
      phone_number
    };
  }

  export default connect(mapStateToProps)(AddGroupMemberButtonContainer);
