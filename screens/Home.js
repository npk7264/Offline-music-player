import { StatusBar } from "expo-status-bar";
import React, { useState, Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World!</Text>
    </View>
  );
};

export default Home