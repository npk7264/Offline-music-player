import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PlaylistModal from "./PlaylistModal";

const FAVORITE = "FAVORITE";
const RECENT = "RECENT";

const MusicController = ({ idMusicClick }) => {
  const [isPlaying, setIsPlaying] = useState(true); // nhạc đang phát/ tạm dừng
  const [sound, setSound] = useState(); // lưu obj nhạc
  const [status, setStatus] = useState(); // lưu trạng thái nhạc
  const [currentTime, setCurrentTime] = useState(0); // lưu thời gian phát nhạc
  const [durationTime, setDurationTime] = useState(1); // lưu thời gian bài hát theo mili giây
  const [posTime, setPosTime] = useState(0); // lưu vị trí hiện tại bài hát theo mili giây
  const [index, setIndex] = useState(idMusicClick); // lưu index nhạc trong playlist
  const [like, setLike] = useState(false); // lưu trạng thái like/unlike
  const [listLike, setListLike] = useState([]); // lưu danh sách đã like

  const [listRecent, setListRecent] = useState([]); // lưu danh sách phát gần đây: [{id: id bài hát, time: thời gian nghe mới nhất},...]

  const [showPlaylistModal, setShowPlaylistModal] = useState(false); // lưu trạng thái ẩn hiện của bảng chọn playlist

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (!isNaN(posTime / durationTime)) return posTime / durationTime;
    return 0;
  };

  // hàm chuyển đổi định dạng thời gian
  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
      if (parseInt(minute) < 10 && sec < 10) return `0${minute}:0${sec}`;
      if (sec == 60)
        return parseInt(minute) + 1 < 10
          ? `0${parseInt(minute) + 1}:00`
          : `${parseInt(minute) + 1}:00`;
      if (parseInt(minute) < 10) return `0${minute}:${sec}`;
      if (sec < 10) return `${minute}:0${sec}`;
      return `${minute}:${sec}`;
    }
    return `00:00`;
  };

  // sự kiện phát nhạc lần đầu hoặc replay khi đang phát
  const playSoundFirstTime = async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      songData[index].uri,
      {},
      (status) => {
        const curr = convertTime(status?.positionMillis / 1000);
        setCurrentTime(curr);
        setDurationTime(status?.durationMillis);
        setPosTime(status?.positionMillis);
        // kiểm tra nếu hết thời gian bài nhạc thì chuyển sang bài tiếp theo
        if (status?.positionMillis / 1000 == status?.durationMillis / 1000)
          nextSong();
      }
    );
    setSound(sound);
    setStatus(status);
    console.log("first time or replay");
    await sound.playAsync();
  };
  // sự kiện phát nhạc tiếp tục (tạm dừng -> phát tiếp)
  const playSound = async () => {
    console.log("play");
    const status = await sound.playAsync();
    setStatus(status);
  };
  // sự kiện tạm dừng nhạc
  const pauseSound = async () => {
    console.log("pause");
    const status = await sound.pauseAsync();
    setStatus(status);
  };
  // sự kiện replay nhạc (khi tạm dừng)
  const replaySoundPause = async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      songData[index].uri,
      {},
      (status) => {
        const curr = convertTime(status?.positionMillis / 1000);
        setCurrentTime(curr);
        setDurationTime(status?.durationMillis);
        setPosTime(status?.positionMillis);
        // kiểm tra nếu hết thời gian bài nhạc thì chuyển sang bài tiếp theo
        if (status?.positionMillis / 1000 == status?.durationMillis / 1000)
          nextSong();
      }
    );
    setSound(sound);
    setStatus(status);
    console.log("first time or replay");
  };
  // thao tác tới bài hát trước đó
  const previousSong = () => {
    setIndex(index - 1 >= 0 ? index - 1 : songData.length - 1);
  };
  // thao tác tới bài hát kế tiếp
  const nextSong = () => {
    setIndex(index + 1 < songData.length ? index + 1 : 0);
  };
  // sự kiện di chuyển seekbar
  const scrollSlider = async (value) => {
    console.log("scroll");
    const status = await sound.setPositionAsync(
      Math.floor(value * durationTime)
    );
    setStatus(status);
    //await resume(sound);
  };

  // xử lí dữ liệu
  const saveFavorite = async () => {
    try {
      await AsyncStorage.setItem(
        FAVORITE,
        JSON.stringify([...listLike, index])
      );
      // alert("Data successfully saved");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };
  const removeFavorite = async () => {
    try {
      await AsyncStorage.setItem(
        FAVORITE,
        JSON.stringify(
          listLike.filter((item) => {
            return item !== index;
          })
        )
      );
      // alert("Data successfully removed");
    } catch (e) {
      alert("Failed to remove the data to the storage");
    }
  };
  const readFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITE);
      if (value !== null && value !== []) {
        setListLike(JSON.parse(value));
        setLike(JSON.parse(value).includes(index));
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  const saveRecent = async () => {
    try {
      // ĐỌC DỮ LIỆU từ Async Storage để set ListRecent
      const value = await AsyncStorage.getItem(RECENT);
      if (value !== null) {
        await setListRecent(JSON.parse(value));
        console.log("READ DATA from ASYNC STORAGE: " + value);

        // LƯU DỮ LIỆU mới
        let jsonValue = JSON.parse(value);
        // kiểm tra dữ liệu nghe gần đây có bài hát đang phát chưa, nếu có => remove => thêm mới
        if (jsonValue.includes(index)) {
          jsonValue = jsonValue.filter((item) => {
            return item != index;
          });
        }
        // lưu
        await AsyncStorage.setItem(
          RECENT,
          JSON.stringify([index, ...jsonValue])
        );
      } else await AsyncStorage.setItem(RECENT, JSON.stringify([index]));
    } catch (e) {
      alert("Failed to fetch the RECENT from storage");
    }
  };

  // xử lí khi dữ liệu thay đổi
  useEffect(() => {
    readFavorite();
  }, []);

  // xử lí khi sound thay đổi
  useEffect(() => {
    return sound
      ? () => {
          console.log("SOUND has CHANGED");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // xử lí khi index bài hát thay đổi (thao tác next, previous, trạng thái like)
  useEffect(() => {
    console.log("MOVE to NEXT or PREVIOUS");
    if (isPlaying) playSoundFirstTime();
    else replaySoundPause();
    readFavorite();

    saveRecent();
  }, [index]);

  // xử lí trạng thái trả về từ PlaylistModal
  const turnOffModal = () => {
    setShowPlaylistModal(false);
  };

  return (
    <View>
      {/* Thông tin nhạc */}
      <View style={styles.songInfo}>
        <Text style={{ fontSize: 25 }}>{songData[index].name}</Text>
        <Text style={{ fontSize: 20, color: "gray" }}>
          {songData[index].singer}
        </Text>
      </View>
      <View
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={convertValueSlider()}
          thumbTintColor="red"
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000"
          onValueChange={(value) => {
            setCurrentTime(
              convertTime(Math.floor(value * durationTime) / 1000)
            );
            setPosTime(Math.floor(value * durationTime));
          }}
          onSlidingComplete={async (value) => {
            await scrollSlider(value);
          }}
        ></Slider>
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>{currentTime}</Text>
          <Text style={styles.progressLabelText}>
            {convertTime(status?.durationMillis / 1000)}
          </Text>
        </View>
      </View>

      {/* thanh chứa các nút replay, yêu thích, thêm vào playlist */}
      <View style={[styles.controllerContainer, { height: 60 }]}>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
          onPress={() => {
            isPlaying ? playSoundFirstTime() : replaySoundPause();
          }}
        >
          <Icon name="repeat" size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
          onPress={() => {
            const likeState = !like;
            setLike(!like);
            likeState ? saveFavorite() : removeFavorite();
          }}
        >
          <Icon name={like ? "heart" : "heart-o"} size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
          onPress={() => {
            // Pause
            setIsPlaying(false);
            pauseSound();
            // Mở playlist Modal
            setShowPlaylistModal(true);
          }}
        >
          <Icon name="list-ul" size={25} color="#333" />
        </TouchableOpacity>
      </View>

      {/* thanh điều khiển previous, play/pause, next */}
      <View style={styles.controllerContainer}>
        {/* xử lí sự kiện khi nhấn nút Previous */}
        <TouchableOpacity style={styles.controllerItem} onPress={previousSong}>
          {/* <Icon name="step-backward" size={35} color="#333" /> */}
          <Entypo name="controller-jump-to-start" size={35} color="#333" />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Play/Pause */}
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            setIsPlaying(!isPlaying);
            const soundState = !isPlaying;
            // Kiểm tra trạng thái isPlaying để phát nhạc hoặc tạm dừng
            if (soundState) {
              if (sound == undefined) playSoundFirstTime();
              else playSound();
            } else pauseSound();
          }}
        >
          <Icon
            name={isPlaying === false ? "play" : "pause"}
            size={35}
            color="#333"
          />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Next */}
        <TouchableOpacity style={styles.controllerItem} onPress={nextSong}>
          {/* <Icon name="step-forward" size={35} color="#333" /> */}
          <Entypo name="controller-next" size={35} color="#333" />
        </TouchableOpacity>
      </View>
      {/* <Text>
        {index.toString()} + {isPlaying.toString()}
      </Text> */}
      <PlaylistModal
        showPlaylistModal={showPlaylistModal}
        onData={turnOffModal}
        songID={index}
      />
    </View>
  );
};

export default MusicController;

const styles = StyleSheet.create({
  songInfo: {
    height: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  controllerContainer: {
    height: 80,
    ///backgroundColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  controllerItem: {
    width: 50,
    height: 50,
    //backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    width: 350,
    height: 40,
    flexDirection: "row",
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#000",
    fontWeight: "500",
  },
});
