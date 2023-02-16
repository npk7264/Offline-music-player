import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ showSort, Sort }) => {
  const turnOn = () => {
    if (Sort !== undefined) Sort(true);
  };

  const navigation = useNavigation();
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <Icon name="search" size={25} color="#fff" />
      </TouchableOpacity>
      {showSort && (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            turnOn();
          }}
        >
          <Icon name="sort" size={25} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#4D8D6E",
    justifyContent: "flex-end",
    // paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
});
