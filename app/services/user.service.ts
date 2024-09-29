import axios from '@/utils/axios';
import { auth } from '@/services/firebase';
import { UserData } from '@/types';

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('User is not authenticated');
      return null;
    }

    const response = await axios.get<UserData>(`/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
