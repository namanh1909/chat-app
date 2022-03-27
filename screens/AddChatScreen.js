import { StyleSheet, Text, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {}, []);

  const createChat = async () => {
    if (input.length > 0) {
      await db
        .collection("chats")
        .add({
          chatName: input,
        })
        .then(() => navigation.goBack())
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("enter the chat name ");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Input
          nameIcon="chatbubbles-outline"
          onChangeText={(text) => setInput(text)}
          placeholderText="Enter a chat name"
          onSubmitEditing={createChat}
        />
      </View>
      <Button text="Create Chat" color="#FFA925" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
