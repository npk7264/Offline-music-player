import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BackBar from "../components/BackBar";
import { songData } from "../../data/songData";
// import SongItem from "../components/SongItem";
import SongModal from "../components/SongModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const DetailPlaylist = ({ route }) => {
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
          Alert.alert("XÓA BÀI HÁT", "Bạn muốn xóa bài hát khỏi playlist?", [
            {
              text: "Không",
              onPress: () => console.log("Cancelled"),
            },
            {
              text: "OK",
              onPress: () => deleteSong(info.id),
            },
          ]);
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

  const [songInPlaylist, setSongInPlaylist] = useState([]);
  const [showSongModal, setShowSongModal] = useState(false); // lưu trạng thái ẩn hiện của bảng chọn bài hát

  // đọc danh sách bài hát từ playlist
  const readSongFromPlaylist = async () => {
    try {
      const value = await AsyncStorage.getItem(route.params.name);
      if (value !== null) {
        await setSongInPlaylist(JSON.parse(value));
      }
      //   console.log(route.params.name + " " + value);
    } catch (e) {
      alert("Failed to fetch the PLAYLIST SONG from storage");
    }
  };
  // xóa bài hát khỏi danh sách phát
  const deleteSong = async (item) => {
    try {
      const newPlaylistList = songInPlaylist.filter((i) => i !== item);
      await AsyncStorage.setItem(
        route.params.name,
        JSON.stringify(newPlaylistList)
      );
      setSongInPlaylist(newPlaylistList);
    } catch (e) {
      Alert.alert("Failed to delete the item from the PLAYLIST");
    }
  };

  const playlistData = songInPlaylist.map((item) => {
    return {
      id: item,
      name: songData[item].name,
      singer: songData[item].singer,
      uri: songData[item].uri,
    };
  });

  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();

  useEffect(() => {
    readSongFromPlaylist();
  }, [isFocused]);

  useEffect(() => {
    readSongFromPlaylist();
  }, [showSongModal]);

  // xử lí trạng thái trả về từ PlaylistModal
  const turnOffModal = () => {
    setShowSongModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <BackBar />

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
          {route.params.name}
        </Text>
      </View>
      {/* Thêm bài hát vào playlist */}
      <TouchableOpacity
        style={styles.newSong}
        onPress={() => {
          setShowSongModal(true);
        }}
      >
        <View style={styles.newSongTitle}>
          <Text style={{ fontSize: 18, color: "gray" }}>
            Thêm bài hát vào playlist
          </Text>
        </View>
        <View style={styles.addPlaylistButton}>
          <Icon name="plus" size={25} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Danh sách bài hát */}
      <FlatList
        data={playlistData}
        renderItem={({ item }) => (
          <SongItem info={item} songdata={playlistData} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* SongModal */}
      <SongModal
        showSongModal={showSongModal}
        onData={turnOffModal}
        playlistName={route.params.name}
      />
    </SafeAreaView>
  );
};

export default DetailPlaylist;

const styles = StyleSheet.create({
  newSong: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  newSongTitle: {
    flex: 1,
    marginRight: 30,
    height: 40,
    justifyContent: "center",
  },
  addPlaylistButton: {
    width: 40,
    height: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
