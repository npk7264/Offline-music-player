import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import BottomMenu from "./src/components/BottomMenu";
import Player from "./src/screens/Player";
import Search from "./src/screens/Search";
import DetailPlaylist from "./src/screens/DetailPlaylist";
import AudioProvider from "./src/context/AudioProvider";
import { DataProvider } from "./src/context/DataContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <AudioProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="BottomMenu"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="BottomMenu" component={BottomMenu} />
            <Stack.Screen name="Player" component={Player} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="DetailPlaylist" component={DetailPlaylist} />
          </Stack.Navigator>
        </NavigationContainer>

      </AudioProvider>
    </DataProvider>
  );
}
