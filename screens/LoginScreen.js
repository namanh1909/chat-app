import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubcribe;
  }, []);

  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 16, marginBottom: 26 }}>
        <Label text="Đăng nhập" />
      </View>
      <Input
        nameIcon="person-outline"
        placeholderText="Tên đăng nhập"
        value={emailField}
        onChangeText={(text) => setEmailField({ text })}
        type="email"
        keyboardType={"phone-pad"}
      />
      <View style={{ marginTop: 15, marginBottom: 28 }}>
        <Input
          nameIcon="lock-closed-outline"
          placeholderText="Mật khẩu"
          value={passwordField}
          onChangeText={(text) => setPasswordField({ text })}
          secureTextEntry={true}
          type="password"
        />
      </View>
      <Button
        text="Đăng nhập"
        color="#99D669"
        onPress={() => login(emailField.text, passwordField.text)}
      />
      <View style={{ flexDirection: "row", marginTop: 31 }}>
        <Text style={{ color: "#8FA28F", fontSize: 16, fontWeight: "300" }}>
          Chưa có tài khoản?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#99D669",
              paddingLeft: 5,
            }}
          >
            Đăng kí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAF8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
