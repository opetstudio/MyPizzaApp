import React from 'react';
import { View,
        Text,
        TouchableOpacity,
        StyleSheet,
        Dimensions,
        Platform,
        ToastAndroid,
        ActionSheetIOS,
        AlertIOS,
        Alert
      }
        from 'react-native';
import { Actions } from 'react-native-router-flux';
import DialogAndroid from 'react-native-dialogs';

import {
  ITEMS_CHAT,
  ITEMS_MESSAGE
}
from '../constants';

export const PopupMenuMessage = () => {

  if(Platform.OS === 'Android'){
    const deleteDialog = {
       "content": "Are you sure want to delete this conversation",
       "positiveColor": "#000000",
       "positiveText": "OK",
       "negativeColor": "#FD5B31",
       "negativeText": "CANCEL"
    }

    const itemsCallback = (id, text) => {
      if(text === 'Delete') {
        //Alert.alert('Deleted');
        var dialogDel = new DialogAndroid();
        dialogDel.set(deleteDialog);
        dialogDel.show();
      }
      else ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT);
    }

    const options = {
      "items": ITEMS_MESSAGE,
      //itemsCallback: (id, text) => ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT)
      itemsCallback: itemsCallback
    };


      // console.log('options:',options);
      var dialog = new DialogAndroid();
      dialog.set(options);
      dialog.show();
    }

    else{
          ActionSheetIOS.showActionSheetWithOptions({
            options: ITEMS_IMAGE_PICKER,
            cancelButtonIndex: 2,
          },
          (buttonIndex, text) => {
            //this.setState({ clicked: BUTTONS[buttonIndex] });
            if (buttonIndex === 0) { Alert.alert('Index'+ buttonIndex); }
            else if (buttonIndex === 1) { Alert.alert('Index'+ buttonIndex); }
            else if (buttonIndex === 2) { Alert.alert('Index'+ buttonIndex); }
            else if (buttonIndex === 3) {
              AlertIOS.alert(
                'Confirm Delete',
                'Are you sure want to delete conversation? ',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                                ////console.log('Yes Pressed');
                              },
                    style: 'destructive',
                  },
                  {
                    text: 'No',
                    onPress: () => {
                                      /////console.log('No Pressed'); 
                                    },

                  },
                ]
              );
            }
          });
    }
//  );
};

//export PopupMenuMessage;
