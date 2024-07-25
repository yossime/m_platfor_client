// import { Board } from '@constants/editorTypes';
import { useProject } from '@/context/useProjectContext';
import React from 'react';

export const HeaderAdvancedComponent: React.FC = () => {
  const { dataParameters, setDataParameters } = useProject();

  const addBoard = () => {
    if (dataParameters && dataParameters.boards) {
      // const newBoard: Board = {
      //   type: null,
      //   materialParams: null
      // };
      // setDataParameters({
      //   ...dataParameters,
      //   boards: [...dataParameters.boards, newBoard]
      // });
    }
  };
console.log(dataParameters,'ssssssssssssssssssssss');
  return (
    <div>
      HeaderAdvancedComponent
      <button onClick={addBoard}>Add Board</button>
    </div>
  );
};