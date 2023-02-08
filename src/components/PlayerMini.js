import Slider from "@react-native-community/slider";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const PlayerMini = () => {
    const [playing, setPlaying] = useState(false);
    return (
        <TouchableOpacity style={styles.view}
        // onPress={() => { Alert.alert("clicked") }}
        >
            <Slider

                disabled={true}
                value={0.15}
            ></Slider>
            <Text style={{ fontSize: 10, color: "blue" }}>Nang am xa dan</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        setPlaying(!playing);
                    }}
                >
                    <Icon
                        name={playing ? "play" : "pause"}
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1 }}
                >
                    <Icon
                        name={"step-forward"}
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    );
};


export default PlayerMini;

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'red',
        height: 50,

    },
});