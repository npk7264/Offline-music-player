import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ArtistItem = ({ artist, songs }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 60,
        paddingTop: 5,
        paddingHorizontal: 20,
        justifyContent: "space-around",
      }}
      onPress={() => {}}
    >
      <View
        style={{ height: "100%", borderBottomWidth: 0.5, borderColor: "#ccc" }}
      >
        <Text style={{ fontSize: 18 }} numberOfLines={1}>
          {artist}
        </Text>
        <Text style={{ fontSize: 16, color: "gray" }}>{songs.length} bài hát</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistItem;

const styles = StyleSheet.create({});
