import Slider from "@react-native-community/slider";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AudioContext } from "../context/AudioContext";
import { handleAudioPress } from "../misc/AudioController";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const PlayerMini = () => {
  const contextAudio = useContext(AudioContext);
  const navigation = useNavigation(useNavigation);
  const [playing, setPlaying] = useState(contextAudio.audioState.isPlaying);

  const pause = async () => {
    console.log("pause");
    const status = await contextAudio.audioState.soundObj.pauseAsync();
    contextAudio.updateState({
      ...contextAudio.audioState,
      playbackObj: status,
      isPlaying: false,
    });
  };
  const resume = async () => {
    console.log("resume");
    const status = await contextAudio.audioState.soundObj.playAsync();
    contextAudio.updateState({
      ...contextAudio.audioState,
      playbackObj: status,
      isPlaying: true,
    });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    setPlaying(contextAudio.audioState.isPlaying);
  }, [isFocused]);

  return (
    <TouchableOpacity
      style={styles.view}
      onPress={() => {
        navigation.navigate("Player");
      }}
    >
      <Slider disabled={true} value={0.15}></Slider>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 2, marginLeft: 15 }}>
          <Text
            style={{ fontSize: 20, color: "black", fontWeight: "500" }}
            numberOfLines={1}
          >
            {contextAudio.pressedInfo.info.name}
          </Text>
          <Text style={{ fontSize: 14, color: "gray", marginTop: 10 }}>
            {contextAudio.pressedInfo.info.singer}
          </Text>
        </View>

        <View style={styles.controllerContainer}>
          <TouchableOpacity
            style={styles.controllerItem}
            onPress={async () => {
              const playingState = !playing;
              setPlaying(playingState);
              if (!playingState) await pause();
              else await resume();
            }}
          >
            <Icon name={playing ? "pause" : "play"} size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerMini;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#ccc",
    height: 90,
  },
  controllerContainer: {
    flex: 1,
    //backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
  },
  controllerItem: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
