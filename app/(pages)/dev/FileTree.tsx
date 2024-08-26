import React, { useState } from 'react';
import styled from 'styled-components';

interface FileTreeProps {
  files: { [key: string]: any };
  level?: number;
}

const TreeContainer = styled.ul<{ level: number }>`
  list-style-type: none;
  padding-left: ${props => props.level * 20}px;
`;

const TreeItem = styled.li`
  margin: 5px 0;
`;

const FolderName = styled.span`
  cursor: pointer;
  color: #ffd700;
  &:hover {
    text-decoration: underline;
  }
`;

const FileName = styled.span`
  color: #4a4a4a;
`;

const FileTree: React.FC<FileTreeProps> = ({ files, level = 0 }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleFolder = (folder: string) => {
    setExpanded(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const renderTree = (items: { [key: string]: any }) => {
    return Object.entries(items).map(([key, value]) => {
      const isFile = value.name && (value.size !== undefined || value.updated !== undefined);
      const isFolder = !isFile;

      return (
        <TreeItem key={key}>
          {isFolder ? (
            <>
              <FolderName onClick={() => toggleFolder(key)}>
                {expanded[key] ? '📂' : '📁'} {key}
              </FolderName>
              {expanded[key] && <FileTree files={value} level={level + 1} />}
            </>
          ) : (
            <FileName>
              📄 {value.name.split('/').pop()}
              {value.size !== undefined && ` - ${value.size} bytes`}
              {value.updated && ` - ${new Date(value.updated).toLocaleString()}`}
            </FileName>
          )}
        </TreeItem>
      );
    });
  };

  return <TreeContainer level={level}>{renderTree(files)}</TreeContainer>;
};

export default FileTree;