import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View>
      <MaterialCommunityIcons name="headphones" size={54} color="black" />
      <Text>Footer</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
