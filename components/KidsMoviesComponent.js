// KidsMovieComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const KidsMovieComponent = () => {
  const navigation = useNavigation();
  const [kidsMovies, setKidsMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKidsMovies = async () => {
      try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date 5 months ago
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(currentDate.getMonth() - 5);

        // Format the dates for the API request
        const currentDateStr = currentDate.toISOString().split('T')[0];
        const fiveMonthsAgoStr = fiveMonthsAgo.toISOString().split('T')[0];

        // Set the genre ID for animation (16)
        const animationGenreId = 16;

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${animationGenreId}&sort_by=popularity.desc&primary_release_date.gte=${fiveMonthsAgoStr}&primary_release_date.lte=${currentDateStr}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setKidsMovies(data.results);
      } catch (error) {
        console.error('Error fetching kids movies data:', error);
        setError('An error occurred while fetching kids movies data.');
      } finally {
        setLoading(false);
      }
    };

    fetchKidsMovies();
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieInfo', { movie });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Fixed header */}
      <View style={styles.header}>
        <Feather name="star" size={24} color="white" />
        <Text style={styles.headerText}>Animated Movies</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {kidsMovies.map((movie) => (
          <TouchableOpacity key={movie.id} style={styles.movieContainer} onPress={() => handleMoviePress(movie)}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 2,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieContainer: {
    marginBottom: 16,
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 160,
    borderRadius: 8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default KidsMovieComponent;
