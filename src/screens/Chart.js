import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";
import Title from "../components/Title";
import Icon from "react-native-vector-icons/FontAwesome";

import { songData } from "../../data/songData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT = "RECENT";

const Chart = () => {
  const [listRecent, setListRecent] = useState([]);
  const [timeFilter, setTime] = useState("day");

  const readRecent = async () => {
    try {
      const value = await AsyncStorage.getItem(RECENT);
      if (value !== null) {
        setListRecent(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the RECENT from storage");
    }
  };

  // refesh khi nhấn vào tab
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log("refresh RECENT PAGE");
    readRecent();
  }, [isFocused]);

  // useEffect(() => {
  //   console.log(
  //     filterResult.map((item) => {
  //       return { id: item.id, times: item.time.length };
  //     })
  //   );
  // }, [timeFilter]);

  // hàm lọc danh sách nhạc theo ngày, tháng, năm
  const filterResult = listRecent.map((item) => {
    const date = new Date();
    // lọc time
    const filterTime = item.time.filter((t) => {
      const tdate = new Date(t);
      // lọc ngày hôm nay
      return timeFilter === "day"
        ? tdate.getDate() === date.getDate() &&
            tdate.getMonth() === date.getMonth() &&
            tdate.getFullYear() === date.getFullYear()
        : // lọc theo tháng hiện tại
        timeFilter === "month"
        ? tdate.getMonth() === date.getMonth()
        : // lọc theo năm hiện tại
          tdate.getFullYear() === date.getFullYear();
    });
    // cập nhật time mới cho item
    return { id: item.id, time: filterTime };
  });

  const recentData = [...filterResult]
    // lọc danh sách với lần nghe > 0
    .filter((item) => item.time.length !== 0)
    // sắp xếp theo thứ tự nghe nhiều nhất
    .sort(function (a, b) {
      return b.time.length - a.time.length;
    })
    // map danh sách
    .map((item) => {
      return {
        id: item.id,
        name: songData[item.id].name,
        singer: songData[item.id].singer,
        uri: songData[item.id].uri,
      };
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      {/* thanh tìm kiếm */}
      <SearchBar />

      {/* Title */}
      <Title title={"Nghe nhiều"} />

      {/* Lọc */}
      <View
        style={{
          paddingHorizontal: 20,
          height: 60,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setTime("day");
          }}
        >
          <Text style={{ fontSize: 18 }}>Hôm nay</Text>
          <Icon
            name={timeFilter === "day" ? "circle" : "circle-o"}
            size={25}
            color="#4D8D6E"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setTime("month");
          }}
        >
          <Text style={{ fontSize: 18 }}>Trong tháng</Text>
          <Icon
            name={timeFilter === "month" ? "circle" : "circle-o"}
            size={25}
            color="#4D8D6E"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setTime("year");
          }}
        >
          <Text style={{ fontSize: 18 }}>Trong năm</Text>
          <Icon
            name={timeFilter === "year" ? "circle" : "circle-o"}
            size={25}
            color="#4D8D6E"
          />
        </TouchableOpacity>
      </View>

      {/* Danh sách bài hát */}
      {recentData.length === 0 ? (
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "gray" }}>Chưa có dữ liệu</Text>
        </View>
      ) : null}
      <FlatList
        style={{ flex: 1 }}
        data={recentData}
        renderItem={({ item }) => (
          <SongItem info={item} songdata={recentData} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({});
