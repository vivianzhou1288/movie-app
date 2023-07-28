import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "./cast";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchVideos,
} from "../api/moviedb";
import { image500 } from "../api/moviedb";
import SuggestedMovieList from "./suggestedMoviesList";
import { Ionicons } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");
const youtubeBaseURL = "https://www.youtube.com/watch";

export default function MovieDetails({ item }) {
  const [movie, setMovie] = useState({});

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    if (data && data.cast) setCast(data.cast.slice(0, 20));
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    if (data && data.results) setSimilarMovies(data.results.slice(0, 5));
  };

  const getVideos = async (id) => {
    const data = await fetchVideos(id);
    if (data && data.results.length > 0) {
      const url = `${youtubeBaseURL}?v=${
        data.results[data.results.length - 1].key
      }`;
      setURL(url);
    }
  };

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    getVideos(item.id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1700,
    }).start();
  }, [item]);

  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [active, setActive] = useState("Cast");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [url, setURL] = useState("https://www.youtube.com/watch?v=YQZJinEtFlM");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-black"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <View className="w-full">
          <View>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
              <View>
                <Image
                  source={{
                    uri: image500(movie?.poster_path) || fallbackMoviePoster,
                  }}
                  style={{ width: width, height: height * 0.4 }}
                  className="rounded-xl"
                />
                <TouchableOpacity
                  className="absolute mt-[120px] mx-[160px]"
                  onPress={() => Linking.openURL(url)}
                >
                  <Ionicons
                    name="play-circle-outline"
                    size={70}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.25 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>
      </Animated.View>

      {/* movie details */}

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Animated.View style={{ opacity: fadeAnim }}>
          {/*title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider mt-5 mb-3">
            {movie?.title}
          </Text>
          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center mb-3">
              {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
              {movie?.runtime} min
            </Text>
          ) : null}
          <View className="flex-row flex-wrap justify-center mx-4 space-x-2 mb-3">
            {movie?.genres?.map((genre, index) => {
              for (let i = 0; i < 3; i++) {
                return (
                  <View
                    key={index}
                    className="border-none border-[1px] px-[5px] bg-[#D3D3D3] shadow-current"
                  >
                    <Text className="text-neutral-500 font-semibold text-base text-center">
                      {genre?.name}
                    </Text>
                  </View>
                );
              }
            })}
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide text-center mb-3">
            {movie?.overview}
          </Text>
        </Animated.View>

        {/* cast */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <View className="flew flex-row mt-4">
            {cast.length > 0 ? (
              <TouchableOpacity onPress={() => setActive("Cast")}>
                <Text className="text-white text-lg mx-4 font-semibold">
                  Cast
                </Text>
              </TouchableOpacity>
            ) : null}
            {similarMovies.length > 0 ? (
              <TouchableOpacity onPress={() => setActive("Movies")}>
                <Text className="text-white text-lg mx-4 font-semibold">
                  Suggested
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Animated.View style={{ opacity: fadeAnim }}>
            {active === "Cast" && <Cast cast={cast} />}
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            {active === "Movies" && <SuggestedMovieList data={similarMovies} />}
          </Animated.View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
