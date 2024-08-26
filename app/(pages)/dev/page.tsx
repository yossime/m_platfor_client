"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileTree from './FileTree';
import axios from '@/utils/axios';
import FileUpload from './FileUpload';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import FileUpload from './FileUpload';

interface File {
    name: string;
    size: string | number | undefined;
    updated: string | undefined;
    isFolder: boolean;
}

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const App: React.FC = () => {
    const [files, setFiles] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            axios.get('http://localhost:3500/dev/library')
                .then(response => {
                    console.log(response.data);
                    setFiles(response.data);
                })
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    return (
        <AppContainer>
            <Title>GCP Storage Bucket Files</Title>
            {/* <FileUpload onUploadComplete={fetchFiles} /> */}
            <FileTree files={files} onRefresh={fetchFiles} />
        </AppContainer>
    );
};

export default App;