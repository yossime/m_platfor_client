import React, { useState, useCallback, useRef } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { Trash2, GripVertical } from 'lucide-react';
import styled from 'styled-components';

interface FileData {
  id: string;
  name: string;
  content: ArrayBuffer;
}

const Container = styled.div`
  width: 100%;
`;

const ImageList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 50px;
`;

const ImageItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
`;

const DragHandle = styled.div`
  cursor: grab;
  margin-right: 0.5rem;
`;

const DeleteButton = styled.button`
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
`;

const DraggableImageItem: React.FC<{ 
  image: FileData; 
  index: number; 
  moveImage: (dragIndex: number, hoverIndex: number) => void; 
  handleDelete: (id: string) => void 
}> = ({ image, index, moveImage, handleDelete }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <ImageItem ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <DragHandle>
        <GripVertical size={18} />
      </DragHandle>
      <span>{image.name}</span>
      <DeleteButton onClick={() => handleDelete(image.id)}>
        <Trash2 size={18} />
      </DeleteButton>
    </ImageItem>
  );
};

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
    noKeyboard: true 
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
          size={ButtonSize.SMALL}
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