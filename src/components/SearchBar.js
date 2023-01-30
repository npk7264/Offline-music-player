import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <Icon name="search" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#4D8D6E",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
});
