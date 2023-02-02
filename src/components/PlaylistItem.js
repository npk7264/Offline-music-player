import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";

const Playlist = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />
      <View style={styles.title}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Danh sách phát</Text>
      </View>

      <TouchableOpacity style={styles.title1}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#333",
            marginRight: 20,
          }}
        ></View>
        <Text style={{ fontSize: 18 }}>Thêm danh sách phát mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 60,
    backgroundColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title1: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
