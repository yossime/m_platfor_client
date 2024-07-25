import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DragAndDropProps {
  onFilesAdded: (files: ArrayBuffer[]) => void;
  onClose: () => void;
}

const DragAndDropImage: React.FC<DragAndDropProps> = ({ onFilesAdded, onClose }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const bufferPromises = acceptedFiles.map((file) => 
      new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      })
    );

    Promise.all(bufferPromises)
      .then((buffers) => {
        onFilesAdded(buffers);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <div
          {...getRootProps()}
          style={{
            ...dropzoneStyle,
            backgroundColor: isDragActive ? '#f0f8ff' : '#ffffff',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here...</p>
          ) : (
            <p>Drag image files here or click to choose</p>
          )}
        </div>
      </div>
    </div>
  );
};


const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  width: '400px',
};

const dropzoneStyle: React.CSSProperties = {
  width: '100%',
  border: '2px dashed #cccccc',
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

export default DragAndDropImage;