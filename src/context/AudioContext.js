import { useState, createContext } from "react";

const AudioContext = createContext();

function AudioProvider({ children }) {
  // trạng thái nhạc
  const [audioState, setAudioState] = useState({
    audioFiles: [],
    playbackObj: null,
    soundObj: null,
    isPlaying: false,
    isLooping: false,
    activePlayList: [],
    pressedInfo: {},
    currentIndex: null,
    currentInfo: {},
    currentPlaylist: [],
    currentPosition: null,
    currentDuration: null,
  });
  //   thông tin nhạc click vào
  const [pressedInfo, setPressedInfo] = useState({
    index: null,
    info: {},
    songdata: [],
  });

  //   cập nhật trạng thái nhạc
  const updateState = (newState) => setAudioState(newState);
  //   cập nhật thông tin nhạc khi click vào
  const updatePressedInfo = (newInfo) => setPressedInfo(newInfo);

  const value = {
    audioState,
    updateState,
    pressedInfo,
    updatePressedInfo,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
