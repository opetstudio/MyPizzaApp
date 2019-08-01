import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Platform,

} from 'react-native';

export default class Achievements extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.achievementsList}>
                    <View>
                        <Text style={styles.title}>Signed Up</Text>
                    </View>

                    <View style={styles.right}>
                        <Text style={styles.rightText}>+10 Points</Text>
                    </View>
                </View>
            </View>
        );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.85,
            // paddingVertical: (Platform.OS === 'ios') ? 5 : 0,
        paddingHorizontal: (Platform.OS === 'ios') ? 20 : 20,
    },
    title: {
        fontSize: 14,
    },
    achievementsList: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    right: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightText:{
        fontWeight: '700',
        color: '#1b90fb',
    }
  })
  