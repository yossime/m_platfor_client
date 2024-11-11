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
import Button from "@/components/Library/button/Button";
import { ButtonType, ButtonVariant, ButtonSize } from "@constants/button";
import Text from "@components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  closeButton?: boolean;
  title?: string;
  isCentered?: boolean;
  parentRef?: React.RefObject<HTMLElement>;
  width?: number;
  height?: number;
}

const PopupContent = styled.div<{
  $isDragging: boolean;
  $width?: number;
  $height?: number;
}>`
  position: fixed;
  background-color: ${BackgroundColor.GREY_BACKGROUND};
  height: ${({ $height }) => ($height ? `${$height}px` : "600px")};
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow:hidden;
`;
const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.div`

`;
const CloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  height: 64px;
  width: 100%;
  margin-top: 0;
  padding: 16px;
`;

const ChildrenContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      closeButton = true,
      children,
      onClose,
      onSave,
      isCentered = true,
      parentRef,
      title,
      height,
      width,
    },
    ref
  ) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isPositionReady, setIsPositionReady] = useState(false);

    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      const calculatePosition = () => {
        if (isCentered) {
          return {
            x:
              window.innerWidth / 2 -
              (internalRef.current?.offsetWidth || 0) / 2,
            y:
              window.innerHeight / 2 -
              (internalRef.current?.offsetHeight || 0) / 2,
          };
        } else if (parentRef?.current) {
          const rect = parentRef.current.getBoundingClientRect();
          return { x: rect.right, y: rect.top };
        }
        return { x: 0, y: 0 };
      };

      setPosition(calculatePosition());
      setIsPositionReady(true);
    }, [isCentered, parentRef]);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (
          internalRef.current &&
          internalRef.current.contains(e.target as Node)
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
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      },
      [dragStart]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
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

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          internalRef.current &&
          !internalRef.current.contains(e.target as Node) &&
          onClose
        ) {
          onClose();
        }
      };
      if (!closeButton)
        document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    return (
      isPositionReady && (
        <PopupContent
          ref={internalRef}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          onMouseDown={handleMouseDown}
          $isDragging={isDragging}
          $width={width}
          $height={height}
        >
          <PopupContainer>
            {closeButton && (
              <CloseButtonContainer>
                <Title>
                <Text size={TextSize.TEXT1} $weight={FontWeight.SEMI_BOLD}>
                  {title}
                </Text>
                </Title>
                  <Icon
                    onClick={onClose}
                    name={IconName.X}
                    size={IconSize.MEDIUM}
                    color={IconColor.ICONCOLOR}
                  />
              </CloseButtonContainer>
            )}
            <ChildrenContent>{children}</ChildrenContent>
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
          </PopupContainer>
        </PopupContent>
      )
    );
  }
);

export default Popup;
