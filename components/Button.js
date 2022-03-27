import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ text, onPress, color, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#99D669",
    borderRadius: 27,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
