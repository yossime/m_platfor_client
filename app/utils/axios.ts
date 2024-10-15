
import axios from 'axios';
import { auth } from '../services/firebase';

const instance = axios.create({
    baseURL: "https://server-cloud-run-service-kruirvrv6a-uc.a.run.app",
    // baseURL: "http://localhost:3500",

    timeout: 300000, 
});



instance.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken(/* forceRefresh */ true); 
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  export default instance;
