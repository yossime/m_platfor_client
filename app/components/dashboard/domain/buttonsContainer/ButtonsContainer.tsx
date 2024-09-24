"use client"

import React from 'react';

import Button from '@components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize } from '@constants/button';
import { ButtonsWrapper  } from './ButtonsContainerStyles';


const ButtonsContainer: React.FC = () => {

  return (
    <ButtonsWrapper>
  
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.SMALL}
              text="Continue"
              onClick={() => {}}
            />

    </ButtonsWrapper>
  );
}

export default ButtonsContainer;


