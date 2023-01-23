import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
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
    </SafeAreaView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: "10%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
