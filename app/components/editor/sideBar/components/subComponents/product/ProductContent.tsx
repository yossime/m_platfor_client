import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import SelectInput from '@/components/Library/input/SelectInput';
import { DisplayList } from './DisplayList';
import PopupEditDisplay from './PopupEditDisplay'; 
import { DisplayType, IDisplay, IProductBoard } from '@/components/editor/interface/paramsType';

const displayTypeOptions = [
  { value: DisplayType.DUO, label: "Spotlight Duo" },
  { value: DisplayType.STANDS, label: "Podium stands" },
];

export const ProductContentComponent: React.FC = () => {
  const [activeDisplay, setActiveDisplay] = useState<{ index: number; display: IDisplay } | null>(null);
  const { setDataParameters, dataParameters } = useEditor();
  const { activeBoardIndex } = useEditor();
  const currentBoard = dataParameters?.boards[activeBoardIndex] as IProductBoard;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDataParameters((prevParams) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

      return {
        ...prevParams,
        boards: prevParams.boards.map((board, i) =>
          i === activeBoardIndex ? { ...board, title: { text: value } } : board)
      };
    });
  };

  const getMaxDis = () => {
    if (currentBoard?.displayType === DisplayType.DUO) {
      return 2;
    } else if (currentBoard?.displayType === DisplayType.STANDS) {
      return 6;
    }
    return 0;
  };

  const handleChange = (value: any) => {
    setDataParameters((prevParams) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
      console.log(value);
      return {
        ...prevParams,
        boards: prevParams.boards.map((board, index) =>
          index === activeBoardIndex ? { ...board, displayType: value as DisplayType, maxDisplay: getMaxDis() } : board)
      };
    });
  };

  const handleEditDisplay = (index: number, display: IDisplay) => {
    setActiveDisplay({ index, display });
  };

  const handleClosePopup = () => {
    setActiveDisplay(null);
  };

  const handleSaveDisplay = (updatedDisplay: IDisplay) => {
    if (activeDisplay === null) return;

    setDataParameters((prevParams) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

      return {
        ...prevParams,
        boards: prevParams.boards.map((board, i) =>
          i === activeBoardIndex ? {
            ...board,
            displays: (board as IProductBoard).displays.map((d, j) =>
              j === activeDisplay.index ? updatedDisplay : d
            )
          } : board
        )
      };
    });

    handleClosePopup();
  };

  return (
    <div>
      <SelectInput
        options={displayTypeOptions}
        value={currentBoard?.displayType || ''}
        onChange={(value) => handleChange(value)}
        inputSize={InputSize.MEDIUM}
        mode={InputMode.DEFAULT}
        label="Display type"
        placeholder="Choose..."
        fullWidth={true}
      />
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Title"
        placeholder="Site Name"
        value={currentBoard?.title?.text || ''}
        onChange={handleInputChange}
      />
      <DisplayList onEditDisplay={handleEditDisplay} />
      {activeDisplay && (
        <PopupEditDisplay
          display={activeDisplay.display}
          onClose={handleClosePopup}
          onSave={handleSaveDisplay}
        />
      )}
    </div>
  );
};