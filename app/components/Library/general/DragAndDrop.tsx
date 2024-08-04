import { BackgroundColor } from '@constants/colors';
import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import Button from '../button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';


export interface FileData {
  name: string;
  content: ArrayBuffer;
}

interface FileUploadProps {
  onFileAdded: (file: FileData) => void;
  type: 'image' | 'model' | 'any';
}

const acceptedTypes = {
  image: { 'image/*': [] },
  model: {
    'model/fbx': ['.fbx'],
    'model/gltf-binary': ['.glb'],
    'model/gltf+json': ['.gltf'],
    'model/obj': ['.obj']
  },
  any: {}
};

const DragAndDrop: React.FC<FileUploadProps> = ({ onFileAdded, type }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        onFileAdded({
          name: file.name,
          content: reader.result as ArrayBuffer
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }, [onFileAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes[type],
    multiple: false,
    noClick: true, 
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    fileInputRef.current?.click();
  };

  return (
    <Container>

    <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
      <input {...getInputProps()} ref={fileInputRef} />
      <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            text="Select File"
            onClick={handleButtonClick}
          />
          <DropzoneText>or drag and drop a file here</DropzoneText>
    </Dropzone>

    </Container>
  );
};

interface ContainerProps {
  $isDragActive: boolean;
}



const Container = styled.div`
  background-color:${BackgroundColor.GREY_BACKGROUND};
  padding: 20px;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
  width:100%; height: 268px;
  `;



const Dropzone = styled.div<ContainerProps>`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${props => props.$isDragActive ? '#4CAF50' : '#cccccc'};
  border-radius: 10px;
  background-color: ${props => props.$isDragActive ? '#f0f8ff' : 'transparent'};
  transition: all 0.3s ease;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DropzoneText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const FileName = styled.p`
  font-size: 16px;
  text-align: center;
`;

export default DragAndDrop;