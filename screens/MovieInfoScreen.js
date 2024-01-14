import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import TrailerComponent from '../components/TrailerComponent';

const MovieInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { movie } = route.params;
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const isBookmarked = bookmarkedMovies.some((item) => item.id === movie.id);

  // Shorten the overview to a certain number of characters
  const shortenedOverview =
    movie.overview.length > 150 ? `${movie.overview.slice(0, 150)}...` : movie.overview;

  useEffect(() => {
    // You can load bookmarked movies from storage or a database here
    // For simplicity, an empty array is used initially
    setBookmarkedMovies([]);
  }, []);

  const toggleBookmark = () => {
    // Toggle the bookmark state for the specific movie
    if (isBookmarked) {
      // Remove the movie from the bookmarked list
      setBookmarkedMovies(bookmarkedMovies.filter((item) => item.id !== movie.id));
    } else {
      // Add the movie to the bookmarked list
      setBookmarkedMovies([...bookmarkedMovies, movie]);
    }

    // You can save the updated bookmarked movies to storage or a database here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#EA7520', '#04202F']} // Adjust the gradient colors as needed
        style={styles.gradientContainer}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
              <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={24} color="#EA7520" />
            </TouchableOpacity>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.releaseDate}>{`Release Date: ${movie.release_date}`}</Text>
              <Text style={styles.overview}>{shortenedOverview}</Text>
              {movie.vote_average && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{`Rating: ${movie.vote_average}/10`}</Text>
                  <FontAwesome name="star" size={18} color="#FFD700" style={styles.starIcon} />
                </View>
              )}
            </View>
          </View>
          <View style={styles.trailerContainer}>
            <TrailerComponent movieId={movie.id} />
          </View>
        </ScrollView>
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
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  poster: {
    width: 200,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  overview: {
    fontSize: 18,
    color: 'white',
  },
  rating: {
    fontSize: 18,
    color: 'white',
  },
  trailerContainer: {
    marginTop: 16,
    width: '100%', // Take up full width
    aspectRatio: 16 / 9, // Set aspect ratio for the trailer component
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 4,
  },
});

export default MovieInfoScreen;
