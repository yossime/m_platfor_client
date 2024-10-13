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
import { BackgroundColor, IconColor } from "@constants/colors";

interface PopupProps {
  children: ReactNode;
  parentRef?: React.RefObject<HTMLDivElement>;
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
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const PopupTextEditor: React.FC<PopupProps> = ({ children, parentRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);
  const [isPositionReady, setIsPositionReady] = useState(false);

  useEffect(() => {
    const calculatePosition = () => {
      if (parentRef?.current) {
        const rect = parentRef.current.getBoundingClientRect();
        return { x: rect.right + 40, y: rect.top };
      }
      return { x: 0, y: 0 };
    };

    setPosition(calculatePosition());
    setIsPositionReady(true);
  }, [parentRef]);

  const initialPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (
        internalRef.current &&
        internalRef.current.contains(e.target as Node)
      ) {
        setIsDragging(true);
        initialPosition.current = {
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        };
        e.stopPropagation();
      }
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - initialPosition.current.x,
          y: e.clientY - initialPosition.current.y,
        });
        e.stopPropagation();
      }
    },
    [isDragging]
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
    isPositionReady && (
      <PopupContent
        ref={internalRef}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleMouseDown}
      >
        <ChildrenContent>{children}</ChildrenContent>
      </PopupContent>
    )
  );
};

export default PopupTextEditor;
