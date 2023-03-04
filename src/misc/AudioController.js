import { Audio } from "expo-av";
import { songData } from "../../data/songData";

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
        if (status.isLoaded && status.isPlaying) {
          console.log(status.positionMillis);
          // contextAudio.updateState({
          //   ...contextAudio.audioState,
          //   currentPosition: status.positionMillis,
          // });
        }
        if (status.didJustFinish) {
          // if (songdata.length == 1) playSoundFirstTime(songdata[index].uri);
          // else nextSong();
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
  } catch (error) {
    console.log("error inside playNewSong helper method", error.message);
  }
};

//
export const handleAudioPress = async (contextAudio, index, info, songdata) => {
  // thông tin item click vào
  contextAudio.updatePressedInfo({
    ...contextAudio.pressedInfo,
    index: index,
    info: info,
    songdata: songdata,
  });

  try {
    // phát nhạc lần đầu
    if (contextAudio.audioState.soundObj === null) {
      // file nhac
      const uri = songdata[index].uri;
      const { sound, status } = await Audio.Sound.createAsync(
        songdata[index].id < songData.length ? songdata[index].uri : { uri },
        {},
        (status) => {
          if (status.isLoaded && status.isPlaying) {
            console.log(status.positionMillis);
            // contextAudio.updateState({
            //   ...contextAudio.audioState,
            //   currentPosition: status.positionMillis,
            // });
          }
          if (status.didJustFinish) {
            // if (songdata.length == 1) playSoundFirstTime(songdata[index].uri);
            // else nextSong();
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
