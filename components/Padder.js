import React from "react";
import { View, StyleSheet } from "react-native";

const Padder = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 10,
  },
});

export default Padder;
