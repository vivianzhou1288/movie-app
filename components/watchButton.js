import React from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WatchButton({ link }) {
  return (
    <TouchableOpacity
      className="items-center bg-[#CDCDCD] py-[10px] mx-5 rounded-md"
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      <View className="flex-1 flex-row items-center">
        <FontAwesome5 name={"play"} size={13} color={"black"} />
        <Text className="text-black text-[16px] font-semibold ml-3">Watch</Text>
      </View>
    </TouchableOpacity>
  );
}
