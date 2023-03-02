import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";
import Title from "../components/Title";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { DataContext } from "../context/DataContext";
import { AudioContext } from "../context/AudioProvider";
import { handleAudioPress } from "../misc/audioController";
import PlayerMini from "../components/PlayerMini";

const RECENT = "RECENT";

const Recent = () => {
  const contextType = useContext(AudioContext);
  const context = useContext(DataContext);
  const [listRecent, setListRecent] = useState([]);

  const readRecent = async () => {
    try {
      const value = await AsyncStorage.getItem(RECENT);
      if (value !== null) {
        setListRecent(JSON.parse(value).map((item) => item.id));
      }
    } catch (e) {
      await AsyncStorage.setItem(RECENT, JSON.stringify([]));
      alert("Failed to fetch the RECENT from storage");
    }
  };

  // Xoá tất cả bài hát khỏi danh sách yêu thích
  const deleteAllSongFromRecent = async () => {
    try {
      await AsyncStorage.setItem(RECENT, JSON.stringify([]));
      setListRecent([]);
    } catch (e) {
      Alert.alert("Failed to delete the item from the RECENT");
    }
  };

  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();

  useEffect(() => {
    readRecent();
    // console.log("refresh RECENT PAGE");
  }, [isFocused]);

  // lọc bài hát phát gần đây
  const recentData = listRecent.map((item) => {
    return {
      id: item,
      name: context.data[item].name,
      singer: context.data[item].singer,
      uri: context.data[item].uri,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />

      {/* Title */}
      <Title title={"Nghe gần đây"} />

      {/* Danh sách bài hát */}
      {recentData.length === 0 ? (
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
        data={recentData}
        renderItem={({ item }) => (
          <SongItem info={item} onAudioPress={() => { handleAudioPress(item, recentData, contextType) }} />
        )}
        keyExtractor={(item) => item.id}
      />
      {recentData.length !== 0 && (
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
                "XÓA LỊCH SỬ NGHE",
                "Bạn muốn xóa tất cả bài hát khỏi danh sách nghe gần đây?",
                [
                  {
                    text: "Không",
                    onPress: () => console.log("Cancelled"),
                  },
                  {
                    text: "OK",
                    onPress: () => deleteAllSongFromRecent(),
                  },
                ]
              );
            }}
          >
            Xoá lịch sử nghe
          </Text>
        </View>
      )}
      {contextType.soundObj !== null && <PlayerMini ></PlayerMini>}
    </SafeAreaView>
  );
};

export default Recent;

const styles = StyleSheet.create({});
