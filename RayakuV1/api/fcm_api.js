import FCM from 'react-native-fcm';

import firebaseClient from './FirebaseClient';

export const showLocalNotification = () => {
  FCM.presentLocalNotification({
    vibrate: 500,
    title: 'Hello',
    body: 'Test Notification',
    big_text: 'i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large',
    priority: "high",
    sound: "bell.mp3",
    large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
    show_in_foreground: true,
    group: 'test',
    number: 10
  });
};

export const scheduleLocalNotification = () => {
    FCM.scheduleLocalNotification({
      id: 'testnotif',
      fire_date: new Date().getTime()+5000,
      vibrate: 500,
      title: 'Hello',
      body: 'Test Scheduled Notification',
      sub_text: 'sub text',
      priority: "high",
      large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
      show_in_foreground: true,
      picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
      wake_screen: true
    });
  };

export const sendRemoteNotification = (token) => {
      let body;

      if (Platform.OS === 'android') {
        body = {
          "to": token,
        	"data":{
  					"custom_notification": {
  						"title": "Simple FCM Client",
  						"body": "This is a notification with only NOTIFICATION.",
  						"sound": "default",
  						"priority": "high",
  						"show_in_foreground": true
          	}
      		},
      		"priority": 10
        };
      } else {
  			body = {
  				"to": token,
  				"notification":{
  					"title": "Simple FCM Client",
  					"body": "This is a notification with only NOTIFICATION.",
  					"sound": "default"
  				},
  				"priority": 10
  			}
  		}

      firebaseClient.send(JSON.stringify(body), "notification");
    }

export const sendRemoteData = (token, dataContent) => {

      let body = {
      	"to": token,
        "data":dataContent,
      	"priority": "normal",
         "content_available": true
      }
      ////console.log('[fcm_api] sendRemoteData body=',body);

      firebaseClient.send(JSON.stringify(body), "data");
    }
export const sendRemoteNotif = (token, dataContent) => {
      let body = {
      	"to": token,
        "notification":dataContent,
      	"priority": "normal",
         "content_available": true
      }
      ////console.log('[fcm_api] sendRemoteNotif body=',body);


      firebaseClient.send(JSON.stringify(body), "data");
    }

export const sendRemoteNotificationWithData = (token) => {
    let body = {
      "to": token,
      "notification":{
    		"title": "Simple FCM Client",
    		"body": "This is a notification with NOTIFICATION and DATA (NOTIF).",
				"sound": "default"
    	},
    	"data":{
    		"hello": "there"
    	},
    	"priority": "high"
    }

    firebaseClient.send(JSON.stringify(body), "notification-data");
  }
