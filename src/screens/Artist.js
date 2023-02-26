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

import SearchBar from "../components/SearchBar";
import ArtistItem from "../components/ArtistItem";
import Title from "../components/Title";
import { songData } from "../../data/songData";
import { DataContext } from "../context/DataContext";

const Artist = () => {
  const context = useContext(DataContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />

      {/* Title */}
      <Title title={"Nghệ sĩ"} />

      {/* Danh sách nghệ sĩ */}
      <FlatList
        data={[...new Set(context.data.map((item) => item.singer))]}
        renderItem={({ item }) => (
          <ArtistItem
            artist={item}
            songs={context.data.filter((i) => {
              return i.singer === item;
            })}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default Artist;

const styles = StyleSheet.create({});
