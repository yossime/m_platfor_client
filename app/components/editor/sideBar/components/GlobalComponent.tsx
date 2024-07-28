import React from 'react';
import { useEditor } from '@/context/useEditorContext';

interface GlobalComponentProps {
  setActiveSidebarHeader: (header: any) => void;
}

export const GlobalComponent: React.FC<GlobalComponentProps> = ({ setActiveSidebarHeader }) => {
  const { setActiveBoardIndex, dataParameters}= useEditor()

const handleSelect = (name: string | null, index: number) => {
  setActiveSidebarHeader(`Edit ${name}`);
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
              onClick={() =>handleSelect(board.name, index)}
            >
              Edit Board {index + 1}: {board.name}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};