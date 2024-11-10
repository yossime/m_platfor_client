import axios from '@/utils/axios';
import { auth } from '@/services/firebase';

export const getModelsName = async (): Promise<any | null> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User is not authenticated');
      return null;
    }

    const response = await axios.get(`/model`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};