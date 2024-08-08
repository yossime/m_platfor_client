// import React, { ChangeEvent, useState } from 'react';
// import Input from '@/components/Library/input/Input';
// import { InputMode, InputSize } from '@constants/input';
// import { useProject } from '@/context/useProjectContext';
// import { useEditor } from '@/context/useEditorContext';
// import SelectInput from '@/components/Library/input/SelectInput';
// import { DisplayList } from './DisplayList';
// import PopupEditDisplay from './PopupEditDisplay'; 
// import { DisplayType, IDisplay, IProductBoard } from '@/components/editor/interface/paramsType';
// import { Container } from '../../CommonStyles';

// const displayTypeOptions = [
//   { value: DisplayType.DUO, label: "Spotlight Duo" },
//   { value: DisplayType.STANDS, label: "Podium stands" },
// ];

// export const ProductContentComponent: React.FC = () => {
//   const { setDataParameters, dataParameters } = useEditor();
//   const { activeBoardIndex } = useEditor();
//   const currentBoard = dataParameters?.boards[activeBoardIndex] as IProductBoard;

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setDataParameters((prevParams) => {
//       if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

//       return {
//         ...prevParams,
//         boards: prevParams.boards.map((board, i) =>
//           i === activeBoardIndex ? { ...board, title: { text: value } } : board)
//       };
//     });
//   };

//   const getMaxDis = () => {
//     if (currentBoard?.displayType === DisplayType.DUO) {
//       return 2;
//     } else if (currentBoard?.displayType === DisplayType.STANDS) {
//       return 6;
//     }
//     return 0;
//   };

//   const handleChange = (value: any) => {
//     setDataParameters((prevParams) => {
//       if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
//       console.log(value);
//       return {
//         ...prevParams,
//         boards: prevParams.boards.map((board, index) =>
//           index === activeBoardIndex ? { ...board, displayType: value as DisplayType, maxDisplay: getMaxDis() } : board)
//       };
//     });
//   };


//   return (
//     <Container>
//       <SelectInput
//         options={displayTypeOptions}
//         value={currentBoard?.displayType || ''}
//         onChange={(value) => handleChange(value)}
//         inputSize={InputSize.MEDIUM}
//         mode={InputMode.DEFAULT}
//         label="Display type"
//         placeholder="Choose..."
//         fullWidth={true}
//       />
//       <Input
//         inputSize={InputSize.SMALL}
//         mode={InputMode.NORMAL}
//         label="Title"
//         placeholder="Site Name"
//         value={currentBoard?.title?.text || ''}
//         onChange={handleInputChange}
//       />
//       <DisplayList/>
//     </Container>
//   );
// };



import React, { ChangeEvent } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { useEditor } from '@/context/useEditorContext';
import SelectInput from '@/components/Library/input/SelectInput';
import { DisplayList } from './DisplayList';
import { DisplayType } from '@/components/editor/interface/paramsType';
import { Container } from '../../CommonStyles';
import { IContentData, IContentDataType } from '@/components/editor/interface/models';

const displayTypeOptions = [
  { value: DisplayType.DUO, label: "Spotlight Duo" },
  { value: DisplayType.STANDS, label: "Podium stands" },
];

export const ProductContentComponent: React.FC = () => {
  const { sceneModel } = useEditor();
  const selectedObject = sceneModel?.getSelectedObject();

  const getContentData = (type: IContentDataType): IContentData | undefined => {
    return selectedObject?.constentData.get(type);
  };

  const updateContentData = (type: IContentDataType, newData: Partial<IContentData>) => {
    if (selectedObject) {
      const existingData = selectedObject.constentData.get(type) || { type, texture: {} };
      const updatedData = { ...existingData, ...newData };
      selectedObject.constentData.set(type, updatedData);
      selectedObject.addContentData(updatedData);
    }
  };

  const handleInputChange = (type: IContentDataType) => (event: ChangeEvent<HTMLInputElement>) => {
    updateContentData(type, { text: { text: event.target.value } });
  };

  const getMaxDis = (displayType: DisplayType) => {
    if (displayType === DisplayType.DUO) {
      return 2;
    } else if (displayType === DisplayType.STANDS) {
      return 6;
    }
    return 0;
  };

  const handleDisplayTypeChange = (value: DisplayType) => {
    if (selectedObject) {
      updateContentData(IContentDataType.TEST, { 
        text: { text: JSON.stringify({ displayType: value, maxDisplay: getMaxDis(value) }) }
      });
    }
  };

  // Helper function to get display type from content data
  const getDisplayType = (): DisplayType => {
    const data = getContentData(IContentDataType.TEST);
    if (data?.text?.text) {
      try {
        const parsed = JSON.parse(data.text.text);
        return parsed.displayType;
      } catch (e) {
        console.error("Error parsing display type data", e);
      }
    }
    return DisplayType.STANDS; 
  };

  return (
    <Container>
      <SelectInput
        options={displayTypeOptions}
        value={getDisplayType()}
        onChange={(value) => handleDisplayTypeChange(value as DisplayType)}
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
        value={getContentData(IContentDataType.TITLE)?.text?.text || ''}
        onChange={handleInputChange(IContentDataType.TITLE)}
      />
      <DisplayList />
    </Container>
  );
};