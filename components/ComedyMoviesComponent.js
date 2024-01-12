// ComedyMoviesComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ComedyMoviesComponent = () => {
  const navigation = useNavigation();
  const [comedyMovies, setComedyMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComedyMovies = async () => {
      try {
        const currentDate = new Date();
        const fiveMonthsAgo = new Date(currentDate);
        fiveMonthsAgo.setMonth(currentDate.getMonth() - 5);
        const formattedFiveMonthsAgo = `${fiveMonthsAgo.getFullYear()}-${(fiveMonthsAgo.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${fiveMonthsAgo.getDate().toString().padStart(2, '0')}`;

        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=35&primary_release_date.gte=${formattedFiveMonthsAgo}&primary_release_date.lte=${formattedCurrentDate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setComedyMovies(data.results);
      } catch (error) {
        console.error('Error fetching comedy movies data:', error);
        setError('An error occurred while fetching comedy movies data.');
      } finally {
        setLoading(false);
      }
    };

    fetchComedyMovies();
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
        <Feather name="smile" size={24} color="white" />
        <Text style={styles.headerText}>Recent Comedy</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {comedyMovies.map((movie) => (
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

export default ComedyMoviesComponent;
