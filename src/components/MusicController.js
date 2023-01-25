import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { Audio } from "expo-av";

const MusicController = () => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Hello.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={{
        height: 80,
        backgroundColor: "#ccc",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity style={styles.controllerItem}></TouchableOpacity>
      <TouchableOpacity
        style={styles.controllerItem}
        onPress={() => playSound()}
      ></TouchableOpacity>
      <TouchableOpacity style={styles.controllerItem}></TouchableOpacity>
    </View>
  );
};

export default MusicController;

const styles = StyleSheet.create({
  controllerItem: { width: 50, height: 50, backgroundColor: "#333" },
});
