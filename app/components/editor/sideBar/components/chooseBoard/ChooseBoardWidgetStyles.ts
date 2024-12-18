import styled from "styled-components";
import {
  BackgroundColor,
  BorderColor,
  SemanticColors,
} from "@constants/colors";

export const WidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const DraggedWidgetContainer = styled.div`
  position: absolute;

  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
`;

export const WidgetButton = styled.button<{ $clicked: boolean }>`
  width: 133px;
  height: 100px;
  padding: 16px 0;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  border: 1px solid ${BorderColor.UI_BORDER};
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled),
  ${(props) =>
      props.$clicked &&
      `
    background-color: ${SemanticColors.PRIMARY_SELECTED};
    border-color: ${SemanticColors.PRIMARY};
  `}
    &:disabled {
    background-color: ${BackgroundColor.DISABLED_BACKGROUND};
  }
`;
