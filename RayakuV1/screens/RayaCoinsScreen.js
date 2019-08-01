import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  width,
  Image,
  Platform
} from 'react-native';

import RayaCoinsContainer from '../containers/RayaCoinsContainer';
import MyAchievementsContainer from '../containers/MyAchievementsContainer';
import Achievements from '../components/Achievements'

import styles from '../styles/RayaCoins.style';

class RayaCoinsScreen extends React.Component {
  componentWillMount() {
    console.log('RayaCoinsScreen routerflux component componentWillMount');
  }
  render() {
    return (
      <View style={styles.container}>
        <RayaCoinsContainer/>
        <View style={styles.desc}>
          <Text style={styles.textDesc}>Earn More Points by actively using RayakuApp.</Text>
          <Text style={styles.textDesc}>Trade your coin with someone rewards later.</Text>
          <Text style={styles.linkingText} onPress={() => Linking.openURL('http://google.com')}>
            Learn More about Raya Coin
          </Text>
        </View>
        <View style={styles.Achievements}>
            <View>
                <Text style={styles.titleAchievement}>My Achievements</Text>
            </View>
            <View style = {styles.lineStyle} />
        </View>
        <MyAchievementsContainer />
      </View>
    );
  }
}
export default RayaCoinsScreen;
