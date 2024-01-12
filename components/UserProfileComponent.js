import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const UserProfileComponent = ({ name }) => {
  // Use the correct path for the local image
  const profilePictureUrl = require('../assets/images/Icon58.png');

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Use 'source' with the imported image directly */}
        <Image source={profilePictureUrl} style={styles.profilePicture} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome {name} 👋</Text>
          <Text style={styles.movieTimeText}>It's movie time!</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationContainer}>
        <Feather name="bell" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  movieTimeText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  notificationContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
});

export default UserProfileComponent;
