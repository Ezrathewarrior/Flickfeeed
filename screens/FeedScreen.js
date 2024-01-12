import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const FeedScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  // Use the useFocusEffect hook to update the posts when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Check if the route contains new post data
      const newPost = route.params?.newPost;
      if (newPost) {
        // Update the posts state with the new post
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      }
    }, [route.params?.newPost])
  );

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id , postname: item.content})}
    >
      <Text>{item.username}</Text>
      <Text>{item.content}</Text>
      <Text>{item.imageUri}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default FeedScreen;
