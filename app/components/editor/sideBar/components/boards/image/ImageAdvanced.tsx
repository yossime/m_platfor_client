// import { Board } from '@constants/editorTypes';
import { useEditor } from '@/context/useEditorContext';
import React from 'react';

export const ImageAdvancedComponent: React.FC = () => {
  const { dataParameters, setDataParameters } = useEditor();

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