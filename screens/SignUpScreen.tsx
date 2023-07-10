import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback, 
  Switch
} from "react-native";
import React, { useState, useRef } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmpassword, setcfmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  const navigation = useNavigation();
  const dbRef = collection(db, "users");
  const data = {
    email: email,
    firstName: fname,
    lastName: lname,
    caretaker: isEnabled
  }
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await addDoc(dbRef,data);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.switchText]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.switchButton, styles.activeSwitch]}>
          <Text style={[styles.switchText, styles.activeSwitchText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
      {/* Sign Up Page */}
      <View style={styles.slide}>
        <View style={styles.lineInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.lineInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.lineInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setcfmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.lineInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setfName(text)}
            placeholder="First name"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.lineInput}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setlName(text)}
            placeholder="Last name"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.container}>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
        <TouchableOpacity style={styles.loginButton} onPress={signUp}>
          <View style={styles.loginButtonContent}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeSwitch: {
    borderColor: "#831F1F",
  },
  switchText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  activeSwitchText: {
    color: "#831F1F",
  },
  wrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  lineInput: {
    width: "100%",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.7)",
    marginBottom: 10,
    paddingHorizontal: 10,
    opacity: 0.7,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#831F1F",
    borderRadius: 20,
  },
  selectedRole: {
    backgroundColor: "#831F1F",
    borderColor: "#831F1F",
    paddingVertical: 10,
  },
  roleText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#831F1F",
  },
  selectedRoleText: {
    color: "white",
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "white",
    width: "100%",
    border: "1px solid #831F1F",
  },
  loginButtonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#831F1F",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
