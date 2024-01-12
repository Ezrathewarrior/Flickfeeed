import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [postText, setPostText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handlePublish = () => {
    // Logic to publish the post with postText and imageUri
    const newPost = {
      id: Math.random().toString(),
      username: 'Logged-In User', // Replace with the actual username or user information
      content: postText,
      imageUri: imageUri,
    };

    // Add your backend logic to store the post in the database

    // Navigate back to the feed screen and pass the new post data
    navigation.navigate('Feed', { newPost: newPost });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        multiline
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>

      <Button title="Publish" onPress={handlePublish} />

      {/* Additional UI components and logic can be added as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePickerButton: {
    backgroundColor: '#42a5f5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;
