import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import BackBar from "../components/BackBar";
import Title from "../components/Title";
import SongItem from "./SongItem";
import { songData } from "../../data/songData";

const DetailArtist = ({ route }) => {
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
