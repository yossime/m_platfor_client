
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
  const { setDataParameters, dataParameters } = useEditor();
  const { activeBoardIndex } = useEditor();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleInputChange = (field: 'title' | 'subTitle' | 'buttonTitle') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDataParameters((prevParams) => {
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

      setDataParameters((prevParams) => {
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

  const currentBoard = dataParameters?.boards[activeBoardIndex] as IHeaderBoard;

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
        value={currentBoard.button?.text.text}
        onChange={handleInputChange('buttonTitle')}
      />
    </div>
  );
};