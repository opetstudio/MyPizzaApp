import React, { Component } from 'react';
import { 
    AppRegistry, 
    SectionList, 
    StyleSheet, 
    Text, 
    View,
    Platform,
 } from 'react-native';

 import navbar from '../styles/NavBar.style';
 import styles from '../styles/RayaCoinsTitle.style';

export default class RayaCoinsTitle extends Component {
    render() {
        return (
            <View style={[styles.container,navbar.dinamicStyle]}>
                <View>
                    <Text style={styles.titleText}>RayaCoin</Text>
                </View>
                <View style={styles.totalCoins}>
                    <Text style={styles.styleTotalcoins}>{this.props.totalcoins}</Text>
                </View>
            </View>
        );
        }
}

  