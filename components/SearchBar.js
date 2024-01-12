import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  const onSearch = async (text) => {
    setSearchTerm(text);

    // Perform API call based on the search text (you need to implement this part)
    // For example, you can use the TMDB API to search for movies

    // Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${text}&page=1`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleMoviePress = (movie) => {
    // Navigate to the MovieInfoScreen and pass the selected movie
    navigation.navigate('MovieInfo', { movie });
  };

  const renderThumbnail = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={styles.thumbnailContainer}>
        <Image
          style={styles.thumbnail}
          source={{ uri: `https://image.tmdb.org/t/p/w92${item.poster_path}` }}
        />
      </View>
    </TouchableOpacity>
  );

  const handleInputBlur = () => {
    // Clear search results when the input loses focus
    setSearchResults([]);
  };

  const focusInput = () => {
    // Focus on the input when the container is pressed
    inputRef.current.focus();
  };

  const handleFeatherPress = () => {
    // Clear search results when the Feather icon is pressed
    setSearchResults([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onStartShouldSetResponder={() => true} onResponderGrant={focusInput}>
        <Feather name="search" size={24} color="#EA7520" style={styles.icon} onPress={handleFeatherPress} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="white"
          onChangeText={onSearch}
          value={searchTerm}
          onBlur={handleInputBlur}
        />
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderThumbnail}
            horizontal={searchResults.length > 0}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 8,
    margin: 16,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#0E5278',
    fontSize: 16,
  },
  thumbnailContainer: {
    marginRight: 8,
  },
  thumbnail: {
    width: 92,
    height: 138,
    borderRadius: 8,
  },
});

export default SearchBar;
