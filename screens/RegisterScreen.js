import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [name, setName] = useState({
    text: "",
    errorMessage: "",
  });
  const [imgURL, setImgURL] = useState({
    text: "",
    errorMessage: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name.text,
          photoURL:
            imgURL.text || "http://cdn.onlinewebfonts.com/svg/img_227643.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 16, marginBottom: 26 }}>
        <Label text="Đăng Kí" />
      </View>
      <Input
        nameIcon="person-outline"
        placeholderText="Tên đăng nhập"
        value={name.text}
        onChangeText={(text) => setName({ text })}
      />
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Input
          nameIcon="lock-closed-outline"
          placeholderText="Email"
          value={emailField.text}
          onChangeText={(text) => setEmailField({ text })}
          type="email"
        />
      </View>
      <View style={{ marginBottom: 26 }}>
        <Input
          nameIcon="lock-closed-outline"
          placeholderText="Nhập lại mật khẩu"
          value={passwordField.text}
          onChangeText={(text) => setPasswordField({ text })}
          secureTextEntry={true}
          type="password"
        />
        <TextInput
          placeholder="Image profile"
          value={imgURL.text}
          type="text"
          onChangeText={(text) => setImgURL(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        text="Đăng kí"
        color="#99D669"
        onPress={() => register(emailField.text, passwordField.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAF8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
