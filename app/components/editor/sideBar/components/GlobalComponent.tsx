import React from 'react';
import { HeaderType } from '../types';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';

interface GlobalComponentProps {
  header: HeaderType;
  onHeaderChange: (header: HeaderType) => void;
}

export const GlobalComponent: React.FC<GlobalComponentProps> = ({ header, onHeaderChange }) => {
  const { dataParameters } = useProject();
  const { setActiveBoardIndex}= useEditor()

const handleSelect = (type: string | null, index: number) => {
  onHeaderChange(`Edit ${type}` as HeaderType);
  setActiveBoardIndex(index);
}
  if (!dataParameters || !dataParameters.boards) {
    return <div>No boards available</div>;
  }

  return (
    <div>
      {dataParameters.boards.map((board, index) => {
        if (board.type !== null) {
          return (
            <button
              key={index}
              onClick={() =>handleSelect(board.type, index)}
            >
              Edit Board {index + 1}: {board.type}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};