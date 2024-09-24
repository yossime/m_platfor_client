import axios from '@/utils/axios';


export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('upload', formData);
  return response.data;
};
