import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const MovieComponent = () => {
  const navigation = useNavigation();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'fugaz-one-regular': require('../assets/FugazOne-Regular.ttf'),
      });
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  const filterUpcomingMovies = (movies) => {
    return movies.map((movie) => {
      console.log('Movie Title:', movie.title, 'Release Date:', movie.release_date);
      return movie;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadFonts(); // Load the custom font

        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('API Response:', data);

        const filteredUpcomingMovies = filterUpcomingMovies(data.results);

        console.log('Filtered Movies:', filteredUpcomingMovies);

        setUpcomingMovies(filteredUpcomingMovies);
      } catch (error) {
        console.error('Error fetching upcoming movie data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoviePress = (movie) => {
    // Navigate to the MovieInfoScreen and pass the selected movie
    navigation.navigate('MovieInfo', { movie });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  console.log('Rendering Movies:', upcomingMovies);

  return (
    <View style={styles.container}>
      {/* Fixed header */}
      <View style={styles.header}>
        <Feather name="calendar" size={24} color="white" />
        <Text style={styles.headerText}>Recent Movies</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
        {upcomingMovies.map((movie) => (
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
    fontFamily: 'fugaz-one-regular',
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

export default MovieComponent;
