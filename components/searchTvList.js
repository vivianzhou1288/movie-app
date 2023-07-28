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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { image185, fallbackMoviePoster } from "../api/moviedb";
import TvDetails from "./tvDetails";

const { width, height } = Dimensions.get("window");

export default function SearchTvList({ tv, changeLoading }) {
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
              <TvDetails item={item} />
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
          {tv.map((item, index) => {
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
                    {item.name.length > 20
                      ? item.name.slice(0, 20) + "..."
                      : item.name}
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
