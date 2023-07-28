import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  SafeAreaView,
} from "react-native";
import MovieDetails from "./movieDetails";
import { MaterialIcons } from "@expo/vector-icons";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, size, text }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl font-semibold">{title}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
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
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClick(item)}
            >
              <View className="space-y-1 mr-4">
                {size == "big" ? (
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    className="rounded-lg mr-3"
                    style={{ width: width * 0.5, height: height * 0.4 }}
                  ></Image>
                ) : (
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    className="rounded-2xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                )}
                {text == "yes" ? (
                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item.title}
                  </Text>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
