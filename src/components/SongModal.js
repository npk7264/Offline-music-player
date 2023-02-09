import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import SongItem from "./SongItem";
import { songData } from "../../data/songData";

const SongModal = ({ showSongModal, onData, playlistName }) => {
  const turnOff = () => {
    onData();
  };

  const [songInPlaylist, setSongInPlaylist] = useState([]); // danh sách bài hát trong playlist

  // đọc danh sách bài hát từ Async Storage
  const readSongFromPlaylist = async () => {
    try {
      const value = await AsyncStorage.getItem(playlistName);
      if (value !== null) {
        setSongInPlaylist(JSON.parse(value));
        // console.log(value);
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST from storage");
    }
  };

  useEffect(() => {
    readSongFromPlaylist();
  }, []);

  return (
    <Modal
      visible={showSongModal}
      onRequestClose={() => {
        turnOff();
      }}
      animationType="slide"
    >
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>Bài hát</Text>
        </View>
        {/* Danh sách bài hát */}
        <FlatList
          data={songData}
          renderItem={({ item }) => (
            <SongItem
              info={item}
              screen={"AddSongToPlaylist"}
              playlist={playlistName}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "gray" }} onPress={turnOff}>
            Đóng
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SongModal;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 60,
    backgroundColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  newPlaylist: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  playlistInput: {
    fontSize: 18,
    flex: 1,
    marginRight: 30,
    height: 40,
    borderBottomWidth: 1,
  },
  addPlaylistButton: {
    width: 40,
    height: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "100%",
    justifyContent: "center",
  },
});
