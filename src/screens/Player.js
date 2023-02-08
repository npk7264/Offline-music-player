import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Easing,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import BackBar from "../components/BackBar";
import MusicController from "../components/MusicController";
import SongItem from "../components/SongItem";
import { songData } from "../../data/songData";

// route: dữ liệu được navigate tới
const Player = ({ route }) => {
  const playlist = route.params.songdata;
  const song = route.params.info;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <BackBar />

      {/* Tiêu đề trang */}
      <View style={styles.title}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Nghe nhạc</Text>
      </View>

      {/* Hình ảnh */}
      <View
        style={{
          width: "100%",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.imagePlayer}></View>
      </View>
      <MusicController
        idMusicClick={playlist
          .map((item) => {
            return item.id;
          })
          .indexOf(song.id)}
        songdata={playlist}
      />
      <FlatList
        data={playlist}
        renderItem={({ item }) => <SongItem info={item} songdata={playlist} />}
        keyExtractor={(item) => item.id}
      />
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
    justifyContent: "center",
    alignItems: "center",
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
