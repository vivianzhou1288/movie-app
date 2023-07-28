import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  searchMovies,
  fetchDiscoverMovies,
  fetchDiscoverTv,
  searchTv,
} from "../api/moviedb";
import useDebounce from "../constants/useDebounce";
import SearchList from "../components/searchList";
import SearchTvList from "../components/searchTvList";
import Loading from "../components/loading";

export default function SearchScreen() {
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const getAllMovies = async () => {
    const data = await fetchDiscoverMovies();
    if (data && data.results) setMovies(data.results.slice(0, 6));
    setLoading(false);
  };

  const getAllTv = async () => {
    const data = await fetchDiscoverTv();
    if (data && data.results) setTv(data.results.slice(0, 6));
    setLoading(false);
  };

  function getSearchedMovies(name) {
    if (name && name.length > 2) {
      setLoading(true);
      searchMovies({
        query: name,
        include_adult: false,
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setMovies(data.results.slice(0, 10));
      });
    } else {
      setLoading(false);
      setMovies([]);
    }
  }

  function getSearchedTv(name) {
    if (name && name.length > 2) {
      setLoading(true);
      searchTv({
        query: name,
        include_adult: false,
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setTv(data.results.slice(0, 10));
      });
    } else {
      setLoading(false);
      setTv([]);
    }
  }

  useEffect(() => {
    if (search === "") {
      getAllMovies();
      getAllTv();
    } else {
      getSearchedMovies(debouncedSearch);
      getSearchedTv(debouncedSearch);
    }
  }, [debouncedSearch]);

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
            value={search}
            onChangeText={(textInput) => setSearch(textInput)}
            className="pb-1 pl-3 flex-1 text-base text-black tracking-wider h-12 text-[17.5px]"
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <TouchableOpacity className="mr-3" onPress={() => setSearch("")}>
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
                setSearch("");
              }}
            />
          </View>
        )}
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="ml-2 mb-3">
            {search === "" ? (
              <Text className="text-white font-semibold ml-[10px] mt-3">
                Discover
              </Text>
            ) : (
              <Text className="text-white font-semibold ml-3 mt-3">
                Results ({movies.length + tv.length})
              </Text>
            )}
          </View>
          {movies.length + tv.length > 0 ? (
            <ScrollView className="mb-[120px]">
              {movies.length > 0 ? (
                <View>
                  <Text className="text-white ml-[19px] font-semibold mb-3">
                    Movie
                  </Text>
                  <SearchList search={search} movies={movies} />
                </View>
              ) : null}

              {tv.length > 0 ? (
                <View>
                  <Text className="text-white ml-[19px] font-semibold mt-3 mb-3">
                    TV Shows
                  </Text>
                  <SearchTvList tv={tv} />
                </View>
              ) : null}
            </ScrollView>
          ) : (
            <View className="justify-center">
              <Image
                source={require("../assets/images/movieTime.png")}
                className="h-96 w-96"
              />
              <View className="items-center">
                <Text className="text-white text-[25px] mt-[-25px]">
                  No Results
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
