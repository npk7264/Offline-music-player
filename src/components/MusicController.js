import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Audio } from "expo-av";

const objMusic = [
  {
    uri: require("../../assets/song1.mp3"),
  },
  {
    uri: require("../../assets/song2.mp3"),
  },
];

const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [index, setIndex] = useState(0);

  // sự kiện phát nhạc lần đầu hoặc replay khi đang phát
  const playSoundFirstTime = async () => {
    const { sound } = await Audio.Sound.createAsync(objMusic[index].uri);
    setSound(sound);
    console.log("first time");
    await sound.playAsync();
  };
  // sự kiện phát nhạc tiếp tục (tạm dừng -> phát tiếp)
  const playSound = async () => {
    console.log("play");
    await sound.playAsync();
  };
  // sự kiện tạm dừng nhạc
  const stopSound = async () => {
    console.log("pause");
    await sound.pauseAsync();
  };
  // sự kiện replay nhạc (khi tạm dừng)
  const replaySoundPause = async () => {
    const { sound } = await Audio.Sound.createAsync(objMusic[index].uri);
    setSound(sound);
  };

  // thao tác tới bài hát trước đó
  const previousSong = () => {
    setIndex(index - 1 >= 0 ? index - 1 : objMusic.length - 1);
  };
  // thao tác tới bài hát kế tiếp
  const nextSong = () => {
    setIndex(index + 1 < objMusic.length ? index + 1 : 0);
  };

  // xử lí khi sound thay đổi
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // xử lí khi index bài hát thay đổi (thao tác next, previous)
  useEffect(() => {
    if (isPlaying) playSoundFirstTime();
    else replaySoundPause();
  }, [index]);

  return (
    <View>
      {/* thanh chứa các nút replay, yêu thích, thêm vào playlist */}
      <View style={[styles.controllerContainer, { height: 60 }]}>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
          onPress={() => {
            isPlaying ? playSoundFirstTime() : replaySoundPause();
          }}
        >
          <Icon name="repeat" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
        >
          <Icon name="heart-o" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
        >
          <Icon name="list-ul" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* thanh điều khiển previous, play/pause, next */}
      <View style={styles.controllerContainer}>
        {/* xử lí sự kiện khi nhấn nút Previous */}
        <TouchableOpacity style={styles.controllerItem} onPress={previousSong}>
          <Icon name="step-backward" size={35} color="#fff" />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Play/Pause */}
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            setIsPlaying(!isPlaying);
            const soundState = !isPlaying;
            if (soundState) {
              if (sound == undefined) playSoundFirstTime();
              else playSound();
            } else stopSound();
          }}
        >
          <Icon
            name={isPlaying === false ? "play" : "pause"}
            size={35}
            color="#fff"
          />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Next */}
        <TouchableOpacity style={styles.controllerItem} onPress={nextSong}>
          <Icon name="step-forward" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text>
        {index.toString()} + {isPlaying.toString()}
      </Text>
    </View>
  );
};

export default MusicController;

const styles = StyleSheet.create({
  controllerContainer: {
    height: 80,
    backgroundColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  controllerItem: {
    width: 50,
    height: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
