
import axios from 'axios';
import { auth } from '../services/firebase';

const instance = axios.create({
    baseURL: "https://server-cloud-run-service-kruirvrv6a-uc.a.run.app",
    timeout: 30000, 
});



instance.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    // console.log("User: " + user?.uid)
    if (user) {
      try {
        const token = await user.getIdToken(/* forceRefresh */ true); 
        // console.log("Refreshed token: " + token)
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
