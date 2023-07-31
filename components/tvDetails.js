import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Linking,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "./cast";
import {
  fallbackMoviePoster,
  fetchTvCredits,
  fetchTvDetails,
  fetchSimilarTv,
  fetchTvVideos,
} from "../api/moviedb";
import { image500 } from "../api/moviedb";
import TvList from "./tvList";
import WatchButton from "./watchButton";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");

export default function TvDetails({ item }) {
  const [tv, setTv] = useState({});

  const youtubeBaseURL = "https://www.youtube.com/watch";

  const getTvDetails = async (id) => {
    const data = await fetchTvDetails(id);
    if (data) setTv(data);
  };

  const getTvCredits = async (id) => {
    const data = await fetchTvCredits(id);

    if (data && data.cast) setCast(data.cast.slice(0, 20));
  };

  const getSimilarTv = async (id) => {
    const data = await fetchSimilarTv(id);

    if (data && data.results) setSimilarTv(data.results.slice(0, 5));
  };

  const getVideos = async (id) => {
    const data = await fetchTvVideos(id);
    if (data && data.results > 0) {
      const url = `${youtubeBaseURL}?v=${
        data.results[data.results.length - 1].key
      }`;
      setURL(url);
    }
  };

  useEffect(() => {
    getTvDetails(item.id);
    getTvCredits(item.id);
    getSimilarTv(item.id);
    getVideos(item.id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1700,
    }).start();
  }, [item]);

  const [cast, setCast] = useState([]);
  const [similarTv, setSimilarTv] = useState([]);
  const [active, setActive] = useState("Cast");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [url, setURL] = useState("https://www.youtube.com/watch?v=6zBf_aHWyrc");

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
                    uri: image500(tv?.poster_path) || fallbackMoviePoster,
                  }}
                  style={{ width: width, height: height * 0.43 }}
                  className="rounded-xl"
                />
                <TouchableOpacity
                  className="absolute mt-[130px] mx-[173px]"
                  onPress={() => Linking.openURL(url)}
                >
                  <FontAwesome5 name="play" size={50} color={"lightgray"} />
                </TouchableOpacity>
                { item.vote_average ? (<View
                  className="absolute right-5 top-2 elevation-8 bg-yellow-500 px-2 py-0.5 rounded-xl rounded-bl-xl"
                  styles={{ width: width * 0.3 }}
                >
                  <View
                    className="flex-row items-center"
                  ><Ionicons name="heart" size={30} color={"#fa2a55"} />
                    <Text className="text-[#fa2a55] font-bold ml-1">
                      {(Math.round(item.vote_average * 10) / 10).toFixed(1)}
                    </Text></View></View>) : null} 
              </View>
              
            </TouchableWithoutFeedback>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.3 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>
      </Animated.View>

      {/* tv details */}

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Animated.View style={{ opacity: fadeAnim }}>
          {/*title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider mb-3">
            {tv?.name}
          </Text>
          {tv.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center mb-3">
              {tv?.number_of_seasons}{" "}
              {tv?.number_of_seasons > 1 ? (
                <Text>seasons</Text>
              ) : (
                <Text>season</Text>
              )}{" "}
              • {tv?.number_of_episodes} eps
            </Text>
          ) : null}
          <View className="flex-row justify-center mx-4 space-x-2 mb-3">
            {tv?.genres?.slice(0, 3).map((genre, index) => {
              return (
                <View
                  key={index}
                  className="border-none border-[1px] px-[7px] bg-[#192841] shadow-current rounded-md py-[3px]"
                >
                  <Text className="text-[#CDCDC5] font-semibold text-base text-center">
                    {genre?.name}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Watch Button
          <WatchButton link={tv?.homepage} /> */}

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide text-center mb-3">
            {tv?.overview}
          </Text>
        </Animated.View>

        {/* cast */}
        <Animated.View style={{ opacity: fadeAnim, height: height * 0.3 }}>
          <View className="flew flex-row mt-4">
            {cast.length > 0 ? (
              <TouchableOpacity onPress={() => setActive("Cast")}>
                <Text className="text-white text-lg mx-4 font-semibold">
                  Cast
                </Text>
              </TouchableOpacity>
            ) : null}
            {similarTv.length > 0 ? (
              <TouchableOpacity onPress={() => setActive("TV")}>
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
            {active === "TV" && <TvList data={similarTv} text={"yes"} />}
          </Animated.View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
