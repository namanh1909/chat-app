import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const ListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([""]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);

  return (
    <TouchableOpacity onPress={() => enterChat(id, chatName)} key={id}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri:
                  chatMessages?.[0]?.photoURL ||
                  "http://cdn.onlinewebfonts.com/svg/img_227643.png",
              }}
              style={styles.avt}
            />
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.name} numberOfLines={1}>
                {chatName}
              </Text>
              <Text
                style={styles.message}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "center",
    marginHorizontal: 10,
    width: "80%",
  },
  avt: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFA925",
  },
  time: {
    color: "#D4D4D4",
    fontSize: 14,
    fontWeight: "bold",
  },
  boxCount: {
    alignItems: "flex-end",
    width: 20,
    height: 20,
    backgroundColor: "#FFA925",
    borderRadius: 10,
  },
  count: {
    fontSize: 12,
    justifyContent: "center",
    alignSelf: "center",
    height: 20,
    fontWeight: "bold",
    marginVertical: 1,
    color: "white",
  },
});
