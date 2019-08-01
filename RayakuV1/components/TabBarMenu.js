import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
}
from 'react-native';
import { TabBar } from 'react-native-tab-view';
import {
  Actions
} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

const new_message = require('../assets/images/new_message.png');
const icon_back = require('../assets/images/new_message.png');
const nearby_icon_activated_standby = require('../assets/images/nearby_icon_activated_standby.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  tab: {
    padding: 0,
    backgroundColor: 'green'
  },
  indicator2: {
    backgroundColor: '#0084ff',
    borderRadius: 2,
  },
  iconFocus: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  iconBlur: {
    flex: 1,
    backgroundColor: '#FD5B31',
    width: '100%'
  }
});

class TabBarMenu extends React.Component {
  _renderIcon(route) {
    // ////console.log('route===>', route);
    if (route.index === 0) {
      return (
        <View>
          <Image
          source={nearby_icon_activated_standby}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain'
          }}
          />
        </View>
      );
    }
  }
  _renderIndicator(props) {
    const { width, position, navigationState } = props;
    const navIndex = navigationState.index;

    // ////console.log('_renderIndicator==>', props);
    const translateX = Animated.multiply(position, width);
    if (navIndex === 0) {
      return (
        <Animated.View
          style={[styles.container, { width, transform: [{ translateX }] }]}
        >
          <View style={styles.indicator} />
        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={[
          styles.container,
          {
            width,
            transform: [{ translateX }],
            borderBottomWidth: 4,
            borderBottomColor: '#fff',
          }
        ]}
      />
    );
  }
  _tabStyle() {
    // ////console.log('_tabStyle==>', this.props);
    return styles.tab;
  }
  render() {
    // ////console.log('TabBarMenu==>', this.props.navigationState.index);
    // ////console.log('TabBarMenu==>', this.props.navigationState.index);
    const index = this.props.navigationState.index;
    let title = '';
    //const tabStyle = {
    // backgroundColor: 'green'
    //}
    if (index === 0) {
      title = 'Nearby';
    }
    if (index > 0) {
      title = this.props.routes[this.props.navigationState.index].title;
    }


    return (
      <View style={{ elevation: 4, marginBottom: 6 }}>

        <LinearGradient
            colors={['#FD5B31', '#E82F14']}
            style={styles.linearGradient}
            start={{ x: 1.0, y: 0.5 }}
            end={{ x: 0.0, y: 1.0 }}
        >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            height: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            //backgroundColor: 'red',
            alignItems: 'flex-end'
        }}
        >
          <View
            style={{
              justifyContent: 'center',
              //backgroundColor: 'green',
              width: 60,
              height: 55
            }}
          >
            <TouchableOpacity
                onPress={() => { Actions.pop(); }}
                underlayColor="#114D44"
                style={{
                  flex: 1,
                  // backgroundColor: 'blue',
                  alignItems: 'center'
                }}
            >
              <Image
              style={{
                flex: 1,
                aspectRatio: 0.6,
                resizeMode: 'contain',
                // backgroundColor: 'green'
              }}
              source={icon_back}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 60,
              justifyContent: 'center',
              //backgroundColor: 'green'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }} >{title}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              //backgroundColor: 'green',
              width: 60,
              height: 55
            }}
          >
            <TouchableOpacity
                onPress={() => { Actions.newChatScreen(); }}
                underlayColor="#114D44"
                style={{
                  flex: 1,
                  // backgroundColor: 'blue',
                  alignItems: 'center'
                }}
            >
              <Image
              style={{
                flex: 1,
                aspectRatio: 0.6,
                resizeMode: 'contain',
                // backgroundColor: 'green'
              }}
              source={new_message}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TabBar
          {...this.props}
          indicatorStyle={{ backgroundColor: '#fff' }}
          // renderIndicator={this._renderIndicator.bind(this)}
          renderIcon={this._renderIcon.bind(this)}
          style={{ backgroundColor: '#transparent', elevation: 0 }}
        />

        </LinearGradient>
      </View>
    );
  }
}

export default TabBarMenu;
