"use client"

import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import styled from 'styled-components';
import { Container } from '../../general/CommonStyles';
import DraggableImageItem from './DraggableImageItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


interface FileData {
  id: string;
  name: string;
  content: ArrayBuffer;
}

const ImageList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 50px;
`;





export const SliderContentComponent: React.FC = () => {
  const [images, setImages] = useState<FileData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const newImagesPromises = acceptedFiles.map(async (file) => ({
      id: Date.now().toString(),
      name: file.name,
      content: await file.arrayBuffer()
    }));

    const newImages = await Promise.all(newImagesPromises);
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({ 
    onDrop, 
    noClick: true, 
    noKeyboard: true,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    }
  });

  const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [draggedImage] = newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return newImages;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>

      <Container {...getRootProps()}>
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          text="Add photos"
          onClick={open}
          fullWidth
        />
        <input {...getInputProps()} />

        <ImageList>
          {images.length === 0 && <p>No images yet. Add some photos to get started!</p>}
          {images.map((image, index) => (
            <DraggableImageItem
              key={image.id}
              image={image}
              index={index}
              moveImage={moveImage}
              handleDelete={handleDelete}
            />
          ))}
        </ImageList>
      </Container>
      </DndProvider>

  );
};

export default SliderContentComponent;



