import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

// Import navigation functions
import { useNavigation } from '@react-navigation/native';

// Import the fetchUserData function
import fetchUserData from '../services/userService'; // Adjust the import path

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get navigation object
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Perform login
      await signInWithEmailAndPassword(auth, email, password);
  
      // After successful login, update the user's profile
      const userToUpdate = auth.currentUser;
  
      // Fetch user data
      const userData = await fetchUserData(userToUpdate.uid);
  
      // Check if userData is not null before accessing properties
      if (userData) {
        // Dynamically set the userStoredProfileImageUri based on user data
        const userStoredProfileImageUri = userData.profileImageUri;
  
        // Update the user's profile with the dynamically set image URI
        await updateProfile(userToUpdate, {
          photoURL: userStoredProfileImageUri,
        });
  
        Alert.alert('Login Successful', 'You are now logged in.');
  
        // ... (additional logic)
      } else {
        // Handle the case where userData is null
        console.error('User data is null.');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }

    console.log('User Details:', user);
  };

  // Function to navigate to SignUp screen
  const goToSignUp = () => {
    navigation.navigate('SignUp'); // Adjust the screen name if needed
  };

  return (
    <LinearGradient
      colors={['#EA7520', '#04202F']} // Adjust the gradient colors as needed
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/Icon58.png')} // Adjust the image path as needed
          style={styles.logo}
        />
        <Text style={styles.headerText}>FlickFeed</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white" // Change placeholder text color
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white" // Change placeholder text color
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Go to Sign Up Button */}
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signUpText}>Go to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 100,
  },
  headerText: {
    color: '#FF2E00', // Change text color to contrast with the gradient
    fontSize: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white', // Change border color to contrast with the gradient
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    color: 'white', // Change text color to contrast with the gradient
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#EA7520', // Adjust the text color to your preference
    textAlign: 'center',
    fontSize: 16,
  },
  signUpText: {
    color: 'white', // Change text color to contrast with the gradient
    marginTop: 20,
  },
});

export default LoginScreen;
