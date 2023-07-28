import { SafeAreaView, View, Text, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Trending from "../components/trending";
import MovieList from "../components/movieList";
import TvList from "../components/tvList";
import Loading from "../components/loading";
import Upcoming from "../components/upcoming";
import {
  fetchTopRatedMovies,
  fetchTopRatedTv,
  fetchTrending,
  fetchPopularMovies,
  fetchPopularTv,
} from "../api/moviedb";
import ToggleButton from "../components/toggleButton";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("movies");
  const [active2, setActive2] = useState("movies");

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

  const getPopularTv = async () => {
    const data = await fetchPopularTv();
    if (data && data.results) setPopularTv(data.results.slice(11, 20));
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results.slice(0, 10));
    setLoading(false);
  };

  const getTopRatedTv = async () => {
    const data = await fetchTopRatedTv();
    if (data && data.results) setTopRatedTv(data.results.slice(0, 10));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getTrending();
    getTopRatedMovies();
    getTopRatedTv();
    getPopularMovies();
    getPopularTv();
  }, []);

  const printButtonLabel = (id) => {
    if (id === 0) {
      setActive("movies");
    } else {
      setActive("tv");
    }
  };

  const printButtonLabel2 = (id) => {
    if (id === 0) {
      setActive2("movies");
    } else {
      setActive2("tv");
    }
  };

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
          <View className="mt-10 mx-4 flex-row  items-center">
            <Text className="text-white text-xl font-semibold mr-3">
              Popular
            </Text>
            <ToggleButton
              buttons={["Movies", "Shows"]}
              doSomethingAfterClick={printButtonLabel}
            />
          </View>

          {active === "movies" && <MovieList data={popularMovies} />}

          {active === "tv" && <TvList data={popularTv} />}

          {/* Upcoming */}
          <Upcoming />

          <View className="mt-7 mx-4 flex-row  items-center">
            <Text className="text-white text-xl font-semibold mr-3">
              Top-Rated
            </Text>
            <ToggleButton
              buttons={["Movies", "Shows"]}
              doSomethingAfterClick={printButtonLabel2}
            />
          </View>

          {/* Top Rated row */}
          {active2 === "movies" && (
            <MovieList
              title="Top-Rated"
              data={topRatedMovies}
              size={"big"}
              text={"none"}
            />
          )}

          {active2 === "tv" && (
            <TvList
              title="Top-Rated"
              data={topRatedTv}
              size={"big"}
              text={"none"}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}
