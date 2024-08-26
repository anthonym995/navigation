import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons } from "@expo/vector-icons";
import Feed from "./screens/tabScreens/Feed";
import Notifications from "./screens/tabScreens/Notifications";
import Settings from "./screens/tabScreens/Settings";
import TweetDetailScreen from "./screens/homeStack/TweetDetailScreen";
import Payments from "./screens/drawerScreens/Payments";
import { Pressable, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

// Top Tabs
const TopTabs = createMaterialTopTabNavigator();

const TopTabsGroup = () => {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen name="main" component={Feed} />
      <TopTabs.Screen name="Following" component={Payments} />
      <TopTabs.Screen name="Followers" component={Payments} />
    </TopTabs.Navigator>
  );
};

// Stack
const HomeStack = createNativeStackNavigator();

const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
        options={{ presentation: "containedModal" }}
      />
    </HomeStack.Navigator>
  );
};

// Tab bottom
const Tab = createBottomTabNavigator();

function TabGroup({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "green",
      })}
    >
      <Tab.Screen
        name="Feed"
        component={TopTabsGroup}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

const DrawerGroup = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeStackGroup" component={HomeStackGroup} />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={currentTheme === "Dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
}
