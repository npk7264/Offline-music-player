import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Entypo } from "@expo/vector-icons";

import SongItem from "../components/SongItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../context/DataContext";
import { AudioContext } from "../context/AudioContext";
import PlayerMini from "../components/PlayerMini";
import { handleAudioPress } from "../misc/AudioController";

const PLAYLIST = "PLAYLIST";

const Search = () => {
  const context = useContext(DataContext);
  const contextAudio = useContext(AudioContext);
  const navigation = useNavigation();

  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [playlistList, setPlaylistList] = useState([]); // danh sách playlist đã tạo

  // lọc kết quả tìm kiếm
  const searchFilter = (text) => {
    let searchText = text.trim().toUpperCase();
    // hiển thị kết quả tìm kiếm nếu thông tin tìm kiếm khác rỗng
    if (searchText !== "") {
      const searchData = context.data.filter((item) => {
        return (
          item.name.toUpperCase().includes(searchText) ||
          item.singer.toUpperCase().includes(searchText)
        );
      });
      setSearchResult(searchData);
    }
    // thông tin tìm kiếm không hợp lệ
    else setSearchResult([]);
  };

  // lưu playlist mới vào Async Storage
  const savePlaylist = async () => {
    try {
      await AsyncStorage.setItem(
        PLAYLIST,
        JSON.stringify([...playlistList, searchContent.trim()])
      );
      await AsyncStorage.setItem(
        searchContent.trim(),
        JSON.stringify([...searchResult].map((item) => item.id))
      );
      alert(`Đã tạo danh sách phát "${searchContent.trim()}" !`);
    } catch (e) {
      alert("Failed to save the PLAYLIST to the storage");
    }
  };
  // đọc danh sách playlist từ Async Storage
  const readPlaylist = async () => {
    try {
      const value = await AsyncStorage.getItem(PLAYLIST);
      // alert(value);
      if (value !== null) {
        setPlaylistList(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the PLAYLIST from storage");
    }
  };

  // refesh khi nhấn vào tab
  // const isFocused = useIsFocused();

  useEffect(() => {
    readPlaylist();
    // console.log("refresh PLAYLIST PAGE");
  }, []);

  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm bài hát"
          autoFocus={true}
          onChangeText={(text) => {
            setSearchContent(text);
            searchFilter(text);
          }}
        ></TextInput>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Nghe danh sách kết quả tìm kiếm */}
      {searchResult.length !== 0 && (
        <View
          style={{
            height: 60,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* nút nghe bài hát từ danh sách tìm kiếm */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleAudioPress(contextAudio, 0, searchResult[0], searchResult);
            }}
          >
            <Icon name="play" size={25} color="#fff" />
          </TouchableOpacity>
          {/* nút nghe bài hát từ danh sách tìm kiếm */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (playlistList.includes(searchContent.trim()))
                alert("Playlist đã tồn tại, vui lòng tạo playlist mới!");
              else {
                setPlaylistList([...playlistList, searchContent.trim()]);
                savePlaylist();
              }
            }}
          >
            <Entypo name="add-to-list" size={25} color={"#fff"} />
          </TouchableOpacity>
        </View>
      )}

      {/* Danh sách bài hát */}
      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <SongItem info={item} songdata={searchResult} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* {contextAudio.audioState.currentIndex !== null && (
        <PlayerMini></PlayerMini>
      )} */}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#4D8D6E",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    height: 30,
    marginRight: 30,
    fontSize: 16,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});
