import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from 'react-navigation' 

class MaterialButtonViolet1 extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this.props.navigation.replace('DrawerMenuNavigator')}>
        <Text style={styles.caption}>Ok</Text>
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
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
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
    fontSize: 20
  }
});
export default withNavigation(MaterialButtonViolet1)
