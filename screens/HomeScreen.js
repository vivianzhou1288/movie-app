import { SafeAreaView, View, Text, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Trending from "../components/trending";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import Upcoming from "../components/upcoming";
import {
  fetchTopRatedMovies,
  fetchTrending,
  fetchPopularMovies,
} from "../api/moviedb";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrending = async () => {
    const data = await fetchTrending();
    if (data && data.results) setTrending(data.results.slice(0, 10));
    setLoading(false);
  };

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data && data.results) setPopularMovies(data.results.slice(11, 20));
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results.slice(0, 10));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getTrending();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="items-center">
          <Text className="text-[#FFAE42] text-3xl font-bold mt-3 mb-9">
            WatcherList
          </Text>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending row */}
          {trending.length > 0 && <Trending data={trending} />}

          {/* Popular row */}
          <MovieList title="Popular" data={popularMovies} />

          {/* Upcoming */}
          <Upcoming />

          {/* Top Rated movies row */}
          <MovieList
            title="Top-Rated"
            data={topRated}
            size={"big"}
            text={"none"}
          />
        </ScrollView>
      )}
    </View>
  );
}
