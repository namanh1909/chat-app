import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
export default function Input({
  nameIcon,
  placeholderText,
  value,
  onChangeText,
  secureTextEntry,
  type,
  onSubmitEditing,
}) {
  return (
    <View style={[styles.container, { opacity: 0.3 }]}>
      <Ionicons
        name={nameIcon}
        size={19}
        color="#8FA28F"
        style={styles.icon}
        opacity={0.5}
      />
      <TextInput
        style={styles.Input}
        placeholder={placeholderText}
        placeholderTextColor={"#8FA28F"}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        textContentType={type}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#8FA28F",
    borderRadius: 27,
    borderStyle: "solid",
    shadowColor: "#CDF4AD",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 15,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 23,
    marginTop: 15,
    marginBottom: 13,
    marginRight: 11,
  },
  Input: {
    width: 231,
    height: 20,
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
    color: "black",
    fontWeight: "300",
  },
});
