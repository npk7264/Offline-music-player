import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";

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
      <View style={{ height: 70, backgroundColor: "#333", justifyContent: 'center', alignItems: "center" }}>
        <Slider
          style={styles.progressBar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="red"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#FFF"
          onSlidingComplete={() => { }}
        ></Slider>
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>00:00</Text>
          <Text style={styles.progressLabelText}>00:00</Text>
        </View>
      </View>
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
  progressBar: {
    width: 350,
    height: 40,
    flexDirection: 'row'
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLabelText: {
    color: '#fff',
    fontWeight: '500'
  },

});
