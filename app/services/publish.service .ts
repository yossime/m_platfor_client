import axios from '@/utils/axios';



export const publishSubdomain = async (userId: string,  websiteName: string): Promise<any> => {
  const response = await axios.post(`/publish/subdomain`, {userId:userId ,  websiteName: websiteName });
  // console.log(response,"response")
  return response.data;
};