import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";

import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT = "RECENT";

const Recent = () => {
  const [listRecent, setListRecent] = useState([]);

  const readRecent = async () => {
    try {
      const value = await AsyncStorage.getItem(RECENT);
      if (value !== null) {
        setListRecent(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the RECENT from storage");
    }
  };

  useEffect(() => {
    readRecent();
  }, [listRecent]);

  // lọc bài hát phát gần đây
  const recentData = listRecent.map((item) => {
    return {
      id: item,
      name: songData[item].name,
      singer: songData[item].singer,
    };
  });

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
        <Text
          style={{ fontSize: 30, fontWeight: "500" }}
        >
          Bài hát gần đây
        </Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        style={{ flex: 1 }}
        data={recentData}
        renderItem={({ item }) => <SongItem info={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Recent;

const styles = StyleSheet.create({});
