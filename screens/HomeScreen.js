import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Trending from "../components/trending";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchNowPlayingMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchTrendingShows,
} from "../api/moviedb";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [playing, setPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getNowPlayingMovies = async () => {
    const data = await fetchNowPlayingMovies();
    if (data && data.results) setPlaying(data.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  const getTrendingShows = async () => {
    const data = await fetchTrendingShows();
    if (data && data.results) setTrendingShows(data.results);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getTrendingMovies();
    getNowPlayingMovies();
    getTopRatedMovies();
    getTrendingShows();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="items-center">
          <Text className="text-white text-3xl font-bold mt-3 mb-9">
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
          {/* Now Playing movies carousel */}
          {trending.length > 0 && <Trending data={trending} />}

          {/* Trending movies row */}
          {playing.length > 0 && (
            <MovieList title="Now-Playing" data={playing} />
          )}

          {/* Top Rated movies row */}
          <MovieList title="Top-Rated" data={topRated} />

          {/* Trending TV shows row */}

          <MovieList title="Trending TV Shows" data={trendingShows} />
        </ScrollView>
      )}
    </View>
  );
}
