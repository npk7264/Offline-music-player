import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

import Song from "../screens/Song";
import Playlist from "../screens/Playlist";
import Favorite from "../screens/Favorite";
import Recent from "../screens/Recent";

const Tab = createBottomTabNavigator();

export default BottomMenu = () => {
  return (
    <Tab.Navigator
      initialRouteName="Song"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Song"
        component={Song}
        options={{ tabBarLabelStyle: styles.menuTitle }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{ tabBarLabelStyle: styles.menuTitle }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{ tabBarLabelStyle: styles.menuTitle }}
      />
      <Tab.Screen
        name="Recent"
        component={Recent}
        options={{ tabBarLabelStyle: styles.menuTitle }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  menuTitle: { fontSize: 14, fontWeight: "500" },
});
