import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const TrailerComponent = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        console.log('Fetching trailer for movieId:', movieId);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}`
        );
  
        const data = await response.json();
  
        // Assuming the first video in the list is a trailer
        if (data.results && data.results.length > 0) {
          console.log('Setting video key:', data.results[0].key);
          setVideoKey(data.results[0].key);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };
  
    fetchTrailer();
  }, [movieId]);

  if (!videoKey) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4319" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${videoKey}` }}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default TrailerComponent;
