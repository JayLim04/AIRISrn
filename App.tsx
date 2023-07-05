import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from 'firebase/auth'
import loginScreen from "./screens/LoginScreen";
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"   screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Login" component={loginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
