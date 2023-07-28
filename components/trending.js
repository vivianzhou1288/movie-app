import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import Carousel from "react-native-snap-carousel-v4";
import { MaterialIcons } from "@expo/vector-icons";
import MovieDetails from "./movieDetails";
import TvDetails from "./tvDetails";
import { fetchMovieDetails, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
export default function Trending({ data }) {
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});

  return (
    <View>
      <Text className="text-white text-xl mx-4 mb-5 mt-2 font-semibold">
        Trending
      </Text>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView className="flex-1 bg-black">
          {item.original_title ? (
            <MovieDetails item={item} />
          ) : (
            <TvDetails item={item} />
          )}

          <View className="mx-5 mt-[70px] absolute">
            <MaterialIcons
              name="close"
              size={30}
              onPress={() => setModalOpen(false)}
              color={"white"}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
        useScrollView={true}
        loop={false}
        loopClonesPerSide={data.length}
        autoplay={false}
        // enableMomentum={false}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <View className="items-center">
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.8,
            height: height * 0.55,
          }}
          className="rounded-2xl"
        />
      </TouchableWithoutFeedback>
      <Text className="text-white mt-4 mb-8 text-2xl font-semibold text-center">
        {item.original_title} {item.original_name}
      </Text>
    </View>
  );
};
