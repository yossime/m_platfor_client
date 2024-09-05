import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import Button from '@/components/Library/button/Button';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { IconName } from '@constants/icon';
import Popup from '@/components/Library/general/Popup';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import TextureUploadComponent from '../../LoadTexturePopup';
import { ISceneObject } from '@/components/editor/viewport/types';

interface PopupEditDisplayProps {
  display: ISceneObject;
  onClose: () => void;
  onSave: (updatedDisplay: ISceneObject) => void;
  parentRef?: React.RefObject<HTMLElement>;

}

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 0.5rem;
  
`;


const PopupEditDisplay: React.FC<PopupEditDisplayProps> = ({ display, onClose, onSave , parentRef}) => {
  const [editedDisplay, setEditedDisplay] = useState<ISceneObject>(display);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploadTexture, setShowUploadTexture] = useState(false);
  const [showUploadTextureButton, setshowUploadTextureButton] = useState(false);


  const [fileData, setFileData] = useState<File | null>(null);


  const secondPopupRef = useRef<HTMLDivElement>(null);




  const handleInputChange = (field: keyof any, value: string) => {
    // setEditedDisplay(prev => ({
    //   ...prev,
    //   products: prev.products?.map((product, index) =>
    //     index === 0 ? { ...product, [field]: { text: value } } : product
    //   )
    // }));
  };

  const handleSave = () => {
    onSave(editedDisplay);
  };

  useEffect(() => {
    if (fileData)
      setShowUploadModal(false);
    if (fileData?.name?.toLowerCase().endsWith('fbx')) {
      setshowUploadTextureButton(true);
    }
  }, [fileData]);
  
  return (
    <Popup isCentered={false} parentRef={parentRef} onClose={onClose} onSave={handleSave} ref={secondPopupRef}>
      <Title>Product</Title>
      "Product Description"
      <InputContainer>
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          // value={editedDisplay.products ? editedDisplay.products[0].title?.text : ""}
          onChange={(e) => handleInputChange('title', e.target.value)}
          />
      </InputContainer>
      <InputContainer>
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          // value={editedDisplay.products ? editedDisplay.products[0].description?.text : ""}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </InputContainer>
      <InputContainer>
      SKU
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          // value={editedDisplay.products ? editedDisplay.products[0].SKU?.text : ""}
          onChange={(e) => handleInputChange('SKU', e.target.value)}
          />
      </InputContainer>
      <InputContainer>
      Price
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={"1,000,000,000 $"}
          onChange={() => { }}
        />
      </InputContainer>
      
      
      <Button
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        text={ fileData?.name ? fileData.name : "Upload model"}
        onClick={() => setShowUploadModal(true)}
      />



      {showUploadModal && (
        <Popup onClose={onClose} parentRef={secondPopupRef} isCentered={false}>
          <DragAndDrop type='model' onFileAdded={setFileData} />
          <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.LARGE}
          icon={IconName.PLUSCIRCLE}
          iconPosition='left'
          onClick={() => { }}
          text='Generate from images - Beta'
          mode={ButtonMode.DISABLED}
          fullWidth={true}
          />
       <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.LARGE}
          icon={IconName.PLUSCIRCLE}
          iconPosition='left'
          onClick={() => { }}
          text='Book Professional scaning'
          mode={ButtonMode.DISABLED}
          fullWidth={true}
        />
        </Popup>
      )}

      {showUploadTextureButton && (
              <Button
              size={ButtonSize.SMALL}
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.SECONDARY}
              text="Upload Texture"
              onClick={() => setShowUploadTexture(true)}
            />
            
          )}
      {showUploadTexture &&   <TextureUploadComponent parentRef={secondPopupRef} onClose={()=>setShowUploadTexture(false)}/> }
  
    </Popup>
  );
};

export default PopupEditDisplay;