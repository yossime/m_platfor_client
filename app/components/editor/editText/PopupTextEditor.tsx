import React, {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import Icon from "@/components/Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import { BackgroundColor, IconColor } from "@constants/colors";

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
  parentRef?: React.RefObject<HTMLElement>;
}

const PopupContent = styled.div`
  position: fixed;
  background-color: ${BackgroundColor.GREY_BACKGROUND};
  padding: 20px;
  min-width: auto;
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

const ChildrenContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-y: auto;
`;

const PopupTextEditor = forwardRef<HTMLDivElement, PopupProps>(
  ({ children, onClose, parentRef }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      const calculatePosition = () => {
        if (parentRef?.current) {
          const rect = parentRef.current.getBoundingClientRect();
          return { x: rect.right, y: rect.top };
        }
        return { x: 0, y: 0 };
      };

      setPosition(calculatePosition());
    }, [parentRef]);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (
          e.target === internalRef.current ||
          (internalRef.current &&
            internalRef.current.contains(e.target as Node))
        ) {
          setIsDragging(true);
          setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          });
          e.stopPropagation();
        }
      },
      [position]
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (isDragging) {
          setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          });
          e.stopPropagation();
        }
      },
      [isDragging, dragStart]
    );

    const handleMouseUp = useCallback((e: MouseEvent) => {
      setIsDragging(false);
      e.stopPropagation();
    }, []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
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
        <ChildrenContent>{children}</ChildrenContent>
      </PopupContent>
    );
  }
);

export default PopupTextEditor;
