import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      Alert.alert('Signup Successful', 'You can now login with your credentials.');

      // Navigate to the login screen after successful signup
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#EA7520', '#04202F']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header Text and Image */}
        <Image source={require('../assets/images/Icon58.png')} style={styles.logo} />
        <Text style={styles.headerText}>FlickFeed</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login button to navigate to the login screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
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
    color: '#FF2E00',
    fontSize: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#EA7520',
    textAlign: 'center',
    fontSize: 16,
  },
  loginText: {
    color: 'white',
    marginTop: 20,
  },
});

export default SignupScreen;
