import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Label({ text, labelStyle }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: "#4C555A",
    fontWeight: "bold",
  },
});
