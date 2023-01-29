import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

import BackBar from "../components/BackBar";
import MusicController from "../components/MusicController";

// route: dữ liệu được navigate tới
const Player = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <BackBar />

      {/* Tiêu đề trang */}
      <View style={styles.title}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Nghe nhạc</Text>
      </View>

      {/* Thông tin nhạc */}
      <View style={styles.songInfo}>
        <Text style={{ fontSize: 25 }}>{route.params.info.name}</Text>
        <Text style={{ fontSize: 20, color: "gray" }}>
          {route.params.info.singer}
        </Text>
      </View>

      {/* Hình ảnh */}
      <View style={styles.imagePlayer}></View>

      {/* Thanh tiến trình phát nhạc */}
      {/* <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Slider
          style={styles.progressBar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="red"
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000"
          onSlidingComplete={() => {}}
        ></Slider>
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>00:00</Text>
          <Text style={styles.progressLabelText}>00:00</Text>
        </View>
      </View> */}

      {/* Thanh điều khiển, truyền vào id của bài hát click vào */}
      <MusicController idMusicClick={route.params.info.id} />
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
    flexDirection: "row",
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#000",
    fontWeight: "500",
  },
});