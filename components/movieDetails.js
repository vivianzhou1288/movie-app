import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "./cast";

var { width, height } = Dimensions.get("window");

export default function MovieDetails({ item }) {
  useEffect(() => {
    //call the movie details api
  }, [item]);

  const [cast, setCast] = useState([1, 2, 3, 4, 5]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-black"
    >
      <View className="w-full">
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={{ width: width, height: height * 0.43 }}
            className="rounded-xl"
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.2 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/*title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          Ant-Man and the Wasp: Quantumania
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released ⋅ 2020 ⋅ 170 min
        </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action ⋅
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill ⋅
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide text-center">
          Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along
          with Hope's parents and Scott's daughter Cassie. Together they must
          find a way to escape, but what secrets is Hope's mother hiding? And
          who is the mysterious Kang?
        </Text>

        {/* cast */}
        <Cast cast={cast} />
      </View>
    </ScrollView>
  );
}
