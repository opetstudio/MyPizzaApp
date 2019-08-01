import React from 'react';
import { WebView } from 'react-native';

const url_privacy = 'https://www.rayaku.id/privacy-policy.html';

class WebViewPrivacy extends React.Component {
    render() {
        return (
            <WebView
                source={{
                uri: url_privacy,
                }}
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
            />
            );
    }
}
export default WebViewPrivacy;