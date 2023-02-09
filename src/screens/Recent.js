import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { useIsFocused } from "@react-navigation/native";
>>>>>>> e93a8d1f3b9cedae0bb20efff51cd006ac69fea4

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

<<<<<<< HEAD
  useEffect(() => {
    readRecent();
  }, [listRecent]);
=======
  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();

  useEffect(() => {
    readRecent();
    // console.log("refresh RECENT PAGE");
  }, [isFocused]);
>>>>>>> e93a8d1f3b9cedae0bb20efff51cd006ac69fea4

  // lọc bài hát phát gần đây
  const recentData = listRecent.map((item) => {
    return {
      id: item,
      name: songData[item].name,
      singer: songData[item].singer,
<<<<<<< HEAD
=======
      uri: songData[item].uri,
>>>>>>> e93a8d1f3b9cedae0bb20efff51cd006ac69fea4
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
          onPress={() => {
            alert(JSON.stringify(recentData));
          }}
        >
          Bài hát gần đây
        </Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        style={{ flex: 1 }}
        data={recentData}
<<<<<<< HEAD
        renderItem={({ item }) => <SongItem info={item} />}
=======
        renderItem={({ item }) => (
          <SongItem info={item} songdata={recentData} />
        )}
>>>>>>> e93a8d1f3b9cedae0bb20efff51cd006ac69fea4
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Recent;

const styles = StyleSheet.create({});
