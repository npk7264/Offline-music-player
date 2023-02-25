import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
// import SongItem from "../components/SongItem";
import Title from "../components/Title";

import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-web";

const FAVORITE = "FAVORITE";

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const navigation = useNavigation();

  // component songitem
  const SongItem = ({ info, songdata }) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 60,
          paddingTop: 5,
          paddingHorizontal: 20,
          justifyContent: "space-around",
        }}
        // sự kiện nhấn để nghe
        onPress={() => {
          navigation.navigate("Player", { info, songdata });
        }}
        // sự kiện nhấn giữ để xóa
        onLongPress={() => {
          Alert.alert(
            "XÓA BÀI HÁT",
            "Bạn muốn xóa bài hát khỏi danh sách yêu thích?",
            [
              {
                text: "Không",
                onPress: () => console.log("Cancelled"),
              },
              {
                text: "OK",
                onPress: () => deleteSong(info.id),
              },
            ]
          );
        }}
      >
        <View
          style={{
            height: "100%",
            borderBottomWidth: 0.5,
            borderColor: "#ccc",
          }}
        >
          <Text style={{ fontSize: 18 }} numberOfLines={1}>
            {info.name}
          </Text>
          <Text style={{ fontSize: 16, color: "gray" }}>{info.singer}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

  // xóa bài hát khỏi danh sách phát
  const deleteSong = async (item) => {
    try {
      const newFavoriteList = favoriteList.filter((i) => i !== item);
      await AsyncStorage.setItem(FAVORITE, JSON.stringify(newFavoriteList));
      setFavoriteList(newFavoriteList);
    } catch (e) {
      Alert.alert("Failed to delete the item from the FAVORITE");
    }
  };

  // Xoá tất cả bài hát khỏi danh sách yêu thích
  const deleteAllSongFromFavorite = async () => {
    try {
      await AsyncStorage.setItem(FAVORITE, JSON.stringify([]));
      setFavoriteList([]);
    } catch (e) {
      Alert.alert("Failed to delete the item from the FAVORITE");
    }
  };

  const favoriteData = favoriteList.map((item) => {
    return {
      id: item,
      name: songData[item].name,
      singer: songData[item].singer,
      uri: songData[item].uri,
    };
  });

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
      <Title title={"Bài hát yêu thích"} />

      {/* Danh sách bài hát */}
      {favoriteData.length === 0 ? (
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "gray" }}>Chưa có dữ liệu</Text>
        </View>
      ) : null}
      <FlatList
        style={{ flex: 1 }}
        // lọc bài hát yêu thích từ songData
        data={favoriteData}
        renderItem={({ item }) => (
          <SongItem info={item} songdata={favoriteData} />
        )}
        keyExtractor={(item) => item.id}
      />
      {favoriteData.length !== 0 && (
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 24, color: "gray" }}
            onPress={() => {
              Alert.alert(
                "XÓA BÀI HÁT",
                "Bạn muốn xóa tất cả bài hát khỏi danh sách yêu thích?",
                [
                  {
                    text: "Không",
                    onPress: () => console.log("Cancelled"),
                  },
                  {
                    text: "OK",
                    onPress: () => deleteAllSongFromFavorite(),
                  },
                ]
              );
            }}
          >
            Xoá tất cả
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
