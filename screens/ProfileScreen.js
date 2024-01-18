import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { AuthContext } from '../AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'fugaz-one-regular': require('../assets/FugazOne-Regular.ttf'),
    });
  } catch (error) {
    console.error('Error loading fonts:', error);
  }
};

loadFonts();

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');

  useEffect(() => {
    loadFonts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUpdateDisplayName = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      setModalVisible(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#EA7520', '#04202F']} style={styles.gradientContainer}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <TouchableOpacity>
              <Image
                source={ require('../assets/images/Icon58.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.userName}>{user ? user.displayName : 'Guest'}</Text>
          </View>

          {/* Update Display Name Button */}
          <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.updateText}>Update Display Name</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for updating display name */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Display Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new display name"
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
              />
              <Button title="Update" onPress={handleUpdateDisplayName} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
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
    justifyContent: 'top',
    alignItems: 'top',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 16,
  },
  userName: {
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 2.88,
    color: 'white',
    fontFamily: 'fugaz-one-regular',
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateText: {
    color: '#EA7520',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#EA7520',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
});

export default ProfileScreen;