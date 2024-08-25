// import React, { ChangeEvent, useEffect, useState } from 'react';
// import Input from '@/components/Library/input/Input';
// import { IImageBoard }  from '@/components/editor/interface/paramsType';
// import { InputMode, InputSize } from '@constants/input';
// import { useEditor } from '@/context/useEditorContext';
// import Button from '@/components/Library/button/Button';
// import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
// import { Container } from '../../CommonStyles';
// import TextureUploadComponent from '../../LoadTexturePopup';



// export const ImageContentComponent: React.FC = () => {
//   const { setDataParameters, dataParameters } = useEditor();
//   const { activeBoardIndex } = useEditor()
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const currentBoard = dataParameters?.boards[activeBoardIndex] as IImageBoard;

//   const updateBoardField = (field: keyof IImageBoard, value: any) => {
//     setDataParameters((prevParams) => {
//       if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
      
//       const updatedBoards = [...prevParams.boards];
//       updatedBoards[activeBoardIndex] = {
//         ...updatedBoards[activeBoardIndex],
//         [field]: value
//       };

//       return {
//         ...prevParams,
//         boards: updatedBoards
//       };
//     });
//   };


//   const handleInputChange = (field: 'title' | 'subTitle' | 'buttonTitle') => (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     updateBoardField(field, { text: value });
//   };



//   useEffect(() => {
//     if (imageBuffer) {
//       const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
//       const imageUrl = URL.createObjectURL(blob);
//       setImageSrc(imageUrl);

//       setDataParameters((prevParams) => {
//         if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

//         const updateBoards = [...prevParams.boards];
//         const updateBoard = {...updateBoards[activeBoardIndex]} as IImageBoard;
//         updateBoard.image = imageBuffer;
//         updateBoards[activeBoardIndex] = updateBoard;
//         return {
//           ...prevParams,
//           boards: updateBoards
//         };
//       });

//       return () => {
//         URL.revokeObjectURL(imageUrl);
//       };
//     }
//   }, [imageBuffer, activeBoardIndex, setDataParameters]);

//   return (
//     <Container>
//       <Input
//         inputSize={InputSize.SMALL}
//         mode={InputMode.NORMAL}
//         label="Title"
//         placeholder="Site Name"
//         value={currentBoard?.title?.text || ''}
//         onChange={handleInputChange('title')}
//       />
//       <Input
//         inputSize={InputSize.SMALL}
//         mode={InputMode.NORMAL}
//         label="Subtitle"
//         placeholder="Write your tagline here"
//         value={currentBoard?.subTitle?.text || ''}
//         onChange={handleInputChange('subTitle')}
//       />
//       <Button
//         size={ButtonSize.SMALL}
//         type={ButtonType.PRIMARY}
//         variant={ButtonVariant.SECONDARY}
//         text="Upload image"
//         onClick={() => setShowUploadModal(true)}
//       />
//       {showUploadModal && (
//      <TextureUploadComponent onClose={()=>setShowUploadModal(false)}/>
//       )}
//       {imageSrc && (
//         <div>
//           <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
//         </div>
//       )}
//       <Input
//         inputSize={InputSize.SMALL}
//         mode={InputMode.NORMAL}
//         label="Button"
//         placeholder="Get Started!"
//         value={currentBoard?.button?.text.text || ''}
//         onChange={handleInputChange('buttonTitle')}
//       />
//     </Container>
//   );
// };










import React, { useState } from 'react';
import { Container, Divider } from '../../CommonStyles';
import { ContentFileUpload, ContentInput } from '../../GenericBoardComponents';
import { IContentMaterialType, IContentTextType } from '@/components/editor/interface/models';
import DataObfuscator from '@/components/Library/general/DataObfuscator';

export const HeaderContentComponent: React.FC = () => {
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    image: true,
    button: true,
  });

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
  };

  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <ContentInput
          type={IContentTextType.TITLE}
          placeholder='Enter title'
        />
      </DataObfuscator>

      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <ContentInput
          type={IContentTextType.SUB_TITLE}
          placeholder='Enter subtitle'
        />
      </DataObfuscator>

      <Divider />
    
      <DataObfuscator
            title='Image'
            isOpen={openSections.image}
            onToggle={handleSectionToggle('image')}
      >
        <ContentFileUpload type={IContentMaterialType.TEST} />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <ContentInput
          type={IContentTextType.BUTTON}
          placeholder='Enter button text'
        />
      </DataObfuscator>
    </Container>
  );
};