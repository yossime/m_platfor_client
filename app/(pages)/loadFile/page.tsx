
"use client"
import { uploadFile } from '@/services/upload.service';
import React, { useState } from 'react';

const LoadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const path = await uploadFile(file);
      setUploadedPath(path);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload HDR File</h1>
      <input type="file" accept=".hdr" onChange={handleFileChange}  />
      <br /><br />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedPath && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Uploaded Path:</h2>
          <pre>{uploadedPath}</pre>
        </div>
      )}
    </div>
  );
};

export default LoadPage;
