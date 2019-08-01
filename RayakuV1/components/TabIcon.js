import React, {
} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  Platform,
  StyleSheet
} from 'react-native';

const icon_nearby = require('../assets/images/nearby_icon_activated_standby.png');
const icon_phone = require('../assets/images/bottom-nav-calls.png');
const icon_msg = require('../assets/images/bottom-nav-messages.png');
const icon_set = require('../assets/images/bottom-nav-settings.png');

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  tabBarLabel: PropTypes.string //activeColor: PropTypes.string,
  //inactiveColor: PropTypes.string
};

const styles = StyleSheet.create({
  iconTab: {
    height: 25,
    width: 25
  }
});

const TabIcon = (props) => {
  // ////console.log('');
    // ////console.log('Props.tabBarLabel:', props.tabBarLabel);
    //////console.log('Props.activeColor:', props.activeColor);
    //////console.log('Props.inactiveColor:', props.inactiveColor);
    if (props.tabBarLabel === 'Nearby') {
      return (
        <Image
          source={icon_nearby}
          style={styles.iconTab}
          resizeMode='contain'
        />
      );
    } else if (props.tabBarLabel === 'Calls') {
      return (
        <Image
          source={icon_phone}
          //style={{ height: 25, width: 25, tintColor: props.focused ? '#FD5B31' : '#000' }}
          style={[styles.iconTab, { tintColor: props.focused ? '#FD5B31' : '#000' }]}
          resizeMode='contain'
        />
      );
    } else if (props.tabBarLabel === 'Messages') {
      return (
        <Image
          source={icon_msg}
          //style={{ height: 25, width: 25, tintColor: props.focused ? '#FD5B31' : '#000' }}
          style={[styles.iconTab, { tintColor: props.focused ? '#FD5B31' : '#000' }]}
          resizeMode='contain'
        />
      );
    } else if (props.tabBarLabel === 'Settings') {
      return (
        <Image
          source={icon_set}
          //style={{ height: 25, width: 25, tintColor: props.focused ? '#FD5B31' : '#000' }}
          style={[styles.iconTab, { tintColor: props.focused ? '#FD5B31' : '#000' }]}
          resizeMode='contain'
        />
      );
    }
      if (Platform.OS === 'android') {
        return (
            <Text
              style={{ color: props.focused ? '#FFF' : '#FFFFFF80', width: null }}
            >{props.tabBarLabel}</Text>
        );
      }
      if (Platform.OS === 'ios') {
        return (
            <Text
              style={{
                color: props.focused ? '#E83014' : '#1F1F1F50',
                width: null,
                fontWeight: props.focused ? 'bold' : null }}
            >{props.tabBarLabel}</Text>
        );
      }
};

TabIcon.propTypes = propTypes;

export default TabIcon;
