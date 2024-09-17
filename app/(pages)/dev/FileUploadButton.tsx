import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from '@/utils/axios';
import { FilePlus } from 'lucide-react';

const UploadButton = styled.button`
  margin-left: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

interface FileUploadButtonProps {
  folderPath: string;
  onUploadSuccess: () => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ folderPath, onUploadSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizePath = (path: string) => {
    return path.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderPath', folderPath);
      const filePath = `${folderPath}/${file.name}`;
      try {
        await axios.post(`dev/library?filePath=${normalizePath(filePath)}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onUploadSuccess();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <>
      <StyledButton onClick={() => fileInputRef.current?.click()}><FilePlus size={16} /></StyledButton>

      {/* <UploadButton onClick={() => fileInputRef.current?.click()}>Upload</UploadButton> */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default FileUploadButton;
