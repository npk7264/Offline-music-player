import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";

import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE = "FAVORITE";

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);

  const readFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITE);
      if (value !== null && value !== []) {
        setFavoriteList(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();

  useEffect(() => {
    readFavorite();
    // console.log("refresh FAVORITE PAGE");
  }, [isFocused]);

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
        <Text style={{ fontSize: 30, fontWeight: "500" }}>
          Bài hát yêu thích
        </Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        style={{ flex: 1 }}
        // lọc bài hát yêu thích từ songData
        data={songData.filter((item) => {
          return favoriteList.includes(item.id);
        })}
        renderItem={({ item }) => <SongItem info={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
