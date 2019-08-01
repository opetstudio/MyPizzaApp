import React from 'react';
import {
  View,
  TouchableOpacity,
  Share,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Row from '../components/Row';
import {
    URL_RAYAKU,
    MESSAGE_SHARE,
    TITLE_SHARE,
    CONTACT_TYPE_INVITE,
    CONTACT_TYPE_MOBILE
} from '../constants';

class ContactsDetailContainer extends React.Component {
  constructor() {
    super();
    this._inviteWithShare = this._inviteWithShare.bind(this);
  }

  componentWillMount() {
      // console.log('[ContactsDetailContainer] component componentWillMount', this.props);
    }

  _inviteWithShare() {
    Share.share({
      ...Platform.select({
        ios: {
          message: MESSAGE_SHARE,
          url: URL_RAYAKU
        },
        android: {
          message: MESSAGE_SHARE + URL_RAYAKU
        }
      }),
    }, {
      ...Platform.select({
        ios: {
          // iOS only:
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ]
        },
        android: {
          // Android only:
          dialogTitle: TITLE_SHARE
        }
      })
    });
  }


  render() {
    const v = this.props.item;
    const phoneName = v.name;
    const phone_number_display = v.phoneNumber;
    let contactType = '';
    if (v.rayaku_status === 0) { contactType = CONTACT_TYPE_INVITE; }
    if (v.rayaku_status === 1) { contactType = CONTACT_TYPE_MOBILE; }

    const conversation_id = v.phoneNumberNormalized;
    const conversationProp = {
      conversation_id,
      title: phoneName,
      friendsPhoneNumber: conversation_id,
      // contactDetail: contact,
      isGroup: false
    };

    return (
        <TouchableOpacity
            key={v.uid}
            onPress={() => {
            if (v.rayaku_status === 0) {
                this.props.fetchOnceByUid(v.phoneNumberNormalized, (contactDetailFromServer) => {
                if (contactDetailFromServer) {
                    Actions.conversations(conversationProp);
                } else {
                    // alert('invite number');
                    this._inviteWithShare();
                }
                });
            }
            if (v.rayaku_status === 1) {
                Actions.conversations(conversationProp);
            }
            }}
        >
            <View>
            <Row
                key={v.uid}
                data={{
                name: phoneName,
                phone_number: phone_number_display,
                time: contactType,
                badge: null,
                profile_picture: this.props.user_detail.profile_picture || ''
                }}
            />
            </View>
        </TouchableOpacity>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user_detail: state.UsersReducer.byId[ownProps.item.phoneNumberNormalized] || {}
  };
}

export default connect(mapStateToProps)(ContactsDetailContainer);
