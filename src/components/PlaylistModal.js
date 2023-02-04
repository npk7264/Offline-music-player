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
import PlaylistItem from "./PlaylistItem";
import Icon from "react-native-vector-icons/FontAwesome";

const PLAYLIST = "PLAYLIST";

const PlaylistModal = ({ showPlaylistModal, onData, songID }) => {
  const turnOff = () => {
    onData();
  };

  const [inputPlaylist, setInputPlaylist] = useState(""); // tên playlist mới
  const [playlistList, setPlaylistList] = useState([]); // danh sách playlist đã tạo

  // lưu playlist mới vào Async Storage
  const savePlaylist = async () => {
    try {
      await AsyncStorage.setItem(
        PLAYLIST,
        JSON.stringify([...playlistList, inputPlaylist])
      );
      setInputPlaylist("");
    } catch (e) {
      alert("Failed to save the PLAYLIST to the storage");
    }
  };
  // đọc danh sách playlist từ Async Storage
  const readPlaylist = async () => {
    try {
      const value = await AsyncStorage.getItem(PLAYLIST);
      if (value !== null) {
        setPlaylistList(JSON.parse(value));
        // console.log(value);
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST from storage");
    }
  };

  useEffect(() => {
    readPlaylist();
  }, []);

  return (
    <Modal
      visible={showPlaylistModal}
      onRequestClose={() => {
        turnOff();
      }}
      animationType="slide"
    >
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>
            Danh sách phát
          </Text>
        </View>
        <View style={styles.newPlaylist}>
          <TextInput
            placeholder="Tạo danh sách phát mới"
            style={styles.playlistInput}
            value={inputPlaylist}
            onChangeText={(value) => {
              setInputPlaylist(value);
            }}
          />
          <TouchableOpacity
            style={styles.addPlaylistButton}
            onPress={() => {
              if (inputPlaylist != "") {
                if (playlistList.includes(inputPlaylist))
                  alert("Playlist đã tồn tại, vui lòng tạo playlist mới!");
                else {
                  setPlaylistList([...playlistList, inputPlaylist]);
                  savePlaylist();
                }
              } else {
                alert("Nhập tên playlist mới!");
              }
            }}
          >
            <Icon name="plus" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Danh sách playlist */}
        <FlatList
          data={playlistList}
          renderItem={({ item }) => (
            <PlaylistItem name={item} screen={"AddPlaylist"} songID={songID} />
          )}
          keyExtractor={(item) => item}
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

export default PlaylistModal;

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
