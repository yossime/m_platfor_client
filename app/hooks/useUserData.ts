"use client"
import { auth } from '@/services/firebase';
import axios from '@/utils/axios';
import { useState, useEffect } from 'react';



export interface UserData {
    uid: string;
    email: string;
    stripeAccountId?: string;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    plan?:string;
    isNew?:boolean;
  }


  export const useUserData = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
  
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.warn('User is not authenticated');
          return; 
        }
    
    
        const response = await axios.get(`user`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUserData();
  
      const intervalId = setInterval(fetchUserData, 30000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return { userData, loading, refreshUserData: fetchUserData };
  };