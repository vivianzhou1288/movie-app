import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "black",
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                color={focused ? "white" : "#D3D3D3"}
                size={30}
              />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Search"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                color={focused ? "white" : "#D3D3D3"}
                size={30}
              />
            ),
          }}
          component={SearchScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//
