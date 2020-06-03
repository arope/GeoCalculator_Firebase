import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalculatorScreen from './screens/CalculatorScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={navStyling}>
          <Stack.Screen name="Geo Calculator" component={CalculatorScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: '#0065A4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    flex: 1,
  },
});
