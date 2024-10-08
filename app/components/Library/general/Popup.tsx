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
  titel?: string;
  isCentered?: boolean;
  parentRef?: React.RefObject<HTMLElement>;
}

const PopupContent = styled.div`
  position: fixed;
  background-color: ${BackgroundColor.GREY_BACKGROUND};
  max-height: 600px;
  padding: 20px;
  /* width: 283px; */
  min-width: auto;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const Popup = forwardRef<HTMLDivElement, PopupProps>(({
  children,
  onClose,
  onSave,
  isCentered = true,
  parentRef,
  titel
}, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const internalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => internalRef.current!);

  useEffect(() => {
    const calculatePosition = () => {
      if (isCentered) {
        return {
          x: window.innerWidth / 2 - (internalRef.current?.offsetWidth || 0) / 2,
          y: window.innerHeight / 2 - (internalRef.current?.offsetHeight || 0) / 2
        };
      } else if (parentRef?.current) {
        const rect = parentRef.current.getBoundingClientRect();
        return { x: rect.right, y: rect.top };
      }
      return { x: 0, y: 0 };
    };

    setPosition(calculatePosition());
  }, [isCentered, parentRef]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === internalRef.current || (internalRef.current && internalRef.current.contains(e.target as Node))) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.stopPropagation();
    }
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      e.stopPropagation();
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setIsDragging(false);
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <PopupContent
      ref={internalRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >
      <CloseButton onClick={onClose}>
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
      {onSave &&
        <ButtonContainer>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            icon={IconName.CHECK}
            iconPosition='left'
            text="Done"
            onClick={onSave}
          />
        </ButtonContainer>
      }
    </PopupContent>
  );
});

export default Popup;