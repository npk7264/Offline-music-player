import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import Home from "./screens/Home";
import Player from "./screens/Player";
import Footer from "./components/Footer";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Footer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="Footer" component={Footer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
