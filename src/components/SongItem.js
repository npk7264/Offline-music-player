import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Audio } from "expo-av";

const SongItem = ({ info }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 60,
        paddingVertical: 5,
        paddingHorizontal: 20,
        justifyContent: "space-around",
      }}
      onPress={() => {
        navigation.navigate("Player", { info });
      }}
    >
      <Text style={{ fontSize: 18 }}>{info.name}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>{info.singer}</Text>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({});
