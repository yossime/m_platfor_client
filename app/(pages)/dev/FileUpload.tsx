import React, { useState } from 'react';
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

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('');

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

    try {
      const response = await fetch(`/upload?folder=${folder}&filename=${file.name}`, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (response.ok) {
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