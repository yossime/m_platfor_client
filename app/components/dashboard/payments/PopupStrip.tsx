import React, { ReactNode, useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import Icon from '@/components/Library/icon/Icon';
import { IconName, IconSize } from '@constants/icon';
import { BackgroundColor, IconColor } from '@constants/colors';
import Button from '@/components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize } from '@constants/button';

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  title?: string;
  isCentered?: boolean;
  parentRef?: React.RefObject<HTMLElement>;
}

const PopupContent = styled.div`
  position: fixed;
  width: 450px;
  height: 500px;
  padding: 20px;
  background-color: ${BackgroundColor.GREY_BACKGROUND};
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ChildrenContent = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;



const PopupStrip = forwardRef<HTMLDivElement, PopupProps>(({
  children,
  onClose,
  onSave,
}, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const internalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => internalRef.current!);

  const calculatePosition = useCallback(() => {
    if (internalRef.current) {
      const { offsetWidth, offsetHeight } = internalRef.current;
      return {
        x: window.innerWidth / 2 - offsetWidth / 2,
        y: window.innerHeight / 2 - offsetHeight / 2,
      };
    }
    return { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const updatePosition = () => setPosition(calculatePosition());
    updatePosition();

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [calculatePosition]);

  return (
    <PopupContent
      ref={internalRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <CloseButton>
        <Icon
          name={IconName.X}
          size={IconSize.SMALL}
          color={IconColor.ICONCOLOR}
          onClick={onClose}
        />
      </CloseButton>
      <ChildrenContent>
        {children}
      </ChildrenContent>
      {onSave && (
        <ButtonContainer>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            icon={IconName.CHECK}
            iconPosition="left"
            text="Done"
            onClick={onSave}
          />
        </ButtonContainer>
      )}
    </PopupContent>
  );
});

export default PopupStrip;
