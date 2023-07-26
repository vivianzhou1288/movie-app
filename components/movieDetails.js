import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "./cast";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/moviedb";
import { image500 } from "../api/moviedb";
import MovieList from "./movieList";
import { Motion } from "@legendapp/motion";
import { fadeIn } from "../utils/motion";

var { width, height } = Dimensions.get("window");

export default function MovieDetails({ item }) {
  const [movie, setMovie] = useState({});

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    if (data && data.results) setSimilarMovies(data.results);
  };

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1700,
    }).start();
  }, [item]);

  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [active, setActive] = useState("Cast");
  const [fadeAnim] = useState(new Animated.Value(0));

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-black"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <View className="w-full">
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width: width, height: height * 0.43 }}
              className="rounded-xl"
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
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
          <Text className="text-white text-center text-3xl font-bold tracking-wider mb-3">
            {movie?.title}
          </Text>
          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center mb-3">
              {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
              {movie?.runtime} min
            </Text>
          ) : null}
          <View className="flex-row justify-center mx-4 space-x-2 mb-3">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre?.name} {showDot ? "•" : null}
                </Text>
              );
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
            <TouchableOpacity onPress={() => setActive("Cast")}>
              <Text className="text-white text-lg mx-4 font-semibold">
                Cast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive("Movies")}>
              <Text className="text-white text-lg mx-4 font-semibold">
                Suggested
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={{ opacity: fadeAnim }}>
            {active === "Cast" && <Cast cast={cast} />}
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            {active === "Movies" && <MovieList data={similarMovies} />}
          </Animated.View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
