import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = ({ title }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "#ccc",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "500" }}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({});
