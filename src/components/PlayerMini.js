import Slider from "@react-native-community/slider";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const PlayerMini = ({ audio }) => {
    const [playing, setPlaying] = useState(false);
    return (
        <TouchableOpacity style={styles.view}
        // onPress={() => { Alert.alert("clicked") }}
        >
            <Slider
                disabled={true}
                value={0.15}
            ></Slider>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: 15 }}>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: '500' }}>{audio.name}</Text>
                    <Text style={{ fontSize: 14, color: "gray", marginTop: 10 }}>Đức Phúc</Text>
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