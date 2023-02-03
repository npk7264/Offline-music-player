import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaylistItem = ({ name, screen, songID }) => {
  const [songInPlaylist, setSongInPlaylist] = useState([]);

  // lưu bài hát vào playlist
  const saveSongToPlaylist = async () => {
    try {
      if (songInPlaylist.includes(songID) == false) {
        await AsyncStorage.setItem(
          name,
          JSON.stringify([...songInPlaylist, songID])
        );
        alert("Đã thêm bài hát vào playlist");
      } else alert("Bài hát đã có trong playlist này");
    } catch (e) {
      alert("Failed to save the PLAYLIST SONG to the storage");
    }
  };
  // đọc danh sách bài hát từ playlist
  const readSongFromPlaylist = async () => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        setSongInPlaylist(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST SONG from storage");
    }
  };

  useEffect(() => {
    readSongFromPlaylist();
  }, []);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.playlistItem}
      onPress={() => {
        // lưu bài hát vào playlist nếu playlist item thuộc playlistmodal
        if (screen == "AddPlaylist") {
          saveSongToPlaylist();
        }
        //
        else navigation.navigate("DetailPlaylist", { name });
      }}
    >
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({
  playlistItem: {
    width: "100%",
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
});
