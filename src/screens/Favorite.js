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

const Favorite = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />

      {/* Title */}
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "#ccc",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "500" }}>
          Bài hát yêu thích
        </Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        style={{ flex: 1 }}
        data={songData}
        renderItem={({ item }) => <SongItem info={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
