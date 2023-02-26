import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import BackBar from "../components/BackBar";
import ArtistItem from "../components/ArtistItem";
import Title from "../components/Title";
import SongItem from "./SongItem";
import { songData } from "../../data/songData";
import { DataContext } from "../context/DataContext";

const DetailArtist = ({ route }) => {
  const context = useContext(DataContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <BackBar />

      {/* Title */}
      <Title title={route.params.artist} />

      {/* Danh sách nghệ sĩ */}
      <FlatList
        data={route.params.songs}
        renderItem={({ item }) => (
          <SongItem info={item} songdata={route.params.songs} />
        )}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default DetailArtist;

const styles = StyleSheet.create({});
