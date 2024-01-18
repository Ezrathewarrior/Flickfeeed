import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookmarkScreen = ({ route }) => {
  const bookmarkedMovies = route.params?.bookmarkedMovies || [];
  const navigation = useNavigation();

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieInfo', { movie });
  };

  // Function to chunk the array into groups of 4
  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  // Chunk the bookmarkedMovies into groups of 4
  const chunkedMovies = chunkArray(bookmarkedMovies, 2); // Display 2 posters in each row

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmark Screen</Text>
      <ScrollView>
        {chunkedMovies.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((movie) => (
              <TouchableOpacity key={movie.id} style={styles.movieContainer} onPress={() => handleMoviePress(movie)}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  movieContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: '100%', // Take up the entire width of the container
      height: 350, // Set the height to your preferred size
      borderRadius: 8,
    },
});

export default BookmarkScreen;
