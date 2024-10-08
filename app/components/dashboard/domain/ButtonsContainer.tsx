"use client"

import React from 'react';
import Button from '@components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize } from '@constants/button';
import styled from 'styled-components';
import { DomainStatus, useDomainIndex } from '@/context/useDomain';

export const ButtonsWrapper = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
`;

interface ButtonsContainerProps{
  onBeforeNext: () => void;}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({onBeforeNext}) => {
  const { setIndex, currentIndex } = useDomainIndex();

  const enumValues = Object.values(DomainStatus);
  const currentDomainIndex = currentIndex ? enumValues.indexOf(currentIndex) : -1;
  const isLastPage = currentDomainIndex === enumValues.length - 1;

  const handleNext = () => {
    onBeforeNext()
    if (!isLastPage && currentDomainIndex >= 0) {
      setIndex(enumValues[currentDomainIndex + 1] as DomainStatus);
    }
  };

  return (
    <ButtonsWrapper>
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.PRIMARY}
        size={ButtonSize.SMALL}
        text={isLastPage ? "Finish" : "Continue"}
        onClick={handleNext}
      />
    </ButtonsWrapper>
  );
};

export default ButtonsContainer;
