import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaylistModal from "./PlaylistModal";
import { Entypo } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";

import { AudioContext } from "../context/AudioContext";
import { handleAudioPress, pauseSong } from "../misc/AudioController";

const FAVORITE = "FAVORITE";
const RECENT = "RECENT";

const MusicController = () => {
  const contextAudio = useContext(AudioContext);
  const [index, setIndex] = useState(contextAudio.audioState.currentIndex);

  const [like, setLike] = useState(false); // lưu trạng thái like/unlike
  const [listLike, setListLike] = useState([]); // lưu danh sách đã like
  const [listRecent, setListRecent] = useState([]); // lưu danh sách phát gần đây: [{id: id bài hát, time: thời gian nghe mới nhất},...]
  const [showPlaylistModal, setShowPlaylistModal] = useState(false); // lưu trạng thái ẩn hiện của bảng chọn playlist
  const [isRepeat, setRepeat] = useState(contextAudio.audioState.isLooping);
  const [posTime, setPosTime] = useState(0); // lưu vị trí hiện tại bài hát theo mili giây
  const [currentPos, setCurrentPos] = useState("00:00");

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (posTime !== null && contextAudio.audioState.currentDuration !== null)
      return posTime / contextAudio.audioState.currentDuration;
    return 0;
  };
  // hàm chuyển đổi định dạng thời gian
  const convertTime = (milliseconds) => {
    if (milliseconds) {
      //const hours = Math.floor(milliseconds / 3600000);
      const minute = Math.floor((milliseconds % 3600000) / 60000);
      const sec = Math.floor(((milliseconds % 360000) % 60000) / 1000);
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

  // thao tác tới bài hát trước đó
  const prevSong = () => {
    const currentIndex = contextAudio.audioState.currentIndex;
    const currentPlaylist = contextAudio.audioState.currentPlaylist;
    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : currentPlaylist.length - 1;
    const prevInfo = currentPlaylist[prevIndex];
    setIndex(prevIndex);
    // handleAudioPress(contextAudio, prevIndex, prevInfo, currentPlaylist);
  };
  // thao tác tới bài hát kế tiếp
  const nextSong = () => {
    const currentIndex = contextAudio.audioState.currentIndex;
    const currentPlaylist = contextAudio.audioState.currentPlaylist;
    const nextIndex =
      currentIndex + 1 < currentPlaylist.length ? currentIndex + 1 : 0;
    const nextInfo = currentPlaylist[nextIndex];
    setIndex(nextIndex);
    // handleAudioPress(contextAudio, nextIndex, nextInfo, currentPlaylist);
  };
  // lặp bài hát
  const repeatSong = async (flag) => {
    const status = await contextAudio.audioState.soundObj.setIsLoopingAsync(
      flag
    );
    contextAudio.updateState({
      ...contextAudio.audioState,
      playbackObj: status,
      isLooping: flag,
    });
  };
  // sự kiện di chuyển seekbar
  const scrollSlider = async (value) => {
    // console.log("scroll");
    const status = await contextAudio.audioState.soundObj.setPositionAsync(
      Math.floor(value * contextAudio.audioState.currentDuration)
    );
  };

  // phát bài hát mới
  const playNewSong = async (contextAudio, index, info, songdata) => {
    // thông tin item click vào
    setPosTime(0);
    // thông tin item click vào
    contextAudio.updatePressedInfo({
      ...contextAudio.pressedInfo,
      index: index,
      info: info,
      songdata: songdata,
    });

    try {
      await contextAudio.audioState.soundObj.stopAsync();
      await contextAudio.audioState.soundObj.unloadAsync();

      // file nhac
      const uri = songdata[index].uri;
      const { sound, status } = await Audio.Sound.createAsync(
        songdata[index].id < songData.length ? songdata[index].uri : { uri },
        {},
        (status) => {
          if (status.isLoaded && status.isPlaying) {
            setPosTime(status.positionMillis);
          }
          if (status?.didJustFinish && !status.isLooping) {
            console.log("finish");
            nextSong();
          }
        }
      );
      await contextAudio.updateState({
        ...contextAudio.audioState,
        playbackObj: status,
        soundObj: sound,
        isPlaying: true,
        isLooping: false,
        currentIndex: index,
        currentInfo: info,
        currentPlaylist: songdata,
        currentDuration: status.durationMillis,
      });
      sound.playAsync();
    } catch (error) {
      console.log("error inside playNewSong helper method", error.message);
    }
  };
  //
  const handleAudioPress = async (contextAudio, index, info, songdata) => {
    try {
      // phát nhạc lần đầu
      if (contextAudio.audioState.soundObj === null) {
        // thông tin item click vào
        contextAudio.updatePressedInfo({
          ...contextAudio.pressedInfo,
          index: index,
          info: info,
          songdata: songdata,
        });
        // file nhac
        const uri = songdata[index].uri;
        const { sound, status } = await Audio.Sound.createAsync(
          songdata[index].id < songData.length ? songdata[index].uri : { uri },
          {},
          (status) => {
            if (status.isLoaded && status.isPlaying) {
              setPosTime(status.positionMillis);
            }
            if (status?.didJustFinish && !status.isLooping) {
              nextSong();
              console.log("finish");
            }
          }
        );
        await contextAudio.updateState({
          ...contextAudio.audioState,
          playbackObj: status,
          soundObj: sound,
          isPlaying: true,
          isLooping: false,
          currentIndex: index,
          currentInfo: info,
          currentPlaylist: songdata,
          currentDuration: status.durationMillis,
        });
        await sound.playAsync();
      }
      // dừng nhạc
      else if (
        contextAudio.audioState.isPlaying &&
        contextAudio.audioState.currentInfo.id === info.id
      ) {
        console.log("pause");
        const status = await contextAudio.audioState.soundObj.pauseAsync();
        contextAudio.updateState({
          ...contextAudio.audioState,
          playbackObj: status,
          isPlaying: false,
          currentPosition: status.positionMillis,
        });
      }
      // tiếp tục
      else if (
        !contextAudio.audioState.isPlaying &&
        contextAudio.audioState.currentInfo.id === info.id
      ) {
        console.log("resume");
        const status = await contextAudio.audioState.soundObj.playAsync();
        contextAudio.updateState({
          ...contextAudio.audioState,
          playbackObj: status,
          isPlaying: true,
        });
      }
      // phát bài khác
      else if (contextAudio.audioState.currentInfo.id !== info.id) {
        console.log("play new song");
        playNewSong(contextAudio, index, info, songdata);
      }
    } catch {
      alert("Fail to handle audio");
    }
  };

  // xử lí dữ liệu
  const saveFavorite = async () => {
    try {
      await AsyncStorage.setItem(
        FAVORITE,
        JSON.stringify([...listLike, contextAudio.pressedInfo.info.id])
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
            return item !== contextAudio.pressedInfo.info.id;
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
        setLike(JSON.parse(value).includes(contextAudio.pressedInfo.info.id));
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
        // LƯU DỮ LIỆU mới
        let jsonValue = JSON.parse(value);
        // thời gian các lần nghe
        let timeList = jsonValue
          .filter((item) => {
            return item.id == contextAudio.pressedInfo.info.id;
          })
          .map((item) => item.time)[0];
        if (timeList == undefined) timeList = [];
        // console.log(jsonValue);
        // kiểm tra dữ liệu nghe gần đây có bài hát đang phát chưa, nếu có => remove => thêm mới
        if (
          jsonValue
            .map((item) => item.id)
            .includes(contextAudio.pressedInfo.info.id)
        ) {
          jsonValue = jsonValue.filter((item) => {
            return item.id != contextAudio.pressedInfo.info.id;
          });
        }
        // console.log(timeList);
        //lưu
        await AsyncStorage.setItem(
          RECENT,
          JSON.stringify([
            {
              id: contextAudio.pressedInfo.info.id,
              time: [...timeList, new Date()],
            },
            ...jsonValue,
          ])
        );
      } else
        await AsyncStorage.setItem(
          RECENT,
          JSON.stringify([
            { id: contextAudio.pressedInfo.info.id, time: [new Date()] },
          ])
        );
      // await AsyncStorage.removeItem(RECENT)
    } catch (e) {
      alert("Failed to fetch the RECENT from storage");
    }
  };

  // xử lí khi dữ liệu thay đổi
  useEffect(() => {
    readFavorite();
  }, []);

  // xử lí khi index bài hát thay đổi (thao tác next, previous, trạng thái like)
  useEffect(() => {
    // console.log(listRecent);
    readFavorite();
    saveRecent();

    // setRepeat(false);
  }, [contextAudio.audioState.currentIndex]);

  useEffect(() => {
    playNewSong(
      contextAudio,
      index,
      contextAudio.audioState.currentPlaylist[index],
      contextAudio.audioState.currentPlaylist
    );
  }, [index]);

  // xử lí trạng thái trả về từ PlaylistModal
  const turnOffModal = () => {
    setShowPlaylistModal(false);
  };

  return (
    <View>
      {/* Thông tin nhạc */}
      <View style={styles.songInfo}>
        <TextTicker
          style={{ fontSize: 25 }}
          loop
          bounce={false}
          repeatSpacer={50}
          marqueeDelay={1000}
          duration={10000}
        >
          {contextAudio.pressedInfo.info.name}
        </TextTicker>
        <Text style={{ fontSize: 20, color: "gray" }}>
          {contextAudio.pressedInfo.info.singer}
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
            setCurrentPos(
              convertTime(value * contextAudio.audioState.currentDuration)
            );
          }}
          ////////// sự kiện bắt đầu kéo thanh seekbar
          onSlidingStart={async () => {
            if (!contextAudio.audioState.isPlaying) return;
            try {
              console.log("pause");
              await contextAudio.audioState.soundObj.setStatusAsync({
                shouldPlay: false,
              });
            } catch (error) {
              console.log("error inside onSlidingStart callback", error);
            }
          }}
          ////////// sự kiện hoàn thành
          onSlidingComplete={async (value) => {
            if (
              contextAudio.audioState.soundObj === null ||
              !contextAudio.audioState.isPlaying
            ) {
              const status =
                await contextAudio.audioState.soundObj.setPositionAsync(
                  Math.floor(value * contextAudio.audioState.currentDuration)
                );
              contextAudio.updateState({
                ...contextAudio.audioState,
                playbackObj: status,
                currentPosition: status.positionMillis,
              });
              return;
            }
            try {
              const status =
                await contextAudio.audioState.soundObj.setPositionAsync(
                  Math.floor(value * contextAudio.audioState.currentDuration)
                );
              contextAudio.updateState({
                ...contextAudio.audioState,
                playbackObj: status,
                currentPosition: status.positionMillis,
              });
              await contextAudio.audioState.soundObj.playAsync();
            } catch (error) {
              console.log("error inside onSlidingComplete callback", error);
            }
          }}
        ></Slider>
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>{currentPos}</Text>
          <Text style={styles.progressLabelText}>
            {convertTime(contextAudio.audioState.currentDuration)}
          </Text>
        </View>
      </View>

      {/* thanh chứa các nút replay, yêu thích, thêm vào playlist */}
      <View style={[styles.controllerContainer, { height: 60 }]}>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
          onPress={() => {
            const flag = !isRepeat;
            setRepeat(flag);
            repeatSong(flag);
          }}
        >
          <MaterialCommunityIcons
            name={isRepeat ? "repeat-once" : "repeat"}
            size={30}
            color="#333"
          />
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
            // setIsPlaying(false);
            pauseSong(contextAudio);
            // Mở playlist Modal
            setShowPlaylistModal(true);
          }}
        >
          <Entypo name="add-to-list" size={25} color={"#333"} />
        </TouchableOpacity>
      </View>

      {/* thanh điều khiển previous, play/pause, next */}
      <View style={styles.controllerContainer}>
        {/* xử lí sự kiện khi nhấn nút Previous */}
        <TouchableOpacity style={styles.controllerItem} onPress={prevSong}>
          <Icon name="step-backward" size={35} color="#333" />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Play/Pause */}
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            // Kiểm tra trạng thái isPlaying để phát nhạc hoặc tạm dừng
            handleAudioPress(
              contextAudio,
              contextAudio.audioState.currentIndex,
              contextAudio.audioState.currentInfo,
              contextAudio.audioState.currentPlaylist
            );
          }}
        >
          <Icon
            name={contextAudio.audioState.isPlaying ? "pause" : "play"}
            size={35}
            color="#333"
          />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Next */}
        <TouchableOpacity style={styles.controllerItem} onPress={nextSong}>
          <Icon name="step-forward" size={35} color="#333" />
        </TouchableOpacity>
      </View>
      <PlaylistModal
        showPlaylistModal={showPlaylistModal}
        onData={turnOffModal}
        songID={contextAudio.audioState.currentInfo.id}
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
    // backgroundColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  controllerItem: {
    width: 50,
    height: 50,
    // backgroundColor: "#333",
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
