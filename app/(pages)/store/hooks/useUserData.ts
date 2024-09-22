"use client"

import axios from '@/utils/axios';
import { useState, useEffect } from 'react';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3500';

export interface UserData {
    uid: string;
    email: string;
    stripeAccountId?: string;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
  }


  export const useUserData = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
  
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`user/`);
        setUserData(response.data);
        console.log("User data", response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUserData();
  
      // Poll for updates every 30 seconds
      const intervalId = setInterval(fetchUserData, 30000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return { userData, loading, refreshUserData: fetchUserData };
  };