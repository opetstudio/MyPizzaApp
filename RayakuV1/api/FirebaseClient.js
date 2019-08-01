import FirebaseConstants from "./FirebaseConstants";
import { Alert } from "react-native";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

  async send(body, type) {
    ////console.log('[FirebaseClient] body=', body);
    ////console.log('[FirebaseClient] FirebaseConstants=', FirebaseConstants);
		if(FirebaseConstants.KEY === 'YOUR_API_KEY'){
			// Alert.alert('Set your API_KEY in app/FirebaseConstants.js')
      ////console.log('[FirebaseClient] Set your API_KEY in app/FirebaseConstants.js');

			return;
		}
  	let headers = new Headers({
  		"Content-Type": "application/json",
      "Authorization": "key=" + FirebaseConstants.KEY
  	});

		try {
			let response = await fetch(API_URL, { method: "POST", headers, body });
			////console.log('[FirebaseClient] response=', response);
			try {
				response = await response.json();
				if (!response.success) {
					// Alert.alert('Failed to send notification, check error log')
				}
			} catch (err) {
				// Alert.alert('Failed to send notification, check error log')
			}
		} catch (err) {
      // //console.log('[FirebaseClient] err=', err);

			// Alert.alert(err && err.message)
		}
  }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;
