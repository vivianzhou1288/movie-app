import { useNavigation } from "@react-navigation/native";
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
import Carousel from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import MovieDetails from "./movieDetails";

var { width, height } = Dimensions.get("window");
export default function NowPlaying({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});
  return (
    <View>
      <Text className="text-white text-xl mx-4 mt-10 mb-5 font-semibold">
        Now Playing
      </Text>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView className="flex-1 bg-black">
          <MovieDetails item={item} />
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
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <View className="items-center">
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={require("../assets/images/moviePoster1.png")}
          style={{
            width: width * 0.6,
            height: height * 0.4,
          }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
      <Text className="text-white mt-4 mb-8 text-2xl font-semibold">
        Captain Marvel
      </Text>
    </View>
  );
};
