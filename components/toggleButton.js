import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

var { width, height } = Dimensions.get("window");

export default function ToggleButton({ buttons, doSomethingAfterClick }) {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (index, id) => {
    setClickedId(id);
    doSomethingAfterClick(index);
  };

  return (
    <View style={styles.container}>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            onPress={(item) => {
              handleClick(index, index);
            }}
            key={index}
            style={[
              index === clickedId ? styles.buttonActive : styles.button,
              index === 0
                ? { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
                : "",
              index === 1
                ? { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
                : "",
            ]}
          >
            <Text style={index === clickedId ? styles.textActive : styles.text}>
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.6,
    flexDirection: "row",
    borderRadius: 10,
  },
  button: {
    flex: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderWidth: 0.5,
    borderColor: "white",
  },
  buttonActive: {
    flex: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  textActive: {
    color: "black",
    fontWeight: "bold",
  },
});
