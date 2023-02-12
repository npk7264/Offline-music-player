import React, { Component, createContext } from 'react';
import { Text, View, Alert } from 'react-native';


export const AudioContext = createContext();
export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            activePlayList: [],
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
        };
    }
    updateState = (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState });
    };

    render() {
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
        } = this.state;

        return (
            <AudioContext.Provider
                value={{
                    audioFiles,
                    playbackObj,
                    soundObj,
                    currentAudio,
                    isPlaying,
                    currentAudioIndex,
                    playbackPosition,
                    playbackDuration,
                    activePlayList,
                    updateState: this.updateState,
                }}
            >
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;
