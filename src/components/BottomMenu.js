import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Song from "../screens/Song";
import Playlist from "../screens/Playlist";
import Favorite from "../screens/Favorite";
import Recent from "../screens/Recent";

const Tab = createBottomTabNavigator();

export default BottomMenu = () => {
  return (
    <Tab.Navigator
      initialRouteName="Bài hát"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Bài hát"
        component={Song}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="music"
              size={24}
              // color={focused ? "#e32f45" : "#748c94"}
              color={focused ? "tomato" : "#4D8D6E"}
            />
          ),
          tabBarInactiveTintColor: "#4D8D6E",
          tabBarActiveTintColor: "tomato",
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              size={24}
              color={focused ? "tomato" : "#4D8D6E"}
            />
          ),
          tabBarInactiveTintColor: "#4D8D6E",
          tabBarActiveTintColor: "tomato",
        }}
      />
      <Tab.Screen
        name="Yêu thích"
        component={Favorite}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="heart"
              size={24}
              color={focused ? "tomato" : "#4D8D6E"}
            />
          ),
          tabBarInactiveTintColor: "#4D8D6E",
          tabBarActiveTintColor: "tomato",
        }}
      />
      <Tab.Screen
        name="Gần đây"
        component={Recent}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={focused ? "tomato" : "#4D8D6E"}
            />
          ),
          tabBarInactiveTintColor: "#4D8D6E",
          tabBarActiveTintColor: "tomato",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  menuTitle: { fontSize: 14, fontWeight: "500" },
});
