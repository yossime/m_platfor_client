// components/DragAndDrop.tsx

import React from 'react';
import { useDropzone } from 'react-dropzone';

interface DragAndDropProps {
  onFilesAdded: (files: File[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFilesAdded }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFilesAdded(acceptedFiles);
    }
  });

  return (
    <div
      {...getRootProps()}
      style={{
        width: '300px',
        border: '2px dashed #cccccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        backgroundColor: isDragActive ? '#f0f8ff' : '#ffffff',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>drag here or choose files</p>
      )}
    </div>
  );
};

export default DragAndDrop;
