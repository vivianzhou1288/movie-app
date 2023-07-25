import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";

export default function Cast({ cast }) {
  let personName = "Paul Rudd";
  let characterName = "Scott Lang";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <View key={index} className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={require("../assets/images/castImage1.jpeg")}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
