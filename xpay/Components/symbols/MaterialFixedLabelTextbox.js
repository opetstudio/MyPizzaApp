import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default class MaterialFixedLabelTextbox extends Component {
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput onChangeText={(v) => this.props.onChangeText(this.props.name, v)} style={styles.inputStyle}
          placeholder={this.props.placeholder}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  label: {
    color: "#000",
    alignSelf: "flex-start",
    opacity: 1,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 16
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 30,
    fontSize: 16,
    lineHeight: 16
  }
});
