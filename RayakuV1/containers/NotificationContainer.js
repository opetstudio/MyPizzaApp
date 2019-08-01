import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import _ from 'lodash';
import { AppState } from 'react-native';

import {
  setConsumeNotifInprogress,
  setConsumeNotifDone,
  fetchAll as fetchAllNotification,
  setReload as setReloadNotification,
  pushRemoteNotification,
  popUpLocalNotification,
  getStatusDeliveryNotifData,
  notificationSetOnValue,
  getTotalbadgeNumberFromRedux,
  doSetAppIconBadgeNumber,
  pushQueueNewIncoming,
  pushPopupNotification
} from '../actions/NotificationAction';

import {
  receiveMessage,
  updateMessageToDelivered,
  updateMessageToDeliveredGroup,
  dispatchChatsList,
  updateStatusMessage,
  setMessageDataFromNotification
} from '../actions/ConversationAction';

import { getNotifAsyncStorage, clearNotifAsyncStorage } from '../api/asyncstorageApi';

class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._reloadAllData = this._reloadAllData.bind(this);
    this._setupListener = this._setupListener.bind(this);
    this._consumeNotification = this._consumeNotification.bind(this);
    this._notificationUidQueueConsum = this._notificationUidQueueConsum.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  componentWillMount() {
    this.state.myPhoneNumberB64 = this.props.session.sessionPhoneNumber;
    this.state.reLoad = this.props.reLoadr;
    this.state.deviceId = this.props.deviceId;
    this.state.notificationUidQueue = this.props.notificationUidQueue;
    this.state.consumeNotificationInprogress = this.props.consumeNotificationInprogress;
    this.state.notification_ref = `/notifications/${this.state.myPhoneNumberB64}`;
    this.state.listNotif = {};

    // if (this.state.myPhoneNumberB64 !== '') {
    //   this.props.setReloadNotification(true);
    // }
    this._setupListener();
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentDidMount() {
    // this._checkStatus();
  }
  componentWillReceiveProps(nextProps) {
    this.state.myPhoneNumberB64 = nextProps.session.sessionPhoneNumber;
    this.state.reLoad = nextProps.reLoadr;
    this.state.deviceId = nextProps.deviceId;
    this.state.notificationUidQueue = nextProps.notificationUidQueue;
    this.state.consumeNotificationInprogress = nextProps.consumeNotificationInprogress;
    // if (this.state.myPhoneNumberB64 !== '') {
    //   this._reloadAllData();
    // }
    // if (!this.state.consumeNotificationInprogress
    //   && this.state.notificationUidQueue.length > 0) {
    //   this._notificationUidQueueConsum();
    // }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange() {
    // this.props.getTotalbadgeNumberFromRedux((totalBadge) => {
      doSetAppIconBadgeNumber(0);
      // doSetAppIconBadgeNumber(totalBadge);
    // });
    if (AppState.currentState === 'active') {
      this._setupListener();
    } else {
      // firebase.database().ref(this.state.notification_ref).off();
    }
  }
  // async _checkStatus() {
  //   const status = await BackgroundTask.statusAsync();
  //   if (status.available) {
  //     // Everything's fine
  //     return;
  //   }
  //   const reason = status.unavailableReason;
  //   if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
  //     Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app');
  //   } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
  //     Alert.alert('Restricted', 'Background tasks are restricted on your device');
  //   }
  // }
  _setupListener() {
    // getNotifAsyncStorage().then(dataNotifications => {
    //   clearNotifAsyncStorage().then(()=>{}).catch(e=>{});
    //   // removeNotificationsAsyncStorage();
    //
    //   if( dataNotifications !== null) {
    //     const dataNotificationsObj = JSON.parse(dataNotifications);
    //     const notificationList = _.map(dataNotificationsObj, (val, uid) => {
    //       return { ...val, uid };
    //     });
    //     notificationList.forEach((v,k) => {
    //       firebase.database().ref(`${this.state.notification_ref}/${v.uid}`).remove();
    //       this._consumeNotification(v || {}, false);
    //     });
    //     // const notifById = dataNotifications.byId;
    //     // const notifAllIds = dataNotifications.allIds;
    //     // if(notifAllIds && notifAllIds !== null) {
    //     //   notifAllIds.forEach((v, k) => {
    //     //     this._consumeNotification(notifById[v] || {}, true);
    //     //   });
    //     // }
    //
    //   }
    // }).catch((e)=>{
    //   ////console.log('[NotificationContainer] getNotificationsAsyncStorage e=', e);
    // });
    getNotifAsyncStorage().then((dataNotifications) => {
      notificationSetOnValue(this.state.notification_ref, (snapshot) => {
        clearNotifAsyncStorage().then(() => {}).catch(() => {});

        const dataNotificationsObj_fromAS = JSON.parse(dataNotifications);
        const dataNotificationsObj_fromDB = snapshot.val() || {};

        console.log('[NotificationContainer] dataNotificationsObj_fromAS=>', dataNotificationsObj_fromAS);
        console.log('[NotificationContainer] dataNotificationsObj_fromDB=>', dataNotificationsObj_fromDB);

        // this.props.pushQueueNewIncoming(dataNotificationsObj_fromAS);
        // this.props.pushQueueNewIncoming(dataNotificationsObj_fromDB);

       const dataNotificationsObj_merge =
        _.merge(dataNotificationsObj_fromAS, dataNotificationsObj_fromDB);

        const notificationList = _.map(dataNotificationsObj_merge, (val, uid) => {
          if ((uid in this.state.listNotif) === false) {
            this.state.listNotif[uid] = true;
            return { ...val, uid };
          }
          return null;
        });
        console.log('[NotificationContainer] notificationList=>', notificationList);
        notificationList.forEach((v) => {
          if (v !== null && typeof v === 'object') {
            const isGroupMessage = _.get(v, 'params.messageData.is_group_msg');
            const messageSender = _.get(v, 'params.messageData.sender');
            if (isGroupMessage === 'yes' && messageSender === this.state.myPhoneNumberB64) return null;
            firebase.database().ref(`${this.state.notification_ref}/${v.uid}`).remove();
            this._consumeNotification(v);
          }
        });
      });
    }).catch(() => {});
  }
  _consumeNotification(v) {
    if (v.command === 'fetch_new_message') {
      // if (isFromLocalAsyncStorage) {
      //   this.props.receiveMessage(v.newMessageData, (newMessageData) => {
      //   });
      // } else {
          // console.log('[NotificationContainer] handling  message=>', v.params.messageData);
          // create new message
          const messageData = setMessageDataFromNotification(v.params.messageData);
          // console.log('[NotificationContainer] receiveMessage  messageData=>', messageData);
          const is_group_msg = ('is_group_msg' in messageData && messageData.is_group_msg === 'yes');
          this.props.receiveMessage(messageData, (newMessageData) => {
            // console.log('[NotificationContainer] receiveMessage  newMessageData=>', newMessageData);
            // console.log('[NotificationContainer] receiveMessage  is_group_msg=>', is_group_msg);
            if (newMessageData !== null && !is_group_msg) {
              // console.log('[NotificationContainer] receiveMessage  is_group_msg=>', is_group_msg);
              this.props.updateMessageToDelivered((newMessageData), ({ messageForSender }) => {
                const notificationData = getStatusDeliveryNotifData(messageForSender);
                pushRemoteNotification(notificationData, messageForSender.sender_phone_number);
              });
              if (v.show_on_localnotif === 'yes') {
                // if (Platform.OS === 'ios')
                this.props.popUpLocalNotification(v);
              }
            }
            if (newMessageData !== null && is_group_msg) {
              this.props.updateMessageToDeliveredGroup({ newMessageData, my_msisdn: this.state.myPhoneNumberB64 }, ({ messageForSender }) => {
                // const notificationData = getStatusDeliveryNotifData(messageForSender);
                // pushRemoteNotification(notificationData, messageForSender.sender_phone_number);
              });
            }
          });
      // }
    }
    if (v.command === 'update_status_message') {
      this.props.updateStatusMessage(v.params.msg_uid, v.params.status);
    }
  }
  _notificationUidQueueConsum() {
    // this.props.setConsumeNotifInprogress();
  }
  _reloadAllData() {
    if (this.state.reLoad) {
      this.props.fetchAllNotification({
        myPhoneNumberB64: this.state.myPhoneNumberB64
      });
      this.props.setReloadNotification(false);
    }
  }
  render() {
    return null;
  }
}

function mapStateToProps(state) {
  // //console.log('[NotificationContainer] mapStateToProps');
  return {
    reLoad: state.NotificationReducer.reLoad,
    notificationUidQueue: state.NotificationReducer.notificationUidQueue,
    consumeNotificationInprogress: state.NotificationReducer.consumeNotificationInprogress,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllNotification,
      setReloadNotification,
      setConsumeNotifInprogress,
      setConsumeNotifDone,
      receiveMessage,
      updateMessageToDelivered,
      popUpLocalNotification,
      dispatchChatsList,
      updateStatusMessage,
      getTotalbadgeNumberFromRedux,
      pushQueueNewIncoming,
      pushPopupNotification,
      updateMessageToDeliveredGroup
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
