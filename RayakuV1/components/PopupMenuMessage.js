import React from 'react';
import {
        Platform,
        ActionSheetIOS
      }
        from 'react-native';
import { Actions } from 'react-native-router-flux';
import DialogAndroid from 'react-native-dialogs';

import { ToggleEditMessage } from '../screens/ChatsScreen';
import ChatsDetailContainer from '../containers/ChatsDetailContainer';
import ChatsContainer from '../containers/ChatsContainer';
import ChatsScreen from '../screens/ChatsScreen';

import {
  ITEMS_CHAT,
  ITEMS_MESSAGE
}
from '../constants';
const editMode = false;

export const PopupMenuMessage = (selectEditMode) => {
  console.log('[PopupMenuMessage component] edit mode:',selectEditMode);
  if(Platform.OS === 'android') {

    const itemsCallback = (id, text) => {
      if(id === 0) {

        console.log(id + ": " + text);
        console.log('[PopupMenuMessage component] itemsCallback edit mode:',selectEditMode);
        //Actions.refresh({editMode: !editMode});
        selectEditMode(!editMode);
      }
      if(id === 1) {
        console.log(id + ": " + text);
        selectEditMode(false);
      }
      else console.log(id + ": " + text);
    }

    const options = {
      "title": "Chats",
      "items": ITEMS_MESSAGE,
      //itemsCallback: (id, text) => ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT)
      itemsCallback: itemsCallback
    };

      var dialog = new DialogAndroid();
      dialog.set(options);
      dialog.show();
    }

    else{
          ActionSheetIOS.showActionSheetWithOptions({
            options: ITEMS_MESSAGE,
            title: 'Message',
            cancelButtonIndex: 5,
            destructiveButtonIndex: 3,
          },
          (buttonIndex, text) => {
            //this.setState({ clicked: BUTTONS[buttonIndex] });
            if (buttonIndex === 0) {
              console.log(buttonIndex + ": " + text);
              selectEditMode(!editMode);
            }
            else if (buttonIndex === 1) {
              console.log(buttonIndex + ": " + text);
              selectEditMode(false);
            }
            else console.log(buttonIndex + ": " + text);
          });
    }
}
