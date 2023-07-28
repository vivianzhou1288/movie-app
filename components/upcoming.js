import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { upcomings } from "../constants/upcoming";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");

const UpcomingCard = ({ movie }) => (
  <View className="bg-[#00022e] ml-3 rounded-xl">
    <Image
      className="rounded-t-xl"
      style={{ width: width * 0.95, height: height * 0.23 }}
      source={{ uri: movie.picture }}
    />
    <TouchableOpacity
      className="absolute mt-[70px] mx-[167px]"
      onPress={() => Linking.openURL(movie.trailer)}
    >
      <FontAwesome5 name="play" size={45} color={"white"} />
    </TouchableOpacity>
    <Text className="text-[20px] font-semibold text-white mt-3 ml-2">
      {movie.title}
    </Text>
    <Text className="text-white font-semibold mt-3 ml-2">{movie.date}</Text>
    <Text className="text-white font-semibold mt-3 mb-3 ml-2">
      {movie.type}
    </Text>
  </View>
);

export default function Upcoming() {
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl font-semibold">Upcoming</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ontentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {upcomings.map((movie) => (
          <UpcomingCard key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
}
