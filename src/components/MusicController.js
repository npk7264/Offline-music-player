import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from "expo-av";


const MusicController = () => {
  const [sound, setSound] = React.useState();
  const [play, setPlay] = React.useState(false);
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
      <TouchableOpacity style={styles.controllerItem}>
        <Icon name="step-backward" size={35} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.controllerItem}
        onPress={() => {
          setPlay(!play)
          playSound()
        }}
      >
        <Icon name={play === false ? 'play' : 'pause'} size={35} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controllerItem}>
        <Icon name="step-forward" size={35} color='#fff' />
      </TouchableOpacity>
    </View>
  );
};

export default MusicController;

const styles = StyleSheet.create({
  controllerItem: { width: 50, height: 50, backgroundColor: "#333", justifyContent: 'center', alignItems: 'center' },
});
