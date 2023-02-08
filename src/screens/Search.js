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
import React, { useState } from "react";

import SongItem from "../components/SongItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { songData } from "../../data/songData";

const Search = () => {
  const navigation = useNavigation();

  const [searchResult, setSearchResult] = useState([]);

  const searchFilter = (text) => {
    if (text) {
      const searchData = songData.filter((item) => {
        return (
          item.name.toString().toUpperCase().includes(text.toUpperCase()) ||
          item.singer.toString().toUpperCase().includes(text.toUpperCase())
        );
      });
      setSearchResult(searchData);
    } else setSearchResult([]);
  };

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
            searchFilter(text);
          }}
        ></TextInput>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

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
          Kết quả tìm kiếm
        </Text>
      </View>

      {/* Danh sách bài hát */}
      <FlatList
        data={searchResult}
        renderItem={({ item }) => <SongItem info={item} songdata={songData} />}
        keyExtractor={(item) => item.id}
      />
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
});
