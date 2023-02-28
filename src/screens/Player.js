import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import React, { useContext } from "react";

import BackBar from "../components/BackBar";
import MusicController from "../components/MusicController";
import Title from "../components/Title";


// route: dữ liệu được navigate tới
const Player = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <BackBar />

      {/* Tiêu đề trang */}
      <Title title={"Nghe nhạc"} />

      {/* Hình ảnh */}
      <View
        style={{
          width: "100%",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.imagePlayer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/disc_img.png")}
          />
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
