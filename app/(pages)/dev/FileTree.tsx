'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Trash2, Edit2, FolderPlus, FilePlus, Download } from 'lucide-react';
import FileUploadButton from './FileUploadButton';
import { getAuthDownloadUrl } from '@/services/firebase';

interface FileTreeProps {
  files: { [key: string]: any };
  level?: number;
  filePath?: string;
  onRefresh: () => void;
  onDelete: (path: string, isFolder: boolean) => Promise<void>;
  onRename: (oldPath: string, newPath: string, isFolder: boolean) => Promise<void>;
  onAddFolder: (path: string) => Promise<void>;
  onAddFile: (path: string, content: string) => Promise<void>;
  onDownload: (path: string) => void;
}

const TreeContainer = styled.ul<{ level: number }>`
  max-height: 90vh;
  overflow-y: auto;
  padding-left: ${props => props.level * 20}px;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const TreeItem = styled.li`
  min-height: 30px;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;


const FolderName = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ItemName = styled.span`
  cursor: default;
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

const StyledInput = styled.input`
  padding: 5px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledAlert = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const FileTree: React.FC<FileTreeProps> = ({
  files,
  filePath = '',
  level = 0,
  onRefresh,
  onDelete,
  onRename,
  onAddFolder,
  onAddFile,
  onDownload
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleFolder = (folder: string) => {
    setExpanded(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleDelete = async (itemPath: string, isFolder: boolean) => {
    try {
      await onDelete(itemPath, isFolder);
      onRefresh();
    } catch (error) {
      setError(`Failed to delete ${isFolder ? 'folder' : 'file'}: ${(error as Error).message}`);
    }
  };

  const handleRename = async (oldPath: string, isFolder: boolean) => {
    if (newItemName && newItemName !== oldPath.split('/').pop()) {
      try {
        const newPath = `${oldPath.substring(0, oldPath.lastIndexOf('/'))}/${newItemName}`;
        await onRename(oldPath, newPath, isFolder);
        setEditingItem(null);
        setNewItemName('');
        onRefresh();
      } catch (error) {
        setError(`Failed to rename ${isFolder ? 'folder' : 'file'}: ${(error as Error).message}`);
      }
    }
  };

  const handleAddFolder = async (parentPath: string) => {
    if (newItemName) {
      try {
        await onAddFolder(`${parentPath}/${newItemName}`);
        setNewItemName('');
        onRefresh();
      } catch (error) {
        setError(`Failed to add folder: ${(error as Error).message}`);
      }
    }
  };

  const handleAddFile = async (parentPath: string) => {
    console.log(`Adding file: ${parentPath}`);
    if (newItemName) {
      try {
        await onAddFile(`${parentPath}/${newItemName}`, '');
        setNewItemName('');
        onRefresh();
      } catch (error) {
        setError(`Failed to add file: ${(error as Error).message}`);
      }
    }
  };

  const renderTree = (items: { [key: string]: any }, currentPath: string) => {
    return Object.entries(items).map(([key, value]) => {
      const isFile = value.name && (value.size !== undefined || value.updated !== undefined);
      const isFolder = !isFile;
      const itemPath = `${currentPath}/${key}`;

      return (
        <TreeItem key={key}>
          {editingItem === itemPath ? (
            <>
              <StyledInput
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onBlur={() => handleRename(itemPath, isFolder)}
                onKeyPress={(e) => e.key === 'Enter' && handleRename(itemPath, isFolder)}
                autoFocus
              />
              <StyledButton onClick={() => handleRename(itemPath, isFolder)}><Edit2 size={16} /></StyledButton>
            </>
          ) : (
            <>
              {isFolder ? (
                <>
                  <FolderName onClick={() => isFolder && toggleFolder(key)}>
                    {expanded[key] ? '📂' : '📁'} {key}
                  </FolderName>
                  { !expanded[key] && <FileUploadButton folderPath={itemPath} onUploadSuccess={onRefresh} />}
                </>
              ) :
                (
                  <>
                    <ItemName>
                      📄{key}
                    </ItemName>
                    <StyledButton onClick={() => setEditingItem(itemPath)}><Edit2 size={16} /></StyledButton>
                    <StyledButton onClick={() => handleDelete(itemPath, isFolder)}><Trash2 size={16} /></StyledButton>
                    {/* <StyledButton onClick={() => handleAddFolder(itemPath)}><FolderPlus size={16} /></StyledButton> */}
                    {/* <StyledButton onClick={() => handleAddFile(itemPath)}><FilePlus size={16} /></StyledButton> */}
                  </>
                )}
            </>
          )}
          {!isFolder && (
            <StyledButton onClick={() => onDownload(itemPath)}><Download size={16} /></StyledButton>
          )}
          {isFolder && expanded[key] && (
            <FileTree
              files={value}
              level={level + 1}
              filePath={itemPath}
              onRefresh={onRefresh}
              onDelete={onDelete}
              onRename={onRename}
              onAddFolder={onAddFolder}
              onAddFile={onAddFile}
              onDownload={onDownload}
            />
          )}
        </TreeItem>
      );
    });
  };

  return (
    <>
      {error && (
        <StyledAlert>{error}</StyledAlert>
      )}
      <TreeContainer level={level}>{renderTree(files, filePath)}</TreeContainer>
    </>
  );
};

export default FileTree;