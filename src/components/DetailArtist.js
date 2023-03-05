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
import React, { useState, useEffect, useContext } from "react";

import BackBar from "../components/BackBar";
import Title from "../components/Title";
import SongItem from "./SongItem";
import PlayerMini from "../components/PlayerMini";
import { AudioContext } from "../context/AudioContext";
import { songData } from "../../data/songData";

const DetailArtist = ({ route }) => {
  const contextAudio = useContext(AudioContext);
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
      {contextAudio.audioState.currentIndex !== null && (
        <PlayerMini></PlayerMini>
      )}
    </SafeAreaView>
  );
};

export default DetailArtist;

const styles = StyleSheet.create({});
