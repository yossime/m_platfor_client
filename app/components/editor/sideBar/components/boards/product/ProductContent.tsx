
// import React, { ChangeEvent } from 'react';
// import Input from '@/components/Library/input/Input';
// import { InputMode, InputSize } from '@constants/input';
// import { useEditor } from '@/context/useEditorContext';
// import SelectInput from '@/components/Library/input/SelectInput';
// import { DisplayList } from './DisplayList';
// import { DisplayType } from '@/components/editor/interface/paramsType';
// import { Container } from '../../CommonStyles';
// // import { IContentData, IContentDataType } from '@/components/editor/interface/models';

// const displayTypeOptions = [
//   { value: DisplayType.DUO, label: "Spotlight Duo" },
//   { value: DisplayType.STANDS, label: "Podium stands" },
// ];

// export const ProductContentComponent: React.FC = () => {
//   const { sceneModel } = useEditor();
//   const selectedObject = sceneModel?.getSelectedObject();

//   // const getContentData = (type: IContentDataType): IContentData | undefined => {
//   //   return selectedObject?.constentData.get(type);
//   // };

//   // const updateContentData = (type: IContentDataType, newData: Partial<IContentData>) => {
//   //   if (selectedObject) {
//   //     const existingData = selectedObject.constentData.get(type) || { type, texture: {} };
//   //     const updatedData = { ...existingData, ...newData };
//   //     selectedObject.constentData.set(type, updatedData);
//   //     selectedObject.addContentData(updatedData);
//   //   }
//   // };

//   // const handleInputChange = (type: IContentDataType) => (event: ChangeEvent<HTMLInputElement>) => {
//   //   updateContentData(type, { text: { text: event.target.value } });
//   // };

//   const getMaxDis = (displayType: DisplayType) => {
//     if (displayType === DisplayType.DUO) {
//       return 2;
//     } else if (displayType === DisplayType.STANDS) {
//       return 6;
//     }
//     return 0;
//   };

//   const getDisplayType = (): DisplayType => {
//     const data = getContentData(IContentDataType.TEST);
//     if (data?.text?.text) {
//       try {
//         const parsed = JSON.parse(data.text.text);
//         return parsed.displayType;
//       } catch (e) {
//         console.error("Error parsing display type data", e);
//       }
//     }
//     return DisplayType.STANDS; 
//   };

//   return (
//     <Container>
//       <SelectInput
//         options={displayTypeOptions}
//         value={getDisplayType()}
//         onChange={(value) => handleDisplayTypeChange(value as DisplayType)}
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
//         value={getContentData(IContentDataType.TITLE)?.text?.text || ''}
//         onChange={handleInputChange(IContentDataType.TITLE)}
//       />
//       {/* <DisplayList /> */}
//     </Container>
//   );
// };


import React from 'react';
import { Container } from '../../CommonStyles';
import { ContentInput, ContentSelect } from '../../GenericBoardComponents';
import { IContentTextType } from '@/components/editor/interface/models';
import { DisplayType } from '@/components/editor/interface/paramsType';
import { DisplayList } from './DisplayList';

const displayTypeOptions = [
  { value: DisplayType.DUO, label: "Spotlight Duo" },
  { value: DisplayType.STANDS, label: "Podium stands" },
];

export const ProductContentComponent: React.FC = () => {
  return (
    <Container>
      <ContentSelect
        type={IContentTextType.TEST}
        options={displayTypeOptions}
        label="Display type"
        placeholder="Choose..."
      />
      <ContentInput
        type={IContentTextType.TITLE}
        placeholder="Site Name"
        label="Title"
      />
      <DisplayList />
    </Container>
  );
};