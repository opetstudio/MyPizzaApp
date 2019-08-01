import React from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../../../styles/NavBar.style';

class NavbarMiddleNearby extends React.Component {
    render() {
        return (
            <View style={[styles.middle]}>
                <Text style={styles.middleText}>Nearby</Text>
            </View>
        );
    }
}

export default NavbarMiddleNearby;
