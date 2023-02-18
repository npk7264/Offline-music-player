import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const BackBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.backBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 80, height: "100%", justifyContent: 'center', paddingLeft: 20}}>
        <Icon name="arrow-left" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default BackBar;

const styles = StyleSheet.create({
  backBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#4D8D6E",
    justifyContent: "center",
    //paddingHorizontal: 20,
  },
});
