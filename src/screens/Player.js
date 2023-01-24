import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import BackBar from "../components/BackBar";
import MusicController from "../components/MusicController";

// route: dữ liệu được navigate tới
const Player = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <BackBar />

      <View style={styles.title}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Nghe nhạc</Text>
      </View>

      <View style={styles.songInfo}>
        <Text style={{ fontSize: 25 }}>{route.params.info.name}</Text>
        <Text style={{ fontSize: 20, color: "gray" }}>
          {route.params.info.singer}
        </Text>
      </View>

      <View style={styles.imagePlayer}></View>

      <View style={{ height: 60 }}></View>
      <View style={{ height: 60, backgroundColor: "#333" }}></View>
      <MusicController />
    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 60,
    backgroundColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  songInfo: {
    height: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imagePlayer: {
    width: 250,
    height: 250,
    backgroundColor: "#4D8D6E",
    alignSelf: "center",
    borderRadius: 250 / 2,
  },
});
