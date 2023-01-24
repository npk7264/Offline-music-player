import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const MusicController = () => {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: "#ccc",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity style={styles.controllerItem}></TouchableOpacity>
      <TouchableOpacity style={styles.controllerItem}></TouchableOpacity>
      <TouchableOpacity style={styles.controllerItem}></TouchableOpacity>
    </View>
  );
};

export default MusicController;

const styles = StyleSheet.create({
  controllerItem: { width: 50, height: 50, backgroundColor: "#333" },
});