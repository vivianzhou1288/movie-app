import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Modal,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Loading from "./loading";
import { MaterialIcons } from "@expo/vector-icons";
import MovieDetails from "../components/movieDetails";
import { image185, fallbackMoviePoster } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function SearchList({ loading, search, movies }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <View className="flex-row justify-between flex-wrap">
          <Modal visible={modalOpen} animationType="slide">
            <SafeAreaView className="flex-1 bg-black">
              <MovieDetails item={item} />
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
          {movies.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleClick(item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    className="rounded-2xl"
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-gray-300 ml-1">
                    {item.title.length > 20
                      ? item.title.slice(0, 20) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
