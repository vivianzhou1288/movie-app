import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { fallbackPersonImage, image185 } from "../api/moviedb";
import MovieList from "./movieList";

export default function Cast({ cast }) {
  return (
    <View className="my-6">
      <View className="flew flex-row"></View>
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
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>
                <Text className="text-white text-xs mt-1 flex flex-wrap">
                  {/* {person.name} */}
                  {person?.original_name.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {/* {person?.character} */}
                  {person?.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
              </View>
            );
          })}
      </ScrollView>
      {/* <MovieList data={similarMovies} /> */}
    </View>
  );
}
