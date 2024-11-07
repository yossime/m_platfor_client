import axios from '@/utils/axios';
import { sanitizeFileName } from '@/utils/fileUtils';

export const uploadFile = async (file: File): Promise<string> => {
  const sanitizedFileName = sanitizeFileName(file.name); 
  const formData = new FormData();
  
  const sanitizedFile = new File([file], sanitizedFileName, { type: file.type });
  formData.append('file', sanitizedFile);

  const response = await axios.post('upload', formData);

  return response.data;
};
