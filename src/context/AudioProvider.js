import React, { Component, createContext } from 'react';
import { Text, View, Alert } from 'react-native';

import { play, pause, resume, playNext } from "../misc/audioController";
import { Audio } from "expo-av";

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


    onPlaybackStatusUpdate = async playbackStatus => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            this.updateState(this, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis,
            });
        }


        if (playbackStatus.didJustFinish) {
            if (this.state.isPlayListRunning) {
                let audio;

                const indexOnAllList = this.state.audioFiles.findIndex(
                    ({ id }) => id === audio.id
                );

                const status = await playNext(this.state.playbackObj, audio.uri);
                return this.updateState(this, {
                    soundObj: status,
                    isPlaying: true,
                    currentAudio: audio,
                    currentAudioIndex: indexOnAllList,
                });
            }

            const nextAudioIndex = this.state.currentAudioIndex + 1;
            // there is no next audio to play or the current audio is the last
            if (nextAudioIndex >= this.state.audioFiles.length) {
                this.state.playbackObj.unloadAsync();
                return this.updateState(this, {
                    soundObj: null,
                    currentAudio: this.state.audioFiles[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackDuration: null,
                });
            }
            // otherwise we want to select the next audio
            const audio = this.state.audioFiles[nextAudioIndex];
            const status = await playNext(this.state.playbackObj, audio.uri);
            return this.updateState(this, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex,
            });
        }
    };

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
                    onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
                }}
            >
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;
