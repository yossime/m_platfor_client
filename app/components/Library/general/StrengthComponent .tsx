import React, { useState } from 'react';
import styled from 'styled-components';

const DraggablePercentage = styled.div`
  user-select: none;
  cursor: ew-resize;
  font-weight: bold;
`;

interface StrengthComponentProps {
  initialValue: number;
  onChange: (newValue: number) => void;
}

const StrengthComponent: React.FC<StrengthComponentProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const startX = e.clientX;
    const startValue = value;

    const handleMouseMove = (e: MouseEvent): void => {
      const deltaX = e.clientX - startX;
      const newValue = Math.max(0, Math.min(100, startValue + deltaX));
      setValue(newValue);
      onChange(newValue);
    };

    const handleMouseUp = (): void => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <DraggablePercentage onMouseDown={handleMouseDown}>
      {value}%
    </DraggablePercentage>
  );
};

export default StrengthComponent;