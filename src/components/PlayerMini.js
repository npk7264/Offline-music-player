import Slider from "@react-native-community/slider";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AudioContext } from "../context/AudioProvider";
import { play, pause, playNext, resume } from "../misc/audioController";
const PlayerMini = () => {
    const context = useContext(AudioContext);
    const { audioFiles,
        playbackObj,
        soundObj,
        currentAudio,
        isPlaying,
        currentAudioIndex,
        playbackPosition,
        playbackDuration,
        activePlayList,
        updateState, } = context;
    const navigation = useNavigation();

    const convertValueSlider = () => {
        if (playbackPosition !== null && playbackDuration !== null)
            return playbackPosition / playbackDuration;
        return 0;
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

    return (
        <TouchableOpacity style={styles.view}
            onPress={() =>
                navigation.navigate("Player")
                //console.log("player")
            }
        >
            <Slider
                disabled={true}
                value={convertValueSlider()}
            ></Slider>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: 15 }}>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: '500' }}>{context.currentAudio.name}</Text>
                    <Text style={{ fontSize: 14, color: "gray", marginTop: 10 }}>{context.currentAudio.singer}</Text>
                </View>

                <View style={styles.controllerContainer}>
                    <TouchableOpacity
                        style={styles.controllerItem}
                        onPress={handlePlayPause}
                    >
                        {isPlaying}
                        <Icon
                            name={!isPlaying ? "play" : "pause"}
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
    );
};


export default PlayerMini;

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ccc',
        height: 90,
    },
    controllerContainer: {
        flex: 1,
        //backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: "center",
        // flexDirection: "row",
    },
    controllerItem: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
    },
});