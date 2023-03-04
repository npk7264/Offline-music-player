import { Audio } from "expo-av";
import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT = "RECENT";

const saveRecent = async (contextAudio, id) => {
  let listRecent = [];
  try {
    // ĐỌC DỮ LIỆU từ Async Storage để set ListRecent
    const value = await AsyncStorage.getItem(RECENT);
    if (value !== null) {
      listRecent = JSON.parse(value);
      // LƯU DỮ LIỆU mới
      let jsonValue = JSON.parse(value);
      // thời gian các lần nghe
      let timeList = jsonValue
        .filter((item) => {
          return item.id == id;
        })
        .map((item) => item.time)[0];
      if (timeList == undefined) timeList = [];
      // console.log(jsonValue);
      // kiểm tra dữ liệu nghe gần đây có bài hát đang phát chưa, nếu có => remove => thêm mới
      if (jsonValue.map((item) => item.id).includes(id)) {
        jsonValue = jsonValue.filter((item) => {
          return item.id != id;
        });
      }
      //lưu
      await AsyncStorage.setItem(
        RECENT,
        JSON.stringify([
          {
            id: id,
            time: [...timeList, new Date()],
          },
          ...jsonValue,
        ])
      );
    } else
      await AsyncStorage.setItem(
        RECENT,
        JSON.stringify([{ id: id, time: [new Date()] }])
      );
    // await AsyncStorage.removeItem(RECENT)
  } catch (e) {
    alert("Failed to fetch the RECENT from storage");
  }
};

//dừng phát
export const pauseSong = async (contextAudio) => {
  console.log("pause");
  const status = await contextAudio.audioState.soundObj.pauseAsync();
  contextAudio.updateState({
    ...contextAudio.audioState,
    playbackObj: status,
    isPlaying: false,
    currentPosition: status.positionMillis,
  });
};

// phát bài hát mới
const playNewSong = async (contextAudio, index, info, songdata) => {
  try {
    await contextAudio.audioState.soundObj.stopAsync();
    await contextAudio.audioState.soundObj.unloadAsync();

    // file nhac
    const uri = songdata[index].uri;
    const { sound, status } = await Audio.Sound.createAsync(
      songdata[index].id < songData.length ? songdata[index].uri : { uri },
      {},
      (status) => {
        if (status.isLoaded && status.didJustFinish) {
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
    saveRecent(contextAudio, info.id);
  } catch (error) {
    console.log("error inside playNewSong helper method", error.message);
  }
};

//
export const handleAudioPress = async (contextAudio, index, info, songdata) => {
  try {
    // thông tin item click vào
    contextAudio.updatePressedInfo({
      ...contextAudio.pressedInfo,
      index: index,
      info: info,
      songdata: songdata,
    });
    // phát nhạc lần đầu
    if (contextAudio.audioState.soundObj === null) {
      // file nhac
      const uri = songdata[index].uri;
      const { sound, status } = await Audio.Sound.createAsync(
        songdata[index].id < songData.length ? songdata[index].uri : { uri },
        {},
        (status) => {
          if (status.didJustFinish) {
            // pauseSong(contextAudio);
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
      saveRecent(contextAudio, info.id);
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
