import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from 'firebase/auth'
import loginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { FIREBASE_AUTH } from "./firebaseConfig";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
  <InsideStack.Navigator>
    <InsideStack.Screen name="HomePage" component={MapScreen}></InsideStack.Screen>
  </InsideStack.Navigator>
  );
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log('user',user);
      setUser(user);
    })
  },[]);
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    {user ? (
      <Stack.Screen name="Home" component={InsideLayout} options={{ headerShown: false }} />
    ) : (
      <>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      </>
    )}
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
