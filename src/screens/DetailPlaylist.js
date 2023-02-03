import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  import BackBar from "../components/BackBar";
  import { songData } from "../../data/songData";
  import SongItem from "../components/SongItem";
  
  const DetailPlaylist = ({ route }) => {
    const [songInPlaylist, setSongInPlaylist] = useState([]);
  
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
  
    const playlistData = songInPlaylist.map((item) => {
      return {
        id: item,
        name: songData[item].name,
        singer: songData[item].singer,
      };
    });
  
    useEffect(() => {
      readSongFromPlaylist();
    }, []);
  
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
  
        {/* Danh sách bài hát */}
        <FlatList
          data={playlistData}
          renderItem={({ item }) => <SongItem info={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  };
  
  export default DetailPlaylist;
  
  const styles = StyleSheet.create({});
  