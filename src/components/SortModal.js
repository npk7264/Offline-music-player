import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

// Component sap xep
const SortModal = ({ showSort, Sort, sortOption, Option }) => {
  // truyen trang thai false de tat modal cho trang Song
  const turnOff = () => {
    Sort(false);
  };
  // truyen tuy chon sap xep cho trang Song
  const setOption = (value) => {
    Option(value);
  };

  return (
    <Modal
      visible={showSort}
      onRequestClose={() => {
        turnOff();
      }}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modal}>
        <View
          style={[
            styles.sortTable,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {}}
        >
          <View style={{ height: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Sắp xếp theo
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sortOptionItem}
            onPress={() => {
              setOption("NgayThem");
              turnOff();
            }}
          >
            <Text style={{ fontSize: 18 }}>Ngày thêm</Text>
            <Icon
              name={sortOption == "NgayThem" ? "circle" : "circle-o"}
              size={25}
              color="#4D8D6E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOptionItem}
            onPress={() => {
              setOption("BaiHat");
              turnOff();
            }}
          >
            <Text style={{ fontSize: 18 }}>Tên bài hát</Text>
            <Icon
              name={sortOption == "BaiHat" ? "circle" : "circle-o"}
              size={25}
              color="#4D8D6E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOptionItem}
            onPress={() => {
              setOption("NgheSi");
              turnOff();
            }}
          >
            <Text style={{ fontSize: 18 }}>Tên nghệ sĩ</Text>
            <Icon
              name={sortOption == "NgheSi" ? "circle" : "circle-o"}
              size={25}
              color="#4D8D6E"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            turnOff();
          }}
        ></TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    // flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sortTable: {
    height: 200,
    backgroundColor: "white",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  sortOptionItem: {
    height: 40,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
