import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "@builderx/icons";
import { withNavigation } from 'react-navigation' 

class MaterialIconButtonsFooter extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TouchableOpacity style={styles.buttonWrapper1} onPress={() => this.props.navigation.navigate('ScreenScanThisQR')} >
          <Icon
            name={'qrcode'}
            type={'MaterialCommunityIcons'}
            style={styles.icon1}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper2} onPress={() => this.props.navigation.navigate('ScreenQr')}>
          <Icon
            name={"crop-free"}
            type={"MaterialCommunityIcons"}
            style={styles.activeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper3} onPress={() => this.props.navigation.navigate('ScreenHome')} >
          <Icon
            name={"logout"}
            type={"MaterialCommunityIcons"}
            style={styles.icon3}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3f51b5",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  buttonWrapper1: {
    flex: 1,
    alignItems: "center",
    minWidth: 80,
    maxWidth: 168
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 40,
    opacity: 0.8
  },
  buttonWrapper2: {
    flex: 1,
    alignItems: "center",
    minWidth: 80,
    maxWidth: 168
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 40,
    opacity: 1
  },
  buttonWrapper3: {
    flex: 1,
    alignItems: "center",
    minWidth: 80,
    maxWidth: 168
  },
  icon3: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 40,
    opacity: 0.8
  }
});
export default withNavigation(MaterialIconButtonsFooter)
