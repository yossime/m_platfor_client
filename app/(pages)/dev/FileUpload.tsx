
import axios from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface FileUploadProps {
  onUploadComplete: () => void;
}

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FileUpload: React.FC<FileUploadProps> = async ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('');

  useEffect(() => {
    const checkUrl = async () => {
        try {
            // const storageRef = ref(, 'test-fbx-lib/test.fbx'); // Path to your file
            // const url = await getAuthDownloadUrl('test-fbx-lib/test.fbx');
            // console.log("Download URL:", url);
            // getDownloadURL(url);
        } catch (error) {
            console.error('Error getting download URL:', error);
        }
    };

    // checkUrl(); // Call the async function
}, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolder(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !folder) return;
    const formData = new FormData();

    formData.append('file', file);
    // formData.append('folderPath', folderPath);

    try {
      const filePath = `${folder}/${file.name}`;
      const response = await axios.post(`http://localhost:3500/dev/library?filePath=${filePath}`, formData, {
      });

      if (response.status === 200) {
        console.log('File uploaded successfully');
        setFile(null);
        setFolder('');
        onUploadComplete();
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <UploadForm onSubmit={handleSubmit}>
      <Input type="file" onChange={handleFileChange} />
      <Input
        type="text"
        placeholder="Folder path"
        value={folder}
        onChange={handleFolderChange}
      />
      <Button type="submit" disabled={!file || !folder}>
        Upload
      </Button>
    </UploadForm>
  );
};

export default FileUpload;