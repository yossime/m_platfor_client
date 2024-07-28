import React, { ChangeEvent, useState, useEffect } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { useEditor } from '@/context/useEditorContext';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import DragAndDropImage from '@/components/DragAndDropImage';
import { IHeaderBoard } from '@/components/editor/interface/paramsType';

interface HeaderContentComponentProps {}

export const HeaderContentComponent: React.FC<HeaderContentComponentProps> = () => {
  const { setDataParameters, dataParameters, activeBoardIndex } = useEditor();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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

      setDataParameters((prevParams) => {
        if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

        const updateBoards = [...prevParams.boards];
        const updateBoard = {...updateBoards[activeBoardIndex]} as IHeaderBoard;
        updateBoard.image = imageBuffer;
        updateBoards[activeBoardIndex] = updateBoard;
        return {
          ...prevParams,
          boards: updateBoards
        };
      });

      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [imageBuffer, activeBoardIndex, setDataParameters]);

  return (
    <div>
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Title"
        placeholder="Site Name"
        value={currentBoard.title?.text || ''}
        onChange={handleInputChange('title')}
      />
      <Input
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label="Subtitle"
        placeholder="Write your tagline here"
        value={currentBoard.subTitle?.text || ''}
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
        value={currentBoard.button?.text.text || ''}
        onChange={handleInputChange('buttonTitle')}
      />
    </div>
  );
};