import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import { useState, useNavigation } from "@react-navigation/native";

const BackBar = () => {
  const contextAudio = useContext(AudioContext);
  const navigation = useNavigation();

  const onPlaybackStatusUpdate = async (status) => {
    if (status?.didJustFinish && !status.isLooping) {
      await contextAudio.audioState.soundObj.setPositionAsync(0);
      await contextAudio.audioState.soundObj.pauseAsync();
      contextAudio.updateState({
        ...contextAudio.audioState,
        isPlaying: false,
      });
      console.log("finish miniPlayer from BackBar");
    }
  };

  return (
    <View style={styles.backBar}>
      <TouchableOpacity
        onPress={() => {
          if (contextAudio.audioState.soundObj !== null)
            contextAudio.audioState.soundObj.setOnPlaybackStatusUpdate(
              onPlaybackStatusUpdate
            );
          navigation.goBack();
        }}
        style={{
          width: 80,
          height: "100%",
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
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
