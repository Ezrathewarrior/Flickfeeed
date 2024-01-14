import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import * as Font from 'expo-font';

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'fugaz-one-regular': require('../assets/FugazOne-Regular.ttf'),
    });
  } catch (error) {
    console.error('Error loading fonts:', error);
  }
};

loadFonts(); // Load fonts before rendering

const ProfileScreen = () => {
  const profileImageUri = require('../assets/images/Icon58.png');
  const userName = 'Ezra';

  useEffect(() => {
    loadFonts(); // Load fonts in the useEffect to ensure it is done after the initial render
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#EA7520', '#04202F']}
        style={styles.gradientContainer}
      >
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={profileImageUri} style={styles.profileImage} />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          {/* Other components and logic */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'top',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 16,
  },
  userName: {
    fontSize: 36,
    fontStyle: 'normal', // Fixed fontStyle
    fontWeight: '400', // Adjusted fontWeight to a string
    letterSpacing: 2.88, // Removed semicolon
    color: 'white',
    fontFamily: 'fugaz-one-regular',
    color: 'white',
    fontFamily: 'fugaz-one-regular',
  },
});

export default ProfileScreen;
