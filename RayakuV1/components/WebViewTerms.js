import React from 'react';
import { WebView } from 'react-native';

const url_terms = 'https://www.rayaku.id/terms.html';

class WebViewTerms extends React.Component {
    render() {
        return (
            <WebView
                source={{
                uri: url_terms,
                }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
            />
            );
    }
}
export default WebViewTerms;
