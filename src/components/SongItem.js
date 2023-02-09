import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Audio } from "expo-av";

const SongItem = ({ info, screen, playlist, songdata }) => {
  const navigation = useNavigation();

  const [songInPlaylist, setSongInPlaylist] = useState([]);

  // lưu bài hát vào playlist
  const saveSongToPlaylist = async () => {
    try {
      if (songInPlaylist.includes(info.id) == false) {
        const value = await AsyncStorage.getItem(playlist);
        if (value !== null) var json = JSON.parse(value);
        else var json = [];
        await AsyncStorage.setItem(
          playlist,
          JSON.stringify([...json, info.id])
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
      const value = await AsyncStorage.getItem(playlist);
      if (value !== null) {
        setSongInPlaylist(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST SONG from storage");
    }
  };

  useEffect(() => {
    if (screen == "AddSongToPlaylist") readSongFromPlaylist();
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 60,
        paddingTop: 5,
        paddingHorizontal: 20,
        justifyContent: "space-around",
      }}
      onPress={() => {
        // thêm nhạc vào danh sách phát
        if (screen == "AddSongToPlaylist") saveSongToPlaylist();
        // phát nhạc
        else navigation.navigate("Player", { info, songdata });
      }}
    >
      <View
        style={{ height: "100%", borderBottomWidth: 0.5, borderColor: "#ccc" }}
      >
        <Text style={{ fontSize: 18 }} numberOfLines={1}>
          {info.name}
        </Text>
        <Text style={{ fontSize: 16, color: "gray" }}>{info.singer}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({});
