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
import React, { useContext } from "react";

import BackBar from "../components/BackBar";
import Title from "../components/Title";
import SongItem from "./SongItem";
import { AudioContext } from "../context/AudioProvider";
import { handleAudioPress } from "../misc/audioController";
import PlayerMini from "./PlayerMini";

const DetailArtist = ({ route }) => {
  const contextType = useContext(AudioContext);
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
          <SongItem info={item} onAudioPress={() => { handleAudioPress(item, route.params.songs, contextType) }} />
        )}
        keyExtractor={(item, index) => index}
      />
      {contextType.soundObj !== null && <PlayerMini ></PlayerMini>}
    </SafeAreaView>
  );
};

export default DetailArtist;

const styles = StyleSheet.create({});
