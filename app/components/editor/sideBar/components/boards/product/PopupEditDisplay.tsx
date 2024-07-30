import React, { useState } from 'react';
import styled from 'styled-components';
import { IDisplay, IProduct }  from '@/components/editor/interface/paramsType';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import Button from '@/components/Library/button/Button';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import Collapsible from '@/components/Library/general/Collapsible';
import { IconName } from '@constants/icon';

interface PopupEditDisplayProps {
  display: IDisplay;
  onClose: () => void;
  onSave: (updatedDisplay: IDisplay) => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 24rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PopupEditDisplay: React.FC<PopupEditDisplayProps> = ({ display, onClose, onSave }) => {
  const [editedDisplay, setEditedDisplay] = useState<IDisplay>(display);
  const [uploadPopup,setUploadPopup] = useState<boolean>(false);

  const handleInputChange = (field: keyof IProduct, value: string) => {
    setEditedDisplay(prev => ({
      ...prev,
      products: prev.products?.map((product, index) => 
        index === 0 ? { ...product, [field]: { text: value } } : product
      )
    }));
  };

  const handleSave = () => {
    onSave(editedDisplay);
  };

  return (
    <Overlay>
      <PopupContainer>
        <Title>Product</Title>
      <Collapsible title="Product Description">

        <InputContainer>
          <Input
            inputSize={InputSize.SMALL}
            mode={InputMode.NORMAL}
            value={editedDisplay.products ? editedDisplay.products[0].title?.text : ""}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            inputSize={InputSize.SMALL}
            mode={InputMode.NORMAL}
            value={editedDisplay.products ? editedDisplay.products[0].description?.text : ""}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            inputSize={InputSize.SMALL}
            mode={InputMode.NORMAL}
            value={editedDisplay.products ? editedDisplay.products[0].SKU?.text : ""}
            onChange={(e) => handleInputChange('SKU', e.target.value)}
          />
        </InputContainer>
        <Collapsible title=" Price">
        <InputContainer>
          <Input
            inputSize={InputSize.SMALL}
            mode={InputMode.NORMAL}
            value={"1,000,000,000 $"}
            onChange={() =>{}}
          />
        </InputContainer>
        </Collapsible>
      </Collapsible>
      <Collapsible title="3D Model">
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUSCIRCLE}
        iconPosition='left'
        onClick={()=>{}}
        text='Upload'
        fullWidth={true}
      />
         <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUSCIRCLE}
        iconPosition='left'
        onClick={()=>{}}
        text='Generate from images - Beta'
        mode={ ButtonMode.DISABLED }
        fullWidth={true}
      />
      </Collapsible>
        <ButtonContainer>
          <Button
            onClick={onClose}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.SECONDARY}
            type={ButtonType.PRIMARY}
            text="Cancel"
          />
          <Button
            onClick={handleSave}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.PRIMARY}
            type={ButtonType.PRIMARY}
            text="Save"
          />
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default PopupEditDisplay;