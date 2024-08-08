// import React, { ChangeEvent, useEffect, useState } from 'react';
// import Input from '@/components/Library/input/Input';
// import { InputMode, InputSize } from '@constants/input';
// import { Container, DeleteIcon, Divider, FileDisplay, FileName } from '../../CommonStyles';
// import DataObfuscator from '@/components/Library/general/DataObfuscator';
// import DragAndDrop from '@/components/Library/general/DragAndDrop';






// interface IMaster {
//   title: string;
//   subtitle: string;
//   button: string;
//   image?: File | string | undefined;
// }


// // Assuming you have a function to fetch data from the database
// // async function fetchDataFromDatabase(): Promise<IMaster | null> {
// //   // Implement your database fetching logic here
// //   // Return null if no data is found
// // }

// // Assuming you have a function to update data in the database
// async function updateDataInDatabase(data: IMaster): Promise<void> {
//   // Implement your database update logic here
// }

// const defaultMaster: IMaster = {
//   title: 'Subscribe to our newsletter!',
//   subtitle: 'Join us to hear about upcoming deals and promotions!',
//   button: 'Submit!',
// };


// export const HeaderContentComponent: React.FC = () => {
//   const [master, setMaster] = useState<IMaster>(defaultMaster);
//   const [openSections, setOpenSections] = useState({
//     title: true,
//     subtitle: true,
//     button: true,
//   });



//   const handleInputChange = (field: keyof IMaster) => async (event: ChangeEvent<HTMLInputElement>) => {
//     const newMaster = { ...master, [field]: event.target.value };
//     setMaster(newMaster);
//     // await updateDataInDatabase(newMaster);
//   };

//   const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
//     setOpenSections(prev => ({ ...prev, [section]: isOpen }));
//     if (!isOpen) {
//       setOpenSections(prev => ({ ...prev, [section]: '' }));
//     }
//   };

//   const handleImageUpload = async (file: File) => {
//     const newMaster = { ...master, image: file };
//     setMaster(newMaster);
//     // await updateDataInDatabase(newMaster);
//   };

//   const handleDeleteFile = async () => {
//     const newMaster = { ...master, image: undefined };
//     setMaster(newMaster);
//     // await updateDataInDatabase(newMaster);
//   };


//   return (
//     <Container>
//       <DataObfuscator
//         title='Title'
//         isOpen={openSections.title}
//         onToggle={handleSectionToggle('title')}
//       >
//         <Input
//           placeholder='Enter title'
//           inputSize={InputSize.SMALL}
//           mode={InputMode.NORMAL}
//           value={master.title}
//           onChange={handleInputChange('title')}
//         />
//       </DataObfuscator>
//       <DataObfuscator
//         title='Subtitle'
//         isOpen={openSections.subtitle}
//         onToggle={handleSectionToggle('subtitle')}
//       >
//         <Input
//           placeholder='Enter subtitle'
//           inputSize={InputSize.SMALL}
//           mode={InputMode.NORMAL}
//           value={master.subtitle}
//           onChange={handleInputChange('subtitle')}
//         />
//       </DataObfuscator>
//       <Divider />
//       {master.image ? (
//         <FileDisplay>
//           <FileName>{typeof master.image === 'string' ? master.image : master.image.name}</FileName>
//           <DeleteIcon size={20} onClick={handleDeleteFile} />
//         </FileDisplay>
//       ) : (
//         <DragAndDrop
//           type='image'
//           onFileAdded={handleImageUpload}
//           buttonOnly={true}
//         />
//       )}
//       <Divider />
//       <DataObfuscator
//         title='Button'
//         isOpen={openSections.button}
//         onToggle={handleSectionToggle('button')}
//       >
//         <Input
//           placeholder='Enter button text'
//           inputSize={InputSize.SMALL}
//           mode={InputMode.NORMAL}
//           value={master.button}
//           onChange={handleInputChange('button')}
//         />
//       </DataObfuscator>
//     </Container>
//   );
// };



import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { Container, DeleteIcon, Divider, FileDisplay, FileName } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import { useEditor } from '@/context/useEditorContext';
import { IContentData, IContentDataType } from '@/components/editor/interface/models';

export const HeaderContentComponent: React.FC = () => {
  const { sceneModel } = useEditor();
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    button: true,
  });

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

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
  };

  const handleImageUpload = async (file: File) => {
    updateContentData(IContentDataType.TEST, { texture: { diffuse: { file } } });
  };

  const handleDeleteFile = () => {
    updateContentData(IContentDataType.TEST, { texture: {} });
  };

  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <Input
          placeholder='Enter title'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={getContentData(IContentDataType.TITLE)?.text?.text || ''}
          onChange={handleInputChange(IContentDataType.TITLE)}
        />
      </DataObfuscator>
      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <Input
          placeholder='Enter subtitle'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={getContentData(IContentDataType.SUB_TITLE)?.text?.text || ''}
          onChange={handleInputChange(IContentDataType.SUB_TITLE)}
        />
      </DataObfuscator>
      <Divider />
      {getContentData(IContentDataType.TEST)?.texture.diffuse?.file ? (
        <FileDisplay>
          <FileName>{getContentData(IContentDataType.TEST)?.texture.diffuse?.file?.name || ''}</FileName>
          <DeleteIcon size={20} onClick={handleDeleteFile} />
        </FileDisplay>
      ) : (
        <DragAndDrop
          type='image'
          onFileAdded={handleImageUpload}
          buttonOnly={true}
        />
      )}
      <Divider />
      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <Input
          placeholder='Enter button text'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={getContentData(IContentDataType.BUTTON)?.text?.text || ''}
          onChange={handleInputChange(IContentDataType.BUTTON)}
        />
      </DataObfuscator>
    </Container>
  );
};