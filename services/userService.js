import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';

const fetchUserData = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
  
      console.log('Snapshot:', snapshot.val()); // Log the snapshot value
  
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.error('User data not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
export default fetchUserData;