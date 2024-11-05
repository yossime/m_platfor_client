"use client"

import { GripVertical, Trash2 } from "lucide-react";
import { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";


interface FileData {
    id: string;
    name: string;
    content: ArrayBuffer;
  }

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


interface DraggableImageItemProps {
    image: FileData;
    index: number;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    handleDelete: (id: string) => void;
}

const DraggableImageItem: React.FC<DraggableImageItemProps> = ({ image, index, moveImage, handleDelete }) => {
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

export default DraggableImageItem;