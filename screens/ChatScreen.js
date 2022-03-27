import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { db, auth } from "../firebase";

import * as firebase from "firebase";

import { FieldValue } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            rounded
            source={{ uri: messages[0]?.data.photoURL }}
            style={styles.avt}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = () => {
    if (input.length > 0) {
      Keyboard.dismiss();
      db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
      setInput("");
    } else {
      Keyboard.dismiss();
      setInput("");
    }
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id}>
                    <Text style={styles.displayName}>{data.displayName}</Text>
                    <View style={styles.reciever}>
                      <View>
                        <Image
                          rounded
                          source={require("../asset/img/avt.jpg")}
                          style={styles.avtChat}
                        />
                      </View>
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  </View>
                ) : (
                  <View key={id}>
                    <Text style={styles.displayNameSender}>
                      {data.displayName}
                    </Text>
                    <View style={styles.sender}>
                      <View>
                        <Image
                          rounded
                          source={require("../asset/img/avt.jpg")}
                          style={styles.avtChatsender}
                        />
                      </View>
                      <Text style={styles.senderText}>{data.message}</Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Type somethings"
                style={styles.input}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={20} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 20 },
  reciever: {
    padding: 10,
    backgroundColor: "#FFA925",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 30,
    maxWidth: "80%",
    position: "relative",
    marginRight: 20,
  },
  avtChat: {
    height: 30,
    width: 30,
    bottom: -50,
    right: -15,
    borderRadius: 15,
    position: "absolute",
  },
  avtChatsender: {
    height: 30,
    width: 30,
    bottom: -50,
    left: -15,
    borderRadius: 15,
    position: "absolute",
  },
  sender: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 30,
    maxWidth: "80%",
    position: "relative",
    marginLeft: 20,
  },
  avt: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  input: {
    bottom: 0,
    height: 50,
    flex: 1,
    marginRight: 15,
    padding: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    color: "grey",
  },
  recieverName: {
    color: "#FFA925",
    position: "absolute",
    top: -20,
    alignSelf: "flex-end",
    paddingRight: 20,
  },
  displayName: {
    fontSize: 13,
    fontWeight: "bold",
    paddingBottom: 5,
    alignSelf: "flex-end",
    marginRight: 30,
  },
  displayNameSender: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  senderText: {
    paddingLeft: 20,
    textAlign: "right",
  },
  recieverText: {
    paddingRight: 20,
    textAlign: "left",
  },
});
