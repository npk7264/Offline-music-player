import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioContext } from "../context/AudioProvider";
import PlaylistModal from "./PlaylistModal";
import { Entypo } from "@expo/vector-icons";
import { play, pause, resume, playNext } from "../misc/audioController";

const FAVORITE = "FAVORITE";
const RECENT = "RECENT";

const MusicController = ({ idMusicClick, songdata }) => {
  const context = useContext(AudioContext);
  const {
    audioFiles,
    playbackObj,
    soundObj,
    currentAudio,
    isPlaying,
    currentAudioIndex,
    playbackPosition,
    playbackDuration,
    activePlayList,
    updateState, } = context;


  const [posTime, setPosTime] = useState();
  const [index, setIndex] = useState(idMusicClick); // lưu index nhạc trong playlist
  const [like, setLike] = useState(false); // lưu trạng thái like/unlike
  const [listLike, setListLike] = useState([]); // lưu danh sách đã like

  const [listRecent, setListRecent] = useState([]); // lưu danh sách phát gần đây: [{id: id bài hát, time: thời gian nghe mới nhất},...]

  const [showPlaylistModal, setShowPlaylistModal] = useState(false); // lưu trạng thái ẩn hiện của bảng chọn playlist

  const [isRepeat, setRepeat] = useState(false);

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (playbackPosition !== null && playbackDuration !== null)
      return playbackPosition / playbackDuration;
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

  const handlePlayPause = async () => {
    // play
    if (soundObj === null) {
      const audio = currentAudio;
      const status = await play(playbackObj, audio.uri);
      context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: currentAudioIndex,
      });
    }
    // pause
    if (soundObj && soundObj.isPlaying) {
      const status = await pause(playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
        playbackPosition: status.positionMillis,
      });
    }
    // resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  }

  const handleNext = async () => {
    //console.log(audioFiles)
    const { isLoaded } = await playbackObj.getStatusAsync();
    const isLastAudio = currentAudioIndex + 1 === audioFiles.length;
    let audio = audioFiles[currentAudioIndex + 1];
    let index;
    let status;

    if (!isLoaded && !isLastAudio) {
      index = currentAudioIndex + 1;
      status = await play(playbackObj, audio.uri);
    }

    if (isLoaded && !isLastAudio) {
      index = currentAudioIndex + 1;
      status = await playNext(playbackObj, audio.uri);
    }

    if (isLastAudio) {
      index = 0;
      audio = audioFiles[index];
      if (isLoaded) {
        status = await playNext(playbackObj, audio.uri);
      }
      else {
        status = await play(playbackObj, audio.uri);
      }
    }

    return updateState(context, {
      currentAudio: audio,
      playbackObj: playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
    });
  }

  const handlePrevious = async () => {
    //console.log(audioFiles)
    const { isLoaded } = await playbackObj.getStatusAsync();
    const isFirstAudio = currentAudioIndex <= 0;
    let audio = audioFiles[currentAudioIndex - 1];
    let index;
    let status;

    if (!isLoaded && !isFirstAudio) {
      index = currentAudioIndex - 1;
      status = await play(playbackObj, audio.uri);
    }

    if (isLoaded && !isFirstAudio) {
      index = currentAudioIndex - 1;
      status = await playNext(playbackObj, audio.uri);
    }

    if (isFirstAudio) {
      index = audioFiles.length - 1;
      audio = audioFiles[index];
      if (isLoaded) {
        status = await playNext(playbackObj, audio.uri);
      }
      else {
        status = await play(playbackObj, audio.uri);
      }
    }

    return updateState(context, {
      currentAudio: audio,
      playbackObj: playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
    });
  }


  // xử lí dữ liệu
  const saveFavorite = async () => {
    try {
      await AsyncStorage.setItem(
        FAVORITE,
        JSON.stringify([...listLike, audioFiles[currentAudioIndex].id])
      );
      // alert("Data successfully saved");
    } catch (e) {
      alert("Failed to save the data to the storage", e);
    }
  };
  const removeFavorite = async () => {
    try {
      await AsyncStorage.setItem(
        FAVORITE,
        JSON.stringify(
          listLike.filter((item) => {
            return item !== audioFiles[currentAudioIndex].id;
          })
        )
      );
      // alert("Data successfully removed");
    } catch (e) {
      alert("Failed to remove the data to the storage", e);
    }
  };
  const readFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITE);
      if (value !== null && value !== []) {
        setListLike(JSON.parse(value));
        setLike(JSON.parse(value).includes(audioFiles[currentAudioIndex].id));
      }
    } catch (e) {
      alert("Failed to fetch the input from storage", e);
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
            return item.id == audioFiles[currentAudioIndex].id;
          })
          .map((item) => item.time)[0];
        if (timeList == undefined) timeList = [];
        // console.log(jsonValue);
        // kiểm tra dữ liệu nghe gần đây có bài hát đang phát chưa, nếu có => remove => thêm mới
        if (jsonValue.map((item) => item.id).includes(audioFiles[currentAudioIndex].id)) {
          jsonValue = jsonValue.filter((item) => {
            return item.id != audioFiles[currentAudioIndex].id;
          });
        }
        // console.log(timeList);
        //lưu
        await AsyncStorage.setItem(
          RECENT,
          JSON.stringify([
            { id: audioFiles[currentAudioIndex].id, time: [...timeList, new Date()] },
            ...jsonValue,
          ])
        );
      } else
        await AsyncStorage.setItem(
          RECENT,
          JSON.stringify([{ id: audioFiles[currentAudioIndex].id, time: [new Date()] }])
        );
      // await AsyncStorage.removeItem(RECENT)
    } catch (e) {
      alert("Failed to fetch the RECENT from storage", e);
    }
  };

  // xử lí khi dữ liệu thay đổi
  useEffect(() => {
    readFavorite();
  }, []);


  // xử lí trạng thái trả về từ PlaylistModal
  const turnOffModal = () => {
    setShowPlaylistModal(false);
  };

  return (
    <View>
      {/* Thông tin nhạc */}
      <View style={styles.songInfo}>
        <Text style={{ fontSize: 25 }} numberOfLines={1}>
          {currentAudio.name}
        </Text>
        <Text style={{ fontSize: 20, color: "gray" }}>
          {currentAudio.singer}
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
            setPosTime(convertTime(Math.floor(value * playbackDuration)));
          }}
          onSlidingStart={
            async () => {
              if (!isPlaying) return;
              try {
                await pause(playbackObj);
              } catch (error) {
                console.log('error inside onSlidingStart', error);
              }
            }
          }
          onSlidingComplete={async (value) => {
            if (soundObj === null || !isPlaying) return;
            try {
              const status = await playbackObj.setPositionAsync(Math.floor(soundObj.durationMillis * value));
              updateState(context, { soundObj: status, playbackPosition: status.positionMillis });

              await resume(playbackObj);
            } catch (error) {
              console.log('error inside onSlidingComplete', error);
            }
          }}
        ></Slider>
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>{posTime ? posTime : convertTime(playbackPosition)}</Text>
          <Text style={styles.progressLabelText}>{convertTime(playbackDuration)}</Text>
        </View>
      </View>

      {/* thanh chứa các nút replay, yêu thích, thêm vào playlist */}
      <View style={[styles.controllerContainer, { height: 60 }]}>
        <TouchableOpacity
          style={[styles.controllerItem, { height: 40, width: 40 }]}
        // onPress={() => {
        //   // isPlaying ? playSoundFirstTime() : replaySoundPause();
        //   const flag = !isRepeat;
        //   setRepeat(flag);
        //   repeatSong(flag);
        // }}
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
            // pauseSound();
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
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={handlePrevious} >
          <Icon name="step-backward" size={35} color="#333" />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Play/Pause */}
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={handlePlayPause}
        >
          <Icon
            name={!isPlaying ? "play" : "pause"}
            size={35}
            color="#333"
          />
        </TouchableOpacity>
        {/* xử lí sự kiện khi nhấn nút Next */}
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={handleNext} >
          <Icon name="step-forward" size={35} color="#333" />
        </TouchableOpacity>
      </View>
      {/* <Text>
        {index.toString()} + {isPlaying.toString()} + {isRepeat.toString()}
      </Text> */}
      <PlaylistModal
        showPlaylistModal={showPlaylistModal}
        onData={turnOffModal}
        songID={currentAudio.id}
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
