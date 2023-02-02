import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const PlaylistItem = ({ name }) => {
  return (
    <TouchableOpacity style={styles.playlistItem}>
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({
  playlistItem: {
    width: "100%",
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
});
