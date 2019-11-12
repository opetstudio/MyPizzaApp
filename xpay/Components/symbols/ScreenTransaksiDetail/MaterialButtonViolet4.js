import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Center } from "@builderx/utils";
import Icon from "@builderx/icons";

export default class MaterialButtonViolet4 extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.root, this.props.style]}>
        <Center vertical>
          <Text style={styles.text}>Bank Mandiri</Text>
        </Center>
        <Icon
          type={"Ionicons"}
          name={"md-arrow-dropdown"}
          style={styles.icon}
        />
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
  text: {
    left: 8.2,
    color: "#121212",
    position: "absolute"
  },
  icon: {
    position: "absolute",
    color: "grey",
    fontSize: 40,
    top: "-5.56%",
    right: 6
  }
});
