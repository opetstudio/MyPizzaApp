import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Center } from "@builderx/utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class MaterialCardWithContentAndActionButtons extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={require("../assets/images/cardImage2.png")}
          style={styles.image}
        />
        <Center horizontal>
          <Text style={styles.text}>Julian</Text>
        </Center>
        <Center horizontal>
          <Text style={styles.text2}>My wallet</Text>
        </Center>
        <View style={styles.iconStack}>
          <Icon name="chevron-down" style={styles.icon} />
          <Text style={styles.text3}>IDR 900,000</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(218,55,49,1)",
    alignItems: "center",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  image: {
    width: 103,
    height: 103,
    backgroundColor: "#CCC",
    margin: 62,
    borderRadius: 100
  },
  text: {
    top: 193,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 25,
    fontFamily: "roboto-700"
  },
  text2: {
    top: 231,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 15,
    fontFamily: "roboto-300"
  },
  icon: {
    top: 24,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    left: 51
  },
  text3: {
    top: 0,
    color: "rgba(255,253,84,1)",
    position: "absolute",
    fontSize: 25,
    fontFamily: "helvetica-regular",
    left: 0
  },
  iconStack: {
    top: 255,
    left: 109,
    width: 141,
    height: 64,
    position: "absolute"
  }
});
