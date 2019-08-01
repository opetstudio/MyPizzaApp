import React from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../../../styles/NavBar.style';

class NavbarMiddleDefault extends React.Component {
    render() {
        return (
            <View style={[styles.middle]}>
                <Text style={styles.middleText}>{ this.props.title }</Text>
            </View>
        );
    }
}

export default NavbarMiddleDefault;
