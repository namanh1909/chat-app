import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";

import { auth, db } from "../firebase";

export default function HomeScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubcribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubcribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: {
        backgroundColor: "#ffff",
      },
      headerLeft: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
              style={{ height: 25, width: 25, borderRadius: 21 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginLeft: 20, flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Ionicons name="log-out-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
            style={{ marginHorizontal: 5 }}
          >
            <Ionicons name="mail-open-outline" size={25} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = ( id , chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    })
  }

  return (
    <View
      contentContainerStyle={{
        height: 80,
        justifyContent: "center",
        marginHorizontal: 10,
      }}
    >
      {chats.map(({ id, data: { chatName } }) => (
        <ListItem data={chats} id={id} chatName={chatName} key={id} enterChat={enterChat } />
      ))}
    </View>
  );
}
