import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  AlertIOS,
  ToastAndroid
} from 'react-native';
import Moment from 'moment';

import DialogAndroid from 'react-native-dialogs';
import { colors } from '../styles/color.style'; 

export default class MessageBubble extends Component {
   _onLongPress(position) {
     // Alert.alert('You long-pressed the button');
     // const itemsCallback = (id, text) => ToastAndroid.show(id + ':' + text, ToastAndroid.SHORT);
     if (position === 'right') {
     if (Platform.OS === 'Android') {
         const deleteDialog = {
            content: 'Are you sure want to delete this chat?',
            positiveColor: '#000000',
            positiveText: 'OK',
            negativeColor: '#FD5B31',
            negativeText: 'CANCEL'
         };

         const itemsCallback = (id, text) => {
           if (text === 'Delete') {
             // Alert.alert('Deleted');
             const dialogDel = new DialogAndroid();
             dialogDel.set(deleteDialog);
             dialogDel.show();
           } else ToastAndroid.show(`${id}: ${text}`, ToastAndroid.SHORT);
         };

         const options = {
           items: [
             'Delete',
           ],
           // itemsCallback: (id, text) => ToastAndroid.show(id + ': ' + text, ToastAndroid.SHORT)
           itemsCallback
         };


           // //console.log('options:',options);
           const dialog = new DialogAndroid();
           dialog.set(options);
           dialog.show();
     } else {
       AlertIOS.alert(
         'Confirm Delete',
         'Are you sure want to delete this chat? ',
         [
           {
             text: 'Yes',
             onPress: () => {
                              // //console.log('Yes Pressed');
                            },
             style: 'destructive',
           },
           {
             text: 'No',
             onPress: () => {
                              // //console.log('No Pressed');
                            },

           },
         ]
       );
     }
   }

   }

  _renderDeliverableStatus() {
    // const { messages } = this.props;
    let st = 'Pending';
    if (this.props.status === 2) {
      st = 'Sent';
    }
    if (this.props.status === 3) {
      st = 'Delivered';
    }
    if (this.props.status === 4) {
      st = 'Read';
    }
    if (this.props.status === 6) {
      st = 'Failed';
    }
    return st;
  }

  _renderDay() {
    if (this.props.showdate) {
      return (
      <View style={ styles.container }>
          <View style={styles.bubbleDay}>
            <Text style={styles.bubbleDayText}>
              {Moment(this.props.timedevice).format('DD MMMM')}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  _renderSender() {
    if (this.props.isGroup && this.props.position === 'left') {
      // if (this.props.isGroup ) {
      return (
        <Text style={styles.sender}>{this.props.name} </Text>
      );
    }
    return null;
  }

  _renderMsg(timeAndStatus, position, status) {
    // //console.log('_renderMsg', this.props.messages);
    return (
    <View style={[styles[this.props.position].container]}>
      <View style={[styles[this.props.position].wrapper]}>

          <View style={[styles[this.props.position].bubble]}>
          {/* <TouchableOpacity
            onLongPress= {() => this._onLongPress(position)}
          > */}
              <View style={{ margin: 7 }}>
                {this._renderSender()}
                <Text style={[styles[this.props.position].bubbleText]}>
                   {this.props.messages}
                </Text>
              </View>
            {/* </TouchableOpacity> */}
          </View>


        <View style={[styles[this.props.position].bottom]}>
          <Text
            style={[status === 'Failed' ? [styles.tick, { color: colors.red80 }] : styles.tick]}

          >
          {/*}//{this._renderTime()}
          //{this._renderDeliverableStatus()}*/}

          {timeAndStatus}
          </Text>
        </View>

      </View>
    </View>
  );
  }

  render() {
    // ////console.log('[MessageBubble] render');
    // ////console.log(this.props.createdon);
    const time = Moment(new Date(this.props.createdon)).format('HH:mm'); //created time saat send
    const msgCreated = Moment(new Date(this.props.createdon)).format('DD MMM').toString();
    const msgDate = Moment(new Date(this.props.timedevice)).format('DD MMM').toString();
    //const time = new Date(this.props.createdon * 1000);

   const sender = this.props.sender;
   const position = this.props.position;
    let timeAndStatus = `${time} - ${this._renderDeliverableStatus()}`;
    if (position === 'left') {
      if (msgCreated !== msgDate) {
        ////console.log('time device !== createdon');
        timeAndStatus = `${msgCreated} - ${time}`;
      }
      if (msgCreated === msgDate) {
        ////console.log('time device == createdon');
        timeAndStatus = `${time}`;
      }
    }

    return (
      <View style={{ flex: 1 }}>

        { this._renderDay() }
        { this._renderMsg(timeAndStatus, position, this._renderDeliverableStatus()) }

      </View>
      );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    wrapper: {
      marginRight: 60,
      paddingLeft: 15,
      paddingVertical: 4,
      alignItems: 'flex-start',
      overflow: Platform.OS === 'ios' ? 'hidden' : null,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    bottom: {
      flexDirection: 'row',
    },
    bubble: {
      borderRadius: 8,
      backgroundColor: '#FFF',
    },
    bubbleText: {
        color: '#000',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    wrapper: {
      marginLeft: 60,
      paddingRight: 15,
      paddingVertical: 4,
      alignItems: 'flex-end',
      overflow: Platform.OS === 'ios' ? 'hidden' : null,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    bottom: {
      flexDirection: 'row',
    },
    bubble: {
      borderRadius: 8,
      backgroundColor: '#FDF9F4',
    },
    bubbleText: {
      color: '#000',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
  }),
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bubbleDay: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF70',
    opacity: 100,
    marginBottom: 5,
    marginTop: 5
  },
  bubbleDayText: {
    fontSize: 12,
    color: '#999999'
  },
  tick: {
    fontSize: 10,
    color: '#999999',
    backgroundColor: 'transparent'
  },
  sender: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.lightGray
  }
};
