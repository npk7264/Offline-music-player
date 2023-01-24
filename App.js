import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import BottomMenu from "./src/components/BottomMenu";
import Player from "./src/screens/Player";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomMenu"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomMenu" component={BottomMenu} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}