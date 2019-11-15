import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from 'react-navigation' 

class MaterialButtonViolet extends Component {
  render() {
    return (
      // <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this.props.navigation.navigate('ScreenEmailconfirm')}>
      <TouchableOpacity style={[styles.container, styles.ButtonViolet, this.props.style]} onPress={this.props.onPress}>
        <Text style={styles.caption}>{this.props.title || 'Sign Up'}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0,
    shadowRadius: 5
  },
  caption: {
    color: "#fff",
    fontSize: 16
  },
  ButtonViolet: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    // top: '70.05%',
    // position: 'absolute'
  }
});
export default withNavigation(MaterialButtonViolet)
