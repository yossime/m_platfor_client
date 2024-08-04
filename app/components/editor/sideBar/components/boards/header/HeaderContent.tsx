import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { useEditor } from '@/context/useEditorContext';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { IHeaderBoard } from '@/components/editor/interface/paramsType';
import { Container } from '../../CommonStyles';
import DragAndDrop, { FileData } from '@/components/Library/general/DragAndDrop';
import Popup from '@/components/Library/general/Popup';

interface HeaderContentComponentProps { }

export const HeaderContentComponent: React.FC<HeaderContentComponentProps> = () => {
  const { setDataParameters, dataParameters, activeBoardIndex } = useEditor();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const ref = useRef<HTMLDivElement>(null);


  const currentBoard = dataParameters?.boards[activeBoardIndex] as IHeaderBoard;

  const updateBoardField = (field: keyof IHeaderBoard, value: any) => {
    setDataParameters((prevParams) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

      const updatedBoards = [...prevParams.boards];
      updatedBoards[activeBoardIndex] = {
        ...updatedBoards[activeBoardIndex],
        [field]: value
      };

      return {
        ...prevParams,
        boards: updatedBoards
      };
    });
  };

  const handleInputChange = (field: 'title' | 'subTitle' | 'buttonTitle') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateBoardField(field, { text: value });
  };



  // setDataParameters((prevParams) => {
  //   if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

  //   const updateBoards = [...prevParams.boards];
  //   const updateBoard = {...updateBoards[activeBoardIndex]} as IHeaderBoard;
  //   // updateBoard.image = imageBuffer;
  //   updateBoards[activeBoardIndex] = updateBoard;
  //   return {
  //     ...prevParams,
  //     boards: updateBoards
  //   };
  // });




  return (
    <Container ref={ref}>
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Title"
        placeholder="Site Name"
        value={currentBoard.title?.text || ''}
        onChange={handleInputChange('title')}
        fullWidth={true}
      />
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Subtitle"
        placeholder="Write your tagline here"
        value={currentBoard.subTitle?.text || ''}
        onChange={handleInputChange('subTitle')}
        fullWidth={true}

      />
      <Button
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        text={fileData?.name ? fileData.name : 'Upload image'}
        onClick={() => setShowUploadModal(true)}
        fullWidth={true}

      />

      {showUploadModal && (
        <Popup parentRef={ref} isCentered={false} onClose={() => setShowUploadModal(false)}>
          <DragAndDrop type='image' onFileAdded={setFileData} />
        </Popup>
      )}

      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Button"
        placeholder="Get Started!"
        value={currentBoard.button?.text.text || ''}
        onChange={handleInputChange('buttonTitle')}
        fullWidth={true}
      />
    </Container>
  );
};