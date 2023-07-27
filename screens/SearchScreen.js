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
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function SearchScreen() {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [results, setResults] = useState([1, 2, 3, 4]);
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
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            className="pb-1 pl-3 flex-1 text-base text-black tracking-wider h-12 text-[17.5px]"
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <TouchableOpacity
              className="mr-3"
              onPress={() => {
                setSearchPhrase("");
              }}
            >
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <Text className="text-white font-semibold ml-1 mt-3">
          Results ({results.length})
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {results.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                // on
              ></TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
