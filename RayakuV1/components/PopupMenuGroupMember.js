import {
        Platform,
        ToastAndroid,
        ActionSheetIOS,
        AlertIOS,
        Alert
      }
        from 'react-native';
import DialogAndroid from 'react-native-dialogs';

import { ITEMS_GROUP_MEMBERS } from '../constants';

export const PopupMenuGroupMember = ({ name, deleteMember }) => {
    console.log('PopupMenuGroupMember');
    if (Platform.OS === 'android') {
        const itemsCallback = (buttonIndex, text) => {
        if (buttonIndex === 0) {
            // console.log(id + ': ' + text);
            deleteMember();
            // ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT);
        } else if (buttonIndex === 1) {
            // console.log(id + ": " + text);
            // ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT);
        }
    };

    const options = {
      title: name,
      items: ITEMS_GROUP_MEMBERS,
      itemsCallback
    };

      const dialog = new DialogAndroid();
      dialog.set(options);
      dialog.show();
    } else {
          ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ITEMS_GROUP_MEMBERS,
                title: name,
                cancelButtonIndex: 1,
                // destructiveButtonIndex: 3,
            },
          (buttonIndex, text) => {
            if (buttonIndex === 0) {
              deleteMember();
              // console.log(buttonIndex + ": " + text);
            } else if (buttonIndex === 1) {
              // console.log(buttonIndex + ": " + text);
            }
          }
        );
    }
};
