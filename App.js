import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import ProfileScreen from './screens/ProfileScreen';
import RandomMovieScreen from './screens/RandomMovieScreen';
import MovieInfoScreen from './screens/MovieInfoScreen';
import { LinearGradient } from 'expo-linear-gradient';



const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <LinearGradient
      colors={['#909090', '#0A4C71']}
      style={styles.gradientContainer}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#FF4319"
          inactiveColor="#EA7520"
          barStyle={{ backgroundColor: 'transparent', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          screenOptions={({ route }) => ({
          })}
        >
          {/* Define your tab screens with icons */}
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Bookmark"
            component={BookmarkScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bookmark" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="RandomMovie"
            component={RandomMovieScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="help-circle" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={26} color={color} />
              ),
            }}
          />
 <Tab.Screen name="MovieInfo" component={MovieInfoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  createPostButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
