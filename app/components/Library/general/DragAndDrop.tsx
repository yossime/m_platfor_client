import { BackgroundColor } from '@constants/colors';
import Button from '../button/Button';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { IconName } from '@constants/icon';

interface FileUploadProps {
  onFileAdded: (file: File) => void;
  type: 'image' | 'model' | 'any' | 'video';
  buttonOnly?: boolean; 
  iconOnly?:boolean;
  onClick?:()=>void;
  tertiary?:boolean;
}

const acceptedTypes = {
  image: { 'image/*': [] },
  video: {
    'video/mp4': ['.mp4'],
    'video/webm': ['.webm'],
    'video/ogg': ['.ogv']
  },  model: {
    'model/fbx': ['.fbx'],
    'model/gltf-binary': ['.glb'],
    'model/gltf+json': ['.gltf'],
    'model/obj': ['.obj']
  },
  any: {}
};

const DragAndDrop: React.FC<FileUploadProps> = ({tertiary, onClick,onFileAdded, type, buttonOnly = false ,iconOnly}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAdded(acceptedFiles[0]);
    }
  }, [onFileAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes[type],
    multiple: false,
    noClick: true, 
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    if(onClick) onClick()
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const renderButton = () => (
    !iconOnly ? (
      <Button
        type={ButtonType.PRIMARY}
        variant={tertiary ? ButtonVariant.TERTIARY: ButtonVariant.SECONDARY}
        size={ButtonSize.MEDIUM}
        text={`Upload ${type}`}
        icon={IconName.CLOUDARROWUP}
        onClick={handleButtonClick}
        mode={ButtonMode.NORMAL}
        fullWidth={buttonOnly ? true : false}
      />
    ) : (
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.CLOUDARROWUP}
        iconOnly={true}
        onClick={handleButtonClick}
        mode={ButtonMode.NORMAL}
        fullWidth={false}
      />
    )
  );
  

  if (buttonOnly) {
    return (
      <>
      {renderButton()}
    <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
    </>
    );
  }

  return (
    <Container>
      <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} ref={fileInputRef} />
        {renderButton()}
        <DropzoneText>or drag and drop a file here</DropzoneText>
      </Dropzone>
    </Container>
  );
};

const Container = styled.div`
  background-color:${BackgroundColor.GREY_BACKGROUND};
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 268px;
`;

const Dropzone = styled.div<{ $isDragActive: boolean }>`
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

const DropzoneText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

export default DragAndDrop;





