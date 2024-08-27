import { IContentMaterialType } from '@/components/editor/interface/models';
import axios from '@/utils/axios';
import { AxiosResponse } from 'axios';

interface UploadResponse {
  url: string;
}

interface UploadOptions {
  onSuccess?: (url: UploadResponse, type: IContentMaterialType) => void;
  onError?: (error: Error, type: IContentMaterialType) => void;
  onProgress?: (progress: number) => void;
}

export const uploadFile = async (
  file: File, 
  type: IContentMaterialType, 
  options: UploadOptions = {}
): Promise<void> => {
  const { onSuccess, onError, onProgress } = options;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response: AxiosResponse<UploadResponse> = await axios.post('upload', formData,
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        },
      }
    );

    if (onSuccess) {
      onSuccess(response.data, type);
    }
  } catch (error) {
    if (onError) {
      onError(error instanceof Error ? error : new Error('An unknown error occurred'), type);
    }
  }
};