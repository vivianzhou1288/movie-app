import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MovieDetails from "../components/movieDetails";
import { searchMovies } from "../api/moviedb";
import Loading from "../components/loading";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");
const movieName = "Ant-Man and the Wasp: Quantumania";

export default function SearchScreen() {
  const ref = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([1, 2, 3, 4]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState({});
  const handleClick = (item) => {
    setModalOpen(true);
    setItem(item);
  };

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setSearch(search);
      searchMovies({
        query: search,
      }).then((data) => {
        console.log("got search results");
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center">
        <View
          className={
            clicked === false
              ? "mx-4 mb-3 mt-2 flex-row justify-between items-center border border-white rounded-full bg-white"
              : "mx-4 mb-3 mt-2 flex-row justify-between items-center border border-white rounded-full bg-white w-[70%]"
          }
        >
          <Feather name="search" size={20} style={{ marginLeft: 10 }} />
          <TextInput
            placeholder="Search by title"
            placeholderTextColor={"#9A9A9A"}
            onChangeText={handleTextDebounce}
            className="pb-1 pl-3 flex-1 text-base text-black tracking-wider h-12 text-[17.5px]"
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <TouchableOpacity className="mr-3">
              <Ionicons name={"close-circle-outline"} size={25} />
            </TouchableOpacity>
          )}
        </View>
        {clicked && (
          <View>
            <Button
              title="Cancel"
              color="white"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            />
          </View>
        )}
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1 mt-3">Results</Text>
          <View className="flex-row justify-between flex-wrap">
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
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleClick(item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-2xl"
                      source={require("../assets/images/moviePoster2.png")}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-400 ml-1 items-center">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
