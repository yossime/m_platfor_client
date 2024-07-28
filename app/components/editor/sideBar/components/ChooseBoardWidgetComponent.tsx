import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderType, widgets } from '../types';
import { useEditor } from '@/context/useEditorContext';
import {createBoardByType} from '@/components/editor/utils/CraeteBoard';


const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WidgetButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

interface ChooseBoardWidgetComponentProps {
  onHeaderChange: (header: HeaderType) => void;
}

export const ChooseBoardWidgetComponent: React.FC<ChooseBoardWidgetComponentProps> = ({
  onHeaderChange
}) => {
  const { setActiveBoardIndex } = useEditor();
  const { setDataParameters, dataParameters } = useEditor();
  const [boardIndex, setBoardIndex] = useState<number | ''>('');
  const [availableIndexes, setAvailableIndexes] = useState<number[]>([]);

  useEffect(() => {
    console.log('dataParameters', dataParameters?.boards)
    if (dataParameters?.boards) {
      const indexes = dataParameters.boards
        .map((board, index) => board.type === null ? index : -1)
        .filter(index => index !== -1);


      setAvailableIndexes(indexes);
      if (indexes.length > 0 && (boardIndex === '' || !indexes.includes(boardIndex as number))) {
        setBoardIndex(indexes[0]);
      }
    }
  }, [dataParameters, boardIndex]);

  
  const handle = (widget: typeof widgets[number]) => {
    if (boardIndex === '') return;
    setActiveBoardIndex(boardIndex);
    onHeaderChange(widget.name as HeaderType);
    setDataParameters((prevParams) => {
      if (!prevParams) return prevParams;
      let prevBoards = prevParams.boards
      prevBoards[boardIndex] = createBoardByType(widget.type);
      return {
        ...prevParams,
        boarsds: { prevBoards }
      }
    }
  );
};



const handleIndexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const newIndex = parseInt(event.target.value, 10);
  setBoardIndex(isNaN(newIndex) ? '' : newIndex);
};

return (
  <div>
    <div>
      <label htmlFor="boardIndex">Select Empty Board: </label>
      <select
        id="boardIndex"
        value={boardIndex}
        onChange={handleIndexChange}
      >
        <option value="">Select a board</option>
        {availableIndexes.map(index => (
          <option key={index} value={index}>
            Board {index + 1}
          </option>
        ))}
      </select>
    </div>
    <WidgetContainer>
      {widgets.map((widget) => (
        <WidgetButton
          key={widget.name}
          onClick={() => handle(widget)}
          disabled={boardIndex === ''}
        >
          {widget.name}
        </WidgetButton>
      ))}
    </WidgetContainer>
  </div>
);
};