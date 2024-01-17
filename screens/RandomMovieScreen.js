import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const RandomMovieScreen = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual TMDB API key;
  const API_KEY = 'YOUR_TMDB_API_KEY';

  const genres = [
    { id: 10751, name: 'Family' },
    { id: 16, name: 'Animation' },
    { id: 28, name: 'Action' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
  ];

  const fetchRandomMovie = async (genreId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovieData = data.results[randomIndex];
      setRandomMovie(randomMovieData);
    } catch (error) {
      console.error('Error fetching random movie data:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial random movie when component mounts
    fetchRandomMovie(genres[0].id);
  }, []);

  const navigation = useNavigation();

  const renderRandomMovie = () => {
    if (randomMovie) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <LinearGradient
            colors={['#EA7520', '#04202F']} // Adjust the gradient colors as needed
            style={styles.gradientContainer}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Random Movie Generator</Text>

              <View style={styles.genreButtons}>
                {genres.map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    style={styles.genreButton}
                    onPress={() => fetchRandomMovie(genre.id)}
                  >
                    <Text style={styles.buttonText}>{genre.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('MovieInfo', { movie: randomMovie })}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}` }}
                  style={{ width: 300, height: 400 }}  // Adjust the dimensions as needed
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <Text style={styles.movieTitle}>{randomMovie.title}</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      );
    }

    return null;
  };

  return renderRandomMovie();
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EA7520',
  },
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff', // Set text color to white
  },
  genreButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
  },
  genreButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
});

export default RandomMovieScreen;
