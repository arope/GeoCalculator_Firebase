import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";


const SettingsScreen = ({ route, navigation }) => {
  const {defaultDistanceUnits, defaultBearingUnits} = route.params;
  const [selectedDistanceUnits, setSelectedDistanceUnits] = useState(defaultDistanceUnits);
  const [selectedBearingUnits, setSelectedBearingUnits] = useState(defaultBearingUnits);

  const distanceUnits = [
    {
      value: "Miles",
    },
    {
      value: "Kilometers",
    },
  ];

  const bearingUnits = [
    {
      value: "Degrees",
    },
    {
      value: "Mils",
    },
  ];

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Geo Calculator')}>
        <Text style={styles.headerButton}> Cancel </Text>
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          // navigate back with new settings.
          navigation.navigate('Geo Calculator', {
            selectedDistanceUnits,
            selectedBearingUnits,
          });
        }}
      >
        <Text style={styles.headerButton}> Save </Text>
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
          <View >
            <Dropdown
              value={selectedDistanceUnits}
              onChangeText={(text) => setSelectedDistanceUnits(text)}
              label="Distance Units"
              data={distanceUnits}
            />
          </View>
          <View>
            <Dropdown
              value={selectedBearingUnits}
              onChangeText={(text) => setSelectedBearingUnits(text)}
              label="Bearing Units"
              data={bearingUnits}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  headerButton: {
    color: '#fff',
    fontWeight: 'bold',
  },

});

export default SettingsScreen;
