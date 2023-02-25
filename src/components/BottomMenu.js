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
import Chart from "../screens/Chart";

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
              color={focused ? "#4D8D6E" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#4D8D6E",
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
              color={focused ? "#4D8D6E" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#4D8D6E",
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
              color={focused ? "#4D8D6E" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#4D8D6E",
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
              color={focused ? "#4D8D6E" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#4D8D6E",
        }}
      />
      <Tab.Screen
        name="My top"
        component={Chart}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="bar-graph"
              size={24}
              color={focused ? "#4D8D6E" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#4D8D6E",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  menuTitle: { fontSize: 14, fontWeight: "500" },
});
