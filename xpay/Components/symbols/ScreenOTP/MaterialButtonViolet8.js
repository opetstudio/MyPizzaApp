import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from 'react-navigation' 

class MaterialButtonViolet8 extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.root, this.props.style]} onPress={() => this.props.navigation.navigate('ScreenSuccessBind')}>
        <Text style={styles.caption}>Request OTP</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "rgba(208,2,27,1)",
    fontSize: 20,
    fontFamily: "roboto-regular",
    fontWeight: "200"
  }
});
export default withNavigation(MaterialButtonViolet8)