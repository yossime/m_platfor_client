// import React, { ChangeEvent, useState } from 'react';
// import Input from '@/components/Library/input/Input';
// import { BaseSize, ButtonStyle, DisplayType, HeaderBoard, ImageStyle, Params, ProductBoard } from '@/context/editorTypes';
// import { InputMode, InputSize } from '@constants/input';
// import { useProject } from '@/context/useProjectContext';
// import { useEditor } from '@/context/useEditorContext';
// import Button from '@/components/Library/button/Button';
// import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
// import DragAndDrop from '@/components/DragAndDrop';
// import DragAndDropImage from '@/components/DragAndDropImage';

// interface HeaderContentComponentProps { }

// export const HeaderContentComponent: React.FC<HeaderContentComponentProps> = () => {
//   const { setDataParameters, dataParameters } = useProject();
//   const { activeBoardIndex } = useEditor();
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null)
//   const handleInputChange = (field: 'title' | 'subTitle' | 'buttonTitle') => (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setDataParameters((prevParams: Params | null) => {
//       if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

//       return {
//         ...prevParams,
//         boards: prevParams.boards.map((board, i) =>
//           i === activeBoardIndex ? { ...board, [field]: { text: value } } : board
//         )
//       };
//     });
//   };

//   const handleFilesAdded = (buffers: ArrayBuffer[]) => {
//     console.log('hhhh', buffers);
//     // setArrayBuffer(buffers);
//     setShowUploadModal(false);
//   };

//   const currentBoard = dataParameters?.boards[activeBoardIndex] as HeaderBoard;

//   return (
//     <div>
//       {/* <arrayBuffer/> */}
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
//         <div className="modal">
//           <DragAndDropImage onFilesAdded={handleFilesAdded} onClose={() => setShowUploadModal(false)} />
//         </div>
//       )}
//       <Input
//         inputSize={InputSize.SMALL}
//         mode={InputMode.NORMAL}
//         label="Button"
//         placeholder="Get Started!"
//         value={currentBoard?.buttonTitle?.text || ''}
//         onChange={handleInputChange('buttonTitle')}
//       />
//     </div>
//   );
// };






// const test: ProductBoard = {
//   "type": "Productboard",
//   "style": {
//     "textStyle": {
//       "scale": BaseSize.MEDIUM
//     },
//     "buttonStyle": ButtonStyle.DEFAULT,
//     "imageStyle": ImageStyle.CROP,
//   },
//   "title": {
//     "text": "ProductBoard Title",
//   },
//   "displayType": DisplayType.DUO,
//   "displays": [
//     {
//       "type": "dfffffff",
//       "products": [
//         {
//           "title": {
//             "text": "Product Title",
//           },
//           "description": {
//             "text": "Product Description",},
//           "SKU": {
//             "text": "Product SKU",
//           },
//           "price": "100",
      
//           "type": null
//         }
//       ],
//     }
//   ]
// }






import React, { ChangeEvent, useState, useEffect } from 'react';
import Input from '@/components/Library/input/Input';
import { HeaderBoard, Params } from '@/context/editorTypes';
import { InputMode, InputSize } from '@constants/input';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import DragAndDropImage from '@/components/DragAndDropImage';

interface HeaderContentComponentProps {}

export const HeaderContentComponent: React.FC<HeaderContentComponentProps> = () => {
  const { setDataParameters, dataParameters } = useProject();
  const { activeBoardIndex } = useEditor();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleInputChange = (field: 'title' | 'subTitle' | 'buttonTitle') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDataParameters((prevParams: Params | null) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
      
      return {
        ...prevParams,
        boards: prevParams.boards.map((board, i) => 
          i === activeBoardIndex ? { ...board, [field]: { text: value } } : board
        )
      };
    });
  };

  const handleFilesAdded = (buffers: ArrayBuffer[]) => {
    if (buffers.length > 0) {
      setImageBuffer(buffers[0]);
    }
    setShowUploadModal(false);
  };

  useEffect(() => {
    if (imageBuffer) {
      const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);

      setDataParameters((prevParams: Params | null) => {
        if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
        
        return {
          ...prevParams,
          boards: prevParams.boards.map((board, i) => 
            i === activeBoardIndex ? { ...board, image: { buffer: imageBuffer } } : board
          )
        };
      });

      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [imageBuffer, activeBoardIndex, setDataParameters]);

  const currentBoard = dataParameters?.boards[activeBoardIndex] as HeaderBoard;

  return (
    <div>
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Title"
        placeholder="Site Name"
        value={currentBoard?.title?.text || ''}
        onChange={handleInputChange('title')}
      />
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Subtitle"
        placeholder="Write your tagline here"
        value={currentBoard?.subTitle?.text || ''}
        onChange={handleInputChange('subTitle')}
      />
      <Button
        size={ButtonSize.SMALL} 
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY} 
        text="Upload image"
        onClick={() => setShowUploadModal(true)}
      />
      {showUploadModal && (
        <div className="modal">
          <DragAndDropImage onFilesAdded={handleFilesAdded} onClose={() => setShowUploadModal(false)} />
        </div>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>
      )}
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Button"
        placeholder="Get Started!"
        value={currentBoard?.buttonTitle?.text || ''}
        onChange={handleInputChange('buttonTitle')}
      />
    </div>
  );
};