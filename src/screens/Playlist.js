import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
// import PlaylistItem from "../components/PlaylistItem";
import Title from "../components/Title";

import { AudioContext } from "../context/AudioContext";
import PlayerMini from "../components/PlayerMini";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PLAYLIST = "PLAYLIST";

const Playlist = () => {
  const navigation = useNavigation();

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
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST from storage");
    }
  };
  // xóa danh sách phát
  const deleteItem = async (item) => {
    try {
      const newPlaylistList = playlistList.filter((i) => i !== item);
      await AsyncStorage.removeItem(item);
      await AsyncStorage.setItem(PLAYLIST, JSON.stringify(newPlaylistList));
      setPlaylistList(newPlaylistList);
    } catch (e) {
      Alert.alert("Failed to delete the item from the PLAYLIST");
    }
  };

  const PlaylistItem = ({ name }) => {
    return (
      <TouchableOpacity
        style={styles.playlistItem}
        // sự kiện nhấn vào sẽ chuyển tới trang detail playlist
        onPress={() => {
          navigation.navigate("DetailPlaylist", { name });
        }}
        // sự kiện nhấn giữ để xóa
        onLongPress={() => {
          Alert.alert("XÓA PLAYLIST", "Bạn muốn xóa playlist " + name + "?", [
            {
              text: "Không",
              onPress: () => console.log("Cancelled"),
            },
            {
              text: "OK",
              onPress: () => deleteItem(name),
            },
          ]);
        }}
      >
        <View
          style={{
            height: "100%",
            borderBottomWidth: 0.5,
            borderColor: "#ccc",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();
  const contextAudio = useContext(AudioContext);

  useEffect(() => {
    readPlaylist();
    // console.log("refresh PLAYLIST PAGE");
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />
      <Title title={"Danh sách phát"} />

      <View style={styles.newPlaylist}>
        <TextInput
          placeholder="Thêm danh sách phát mới"
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
      <FlatList
        data={playlistList}
        renderItem={({ item }) => <PlaylistItem name={item} />}
        keyExtractor={(item) => item}
      />
      {contextAudio.audioState.currentIndex !== null && (
        <PlayerMini></PlayerMini>
      )}
    </SafeAreaView>
  );
};

export default Playlist;

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
  playlistInput: { fontSize: 18, flex: 1, marginRight: 30, height: "80%" },
  addPlaylistButton: {
    width: 40,
    height: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  playlistItem: {
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
  },
});
