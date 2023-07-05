import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';

export default function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogin = () => {
    // Perform login logic here
    // Validate phone number and password
    if (phoneNumber !== '' && password !== '') {
      // Successful login
      alert('Login successful!');
    } else {
      // Invalid phone number or password
      alert('Invalid phone number or password');
    }
  };

  const handleSignup = () => {
    // Perform signup logic here
    // Validate name, phone number, password, and confirm password
    if (name !== '' && phoneNumber !== '' && password !== '' && password === confirmPassword) {
      // Successful signup
      alert('Signup successful!');
    } else {
      // Invalid name, phone number, password, or confirm password
      alert('Invalid name, phone number, password, or confirm password');
    }
  };

  const goToPage = (index) => {
    swiperRef.current.scrollBy(index - currentIndex, true);
  };

  const handleSwitchPress = (index) => {
    if (currentIndex !== index) {
      goToPage(index);
      setCurrentIndex(index);
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, currentIndex === 0 ? styles.activeSwitch : null]}
          onPress={() => handleSwitchPress(0)} // Pass the index explicitly
        >
          <Text style={[styles.switchText, currentIndex === 0 ? styles.activeSwitchText : null]}>
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, currentIndex === 1 ? styles.activeSwitch : null]}
          onPress={() => handleSwitchPress(1)} // Pass the index explicitly
        >
          <Text style={[styles.switchText, currentIndex === 1 ? styles.activeSwitchText : null]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Swiper
        style={styles.wrapper}
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        index={0}
        onIndexChanged={handleIndexChanged}
      >
        {/* Log In Page */}
        <View style={styles.slide}>
          <View style={styles.lineInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.lineInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sign Up Page */}
        <View style={styles.slide}>
          <View style={styles.lineInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Name"
              autoCapitalize="words"
            />
          </View>
          <View style={styles.lineInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.lineInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, selectedRole === 'user' ? styles.selectedRole : null]}
              onPress={() => handleRoleChange('user')}
            >
              <Text style={[styles.roleText, selectedRole === 'user' ? styles.selectedRoleText : null]}>
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, selectedRole === 'caregiver' ? styles.selectedRole : null]}
              onPress={() => handleRoleChange('caregiver')}
            >
              <Text style={[styles.roleText, selectedRole === 'caregiver' ? styles.selectedRoleText : null]}>
                Caregiver
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignup}
          >
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeSwitch: {
    borderColor: '#831F1F',
  },
  switchText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeSwitchText: {
    color: '#831F1F',
  },
  wrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  lineInput: {
    width: '100%',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 10,
    paddingHorizontal: 10,
    opacity: 0.7,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#831F1F',
    borderRadius: 20,
  },
  selectedRole: {
    backgroundColor: '#831F1F',
    borderColor: '#831F1F',
    paddingVertical: 10,
  },
  roleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#831F1F',
  },
  selectedRoleText: {
    color: 'white',
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '100%',
    border: '1px solid #831F1F',
    
  },
  loginButtonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
  loginButtonText: {
    color: '#831F1F',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
