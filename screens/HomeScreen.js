import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TrendingMoviesComponent from '../components/TrendingMoviesComponent';
import MovieComponent from '../components/MovieComponent';
import ActionMoviesComponent from '../components/ActionMoviesComponent';
import ComedyMoviesComponent from '../components/ComedyMoviesComponent';
import FamilyMoviesComponent from '../components/FamilyMoviesComponent';
import KidsMovieComponent from '../components/KidsMoviesComponent';
import HorrorMoviesComponent from '../components/HorrorMoviesComponent';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../components/SearchBar';
import UserProfileComponent from '../components/UserProfileComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Process data as needed
    } catch (error) {
      console.error('Error fetching upcoming movie data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#EA7520', '#04202F']} style={styles.gradientContainer}>
        <ScrollView>
          <UserProfileComponent name="John" />
          <SearchBar />

          <View style={styles.contentContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TrendingMoviesComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <MovieComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <ActionMoviesComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <ComedyMoviesComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <FamilyMoviesComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <KidsMovieComponent />
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <HorrorMoviesComponent />
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EA7520', // Set background color if needed
  },
  gradientContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default HomeScreen;
