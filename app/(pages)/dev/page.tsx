"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileTree from './FileTree';
import axios from '@/utils/axios';
import path from 'path';

const API = 'https://server-cloud-run-service-kruirvrv6a-uc.a.run.app'


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
    const [error, setError] = useState<string | null>(null);

    const normalizePath = (path: string) => {
        return path.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`dev`);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Failed to fetch files. Please try again.');
        }
    };

    const handleDelete = async (path: string, isFolder: boolean) => {
        try {
            const normalizedPath = normalizePath(path);
            await axios.delete(`dev/library`, { params: { filePath: normalizedPath } });
            await fetchFiles();
        } catch (error) {
            console.error('Error deleting file/folder:', error);
            setError(`Failed to delete ${isFolder ? 'folder' : 'file'}. Please try again.`);
        }
    };

    const handleRename = async (oldPath: string, newPath: string, isFolder: boolean) => {
        try {
            if (!isFolder) {
                const oldExt = oldPath.split('.').pop();
                const newNameWithoutExt = newPath.split('.')[0];
                newPath = `${newNameWithoutExt}.${oldExt}`;
            }

            const normalizedOldPath = normalizePath(oldPath);
            const normalizedNewPath = normalizePath(newPath);

            await axios.put(`dev/library`, { oldPath:normalizedOldPath, newPath:normalizedNewPath });
            await fetchFiles();
        } catch (error) {
            console.error('Error renaming file/folder:', error);
            setError(`Failed to rename ${isFolder ? 'folder' : 'file'}. Please try again.`);
        }
    };

    const handleAddFolder = async (path: string) => {
        try {
            console.error('pathpathpathpathpathpathpathr:', path);

            await axios.post(`dev/library/folder`, { folderPath: path });
            await fetchFiles();
        } catch (error) {
            console.error('Error adding folder:', error);
            setError('Failed to add folder. Please try again.');
        }
    };

    const handleAddFile = async (path: string, content: string) => {
        try {
            console.log("path", path,)

            await axios.post(`dev/library/file`, { filePath: path, content });
            await fetchFiles();
        } catch (error) {
            console.error('Error adding file:', error);
            setError('Failed to add file. Please try again.');
        }
    };

    const handleDownload = (filePath: string) => {
        const fileName = path.basename(filePath);
        console.log('Downloading file:', filePath);
        const link = document.createElement('a');
        link.href = `https://storage.googleapis.com/library-all-test${filePath}`;
        link.download =  fileName;

        link.click();
    };

    return (
        <AppContainer>
            <Title>GCP Storage Bucket Files</Title>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <FileTree
                files={files}
                onRefresh={fetchFiles}
                onDelete={handleDelete}
                onRename={handleRename}
                onAddFolder={handleAddFolder}
                onAddFile={handleAddFile}
                onDownload={handleDownload}
            />
        </AppContainer>
    );
};

export default App;