import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from "react-native";
import React, { useContext } from "react";

import SearchBar from "../components/SearchBar";
import ArtistItem from "../components/ArtistItem";
import Title from "../components/Title";
import { DataContext } from "../context/DataContext";
import PlayerMini from "../components/PlayerMini";
import { AudioContext } from "../context/AudioProvider";

const Artist = () => {
  const contextType = useContext(AudioContext);
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
      {contextType.soundObj !== null && <PlayerMini ></PlayerMini>}
    </SafeAreaView>
  );
};

export default Artist;

const styles = StyleSheet.create({});
