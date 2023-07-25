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
import NowPlaying from "../components/nowPlaying";
import MovieList from "../components/movieList";
import Loading from "../components/loading";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [playing, setPlaying] = useState([1, 2, 3]);
  const [trending, setTrending] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="items-center">
          <Text className="text-white text-3xl font-bold mt-3">
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
          <NowPlaying data={playing} />

          {/* Trending movies row */}
          <MovieList title="Trending" data={trending} />

          {/* Top Rated moviews row */}
          <MovieList title="Top-Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
