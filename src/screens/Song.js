import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";
import { songData } from "../../data/songData";
import PlayerMini from "../components/PlayerMini";

const Song = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />

      {/* Title */}
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#ccc",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Bài hát</Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        data={songData}
        renderItem={({ item }) => <SongItem info={item} songdata={songData} />}
        keyExtractor={(item) => item.id}
      />
      <PlayerMini></PlayerMini>
    </SafeAreaView>

  );
};

export default Song;

const styles = StyleSheet.create({});
