import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import ProfileScreen from './screens/ProfileScreen';
import RandomMovieScreen from './screens/RandomMovieScreen';
import MovieInfoScreen from './screens/MovieInfoScreen';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  StatusBar.setTranslucent(true);

  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#FF4319"
          inactiveColor="#EA7520"
          barStyle={{ backgroundColor: 'transparent', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          screenOptions={({ route }) => ({})}
        >
          {/* Define your tab screens with icons */}
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={26} color={color} />
              ),
              headerShown: false,  // Hide the header
            }}
          />
          <Tab.Screen
            name="Bookmark"
            component={BookmarkScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bookmark" size={26} color={color} />
              ),
              headerShown: false,  // Hide the header
            }}
          />
          <Tab.Screen
            name="RandomMovie"
            component={RandomMovieScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="help-circle" size={26} color={color} />
              ),
              headerShown: false,  // Hide the header
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={26} color={color} />
              ),
              headerShown: false,  // Hide the header
            }}
          />
          <Tab.Screen
            name="MovieInfo"
            component={MovieInfoScreen}
            options={{
              headerShown: false,  // Hide the header
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
});

export default App;
