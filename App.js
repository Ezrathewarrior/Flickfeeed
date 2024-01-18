import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import ProfileScreen from './screens/ProfileScreen';
import RandomMovieScreen from './screens/RandomMovieScreen';
import MovieInfoScreen from './screens/MovieInfoScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';


const Tab = createMaterialBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Replace simulated authentication check with Firebase onAuthStateChanged
    const checkAuthentication = () => {
      onAuthStateChanged(auth, (user) => {
        // If user is authenticated, setUserLoggedIn(true)
        // Otherwise, setUserLoggedIn(false)
        setUserLoggedIn(!!user);
      });
    };
  
    // Call the authentication check function
    checkAuthentication();
  }, []);

  return (
    <LinearGradient
      colors={['#909090', '#0A4C71']}
      style={styles.gradientContainer}
    >
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <AuthProvider>
          {userLoggedIn ? (
            <Tab.Navigator
              initialRouteName="Home"
              activeColor="#FF4319"
              inactiveColor="#EA7520"
              barStyle={{ backgroundColor: 'transparent', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              screenOptions={({ route }) => ({})}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="home" size={26} color={color} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Bookmark"
                component={BookmarkScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bookmark" size={26} color={color} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="RandomMovie"
                component={RandomMovieScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="help-circle" size={26} color={color} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="person" size={26} color={color} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="MovieInfo"
                component={MovieInfoScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          ) : (
            <AuthStackScreen />
          )}
        </AuthProvider>
      </NavigationContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
});

export default App;
