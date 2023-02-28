import Slider from "@react-native-community/slider";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AudioContext } from "../context/AudioProvider";
const PlayerMini = () => {
    const context = useContext(AudioContext);
    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);
    return (
        <TouchableOpacity style={styles.view}
        //onPress={navigation.navigate("Player", { info: context.currentAudio, songdata: context.audioFiles })}
        >
            <Slider
                disabled={true}
                value={0.15}
            ></Slider>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: 15 }}>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: '500' }}>{context.currentAudio.name}</Text>
                    <Text style={{ fontSize: 14, color: "gray", marginTop: 10 }}>{context.currentAudio.singer}</Text>
                </View>

                <View style={styles.controllerContainer}>
                    <TouchableOpacity
                        style={styles.controllerItem}
                        onPress={() => {
                            setPlaying(!playing);
                        }}
                    >
                        <Icon
                            name={playing ? "play" : "pause"}
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