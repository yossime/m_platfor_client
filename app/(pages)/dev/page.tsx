"use client"
// import React, { useEffect, useState } from 'react';
// import axios from '@/utils/axios';
// import styled from 'styled-components';

// type FileTree = {
//   [key: string]: FileTree | null;
// };

// const FileListContainer = styled.div`
//   font-family: Arial, sans-serif;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   background-color: #f9f9f9;
// `;

// const Title = styled.h2`
//   text-align: center;
// `;

// const List = styled.ul`
//   list-style-type: none;
//   padding-left: 20px;
// `;

// const ListItem = styled.li<{ isFolder: boolean }>`
//   margin: 5px 0;

//   &::before {
//     content: "${props => (props.isFolder ? '📁' : '📄')} ";
//     margin-right: 5px;
//   }
// `;

// const FileList: React.FC = () => {
//   const [fileTree, setFileTree] = useState<FileTree>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axios.get<FileTree>('http://localhost:3500/dev')
//       .then(response => {
//         setFileTree(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Failed to load files');
//         setLoading(false);
//       });
//   }, []);

//   const renderTree = (tree: FileTree) => {
//     return (
//       <List>
//         {Object.entries(tree).map(([name, subtree]) => (
//           <ListItem key={name} isFolder={subtree !== null}>
//             {name}
//             {subtree && renderTree(subtree)}
//           </ListItem>
//         ))}
//       </List>
//     );
//   };

//   if (loading) return <p>Loading files...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <FileListContainer>
//       <Title>Files in GCP Bucket</Title>
//       {renderTree(fileTree)}
//     </FileListContainer>
//   );
// };

// export default FileList;





import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileTree from './FileTree';
import axios from '@/utils/axios';
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
            axios.get('http://localhost:3500/dev')
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
            <FileTree files={files} />
        </AppContainer>
    );
};

export default App;