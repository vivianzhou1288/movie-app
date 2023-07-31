import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
  SafeAreaView,
} from "react-native";
import { upcomings } from "../constants/upcoming";
import MovieDetails from "./movieDetails";
import TvDetails from "./tvDetails";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");

function UpcomingCard({ movie }) {
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});

  return (
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
      <TouchableOpacity onPress={() => handleClick(movie)}>
        <Text className="text-[20px] font-semibold text-white mt-3 ml-2">
          {movie.title}
          {movie.name}
        </Text>
      </TouchableOpacity>
      <Text className="text-white font-semibold mt-3 ml-2">{movie.date}</Text>
      <Text className="text-white font-semibold mt-3 mb-3 ml-2">
        {movie.type}
      </Text>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView className="flex-1 bg-black">
          {movie.title && <MovieDetails item={item} />}
          {movie.name && <TvDetails item={item} />}
          <View className="mx-5 mt-[70px] absolute">
          <TouchableOpacity className="bg-[#eab308] rounded-xl p-1">
                <MaterialIcons
                  name="close"
                  size={30}
                  onPress={() => setModalOpen(false)}
                  color={"white"}
                />
                </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

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
