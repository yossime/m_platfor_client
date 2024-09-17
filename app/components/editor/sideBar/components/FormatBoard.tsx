import React, { useEffect, useState } from "react";
import { HeaderType, WidgetData, widgets } from "../types";
import styled from "styled-components";
import {
  BackgroundColor,
  BorderColor,
  SemanticColors,
} from "@constants/colors";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import { FormatBoard } from "../../types";
import { useBoardContent } from "./useBoardContent";

export const WidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 24px;
  gap: 32px;
`;

export const FormatContainer = styled.div`
  width: 280px;
  height: 156px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: end;
  gap: 8px;
`;
export const FormatButton = styled.button<{ $clicked: boolean }>`
  width: 240px;
  height: 128px;
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

interface ChooseBoardWidgetComponentProps {
  setFormatBoard: (format: FormatBoard) => void;
  formatBoard: FormatBoard | null;
  formatModel?: boolean;
}

export const ChooseBoardFormat: React.FC<ChooseBoardWidgetComponentProps> = ({
  formatBoard,
  setFormatBoard,
  formatModel = true,
}) => {
  const { setFormat } = useBoardContent();

  const handleWidgetClick = (format: FormatBoard) => {
    setFormat(format);
    setFormatBoard(format);
  };

  return (
    <WidgetContainer>
      <FormatContainer>
        <FormatButton
          onClick={() => handleWidgetClick(FormatBoard.Simple)}
          $clicked={formatBoard === FormatBoard.Simple ? true : false}
        />
        <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
          {"Simple"}
        </Text>
      </FormatContainer>

      <FormatContainer>
        <FormatButton
          onClick={() => handleWidgetClick(FormatBoard.Frame)}
          $clicked={formatBoard === FormatBoard.Frame ? true : false}
        />
        <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
          {"Frame"}
        </Text>
      </FormatContainer>
      {formatModel && (
        <FormatContainer>
          <FormatButton
            onClick={() => handleWidgetClick(FormatBoard.Model)}
            $clicked={formatBoard === FormatBoard.Model ? true : false}
          />
          <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
            {"Model"}
          </Text>
        </FormatContainer>
      )}
    </WidgetContainer>
  );
};
export { FormatBoard };
